import fetch from "node-fetch";
const core = require("@actions/core");

const SERVICEID = core.getInput("service-id") || process.env.SERVICEID;
const APIKEY = core.getInput("api-key") || process.env.APIKEY;
const WAIT_FOR_SUCCESS =
  core.getInput("wait-for-success") || process.env.WAIT_FOR_SUCCESS;

const RENDER_HEADERS = { Authorization: `Bearer ${APIKEY}` };

async function parseJsonResponse(response) {
  const text = await response.text();
  if (!text.trim()) {
    return null;
  }
  try {
    return JSON.parse(text);
  } catch {
    throw new Error(
      `Render API returned non-JSON response (HTTP ${response.status}): ${text.slice(0, 200)}`,
    );
  }
}

async function fetchLatestDeploy() {
  const response = await fetch(
    `https://api.render.com/v1/services/${SERVICEID}/deploys?limit=1`,
    { headers: RENDER_HEADERS },
  );

  if (!response.ok) {
    const text = await response.text();
    throw new Error(
      `Could not list deploys (HTTP ${response.status}): ${text.slice(0, 200)}`,
    );
  }

  const deploys = await parseJsonResponse(response);
  if (!deploys || deploys.length === 0) {
    throw new Error("No deploys found after triggering deploy");
  }
  // Render's list-deploys endpoint wraps each entry as {deploy, cursor};
  // the single-deploy endpoint returns the deploy object directly.
  return deploys[0].deploy || deploys[0];
}

async function retrieveStatus(deployId) {
  const response = await fetch(
    `https://api.render.com/v1/services/${SERVICEID}/deploys/${deployId}`,
    { headers: RENDER_HEADERS },
  );

  if (response.ok) {
    const data = await parseJsonResponse(response);
    return data.status;
  } else {
    const text = await response.text();
    throw new Error(
      `Could not retrieve deploy information (HTTP ${response.status}): ${text.slice(0, 200)}`,
    );
  }
}

async function waitForSuccess(data, currentStatus) {
  core.info(`Waiting for deploy to succeed`);

  let previousStatus = currentStatus;
  while (true) {
    await new Promise((res) => {
      setTimeout(res, 10000);
    });

    const status = await retrieveStatus(data.id);

    if (status !== previousStatus) {
      core.info(`Deploy status changed: ${status}`);
      previousStatus = status;
    }

    if (status.endsWith('failed') || status === 'canceled' || status === 'deactivated') {
      core.setFailed(`Deploy status: ${status}`);
      return;
    }

    if (status === "live") {
      core.info(`Deploy finished successfully`);
      return;
    }
  }
}

async function run() {
  const response = await fetch(
    `https://api.render.com/v1/services/${SERVICEID}/deploys`,
    {
      method: "POST",
      headers: RENDER_HEADERS,
    },
  );

  if (response.status === 401) {
    core.setFailed(
      "Render Deploy Action: Unauthorized. Please check your API key.",
    );
    return;
  } else if (!response.ok) {
    const text = await response.text();
    core.setFailed(
      `Deploy error (HTTP ${response.status}): ${text.slice(0, 200)}`,
    );
    return;
  }

  let data = await parseJsonResponse(response);

  // HTTP 202 (Accepted) may return an empty body — the deploy was queued but
  // the response doesn't include deploy details. Poll the deploys list instead.
  if (!data) {
    core.info(
      `Deploy accepted (HTTP ${response.status}) with empty body, fetching latest deploy...`,
    );
    data = await fetchLatestDeploy();
  }

  let ref = "unknown";
  if (data.commit) {
    ref = `git commit: ${data.commit.message}`;
  } else if (data.image) {
    ref = `image: ${data.image.ref} SHA: ${data.image.sha}`;
  }
  core.info(`Deploy triggered for ${ref}`);
  core.info(`Status: ${data.status}`);

  if (WAIT_FOR_SUCCESS) {
    await waitForSuccess(data, data.status);
  }
}

run().catch((e) => core.setFailed(e.message));
