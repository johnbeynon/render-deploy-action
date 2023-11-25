import fetch from "node-fetch";
const core = require("@actions/core");

const SERVICEID = core.getInput("service-id") || process.env.SERVICEID;
const APIKEY = core.getInput("api-key") || process.env.APIKEY;
const WAIT_FOR_SUCCESS =
  core.getInput("wait-for-success") || process.env.WAIT_FOR_SUCCESS;

async function retrieveStatus(deployId) {
  const response = await fetch(
    "https://api.render.com/v1/services/" + SERVICEID + "/deploys/" + deployId,
    {
      headers: { Authorization: `Bearer ${APIKEY}` },
    },
  );

  const data = await response.json();
  if (response.ok) {
    return data.status;
  } else {
    throw Error("Could not retrieve deploy information.")
  }
}

async function waitForSuccess(data) {
  let previousStatus = "";
  while (true) {
    await new Promise((res) => {
      setTimeout(res, 10000);
    });

    const status = await retrieveStatus(data.id);

    if (status !== previousStatus) {
      core.info(`Deploy status: ${status}`);
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
    "https://api.render.com/v1/services/" + SERVICEID + "/deploys",
    {
      method: "POST",
      headers: { Authorization: `Bearer ${APIKEY}` },
    },
  );

  const data = await response.json();

  if (response.status === 401) {
    core.setFailed(
      "Render Deploy Action: Unauthorized. Please check your API key.",
    );
    return;
  } else if (!response.ok) {
    core.setFailed(
      `Deploy error: ${data.message} (status code ${response.status})`,
    );
    return;
  }

  core.info(`Deploy ${data.status} - Commit: ${data.commit.message}`);

  if (WAIT_FOR_SUCCESS) {
    await waitForSuccess(data);
  }
}

run().catch((e) => core.setFailed(e.message));
