import fetch from 'node-fetch';
const core = require('@actions/core');

async function run() {
	const SERVICEID = core.getInput('service-id') || process.env.SERVICEID;
  const APIKEY = core.getInput('api-key') || process.env.APIKEY;
  
	const response = await fetch('https://api.render.com/v1/services/' + SERVICEID + '/deploys', {
		method: 'POST',
		headers: { 'Authorization': `Bearer ${APIKEY}`}
		})

	response.json().then(data => {
		if (response.ok) {
			// TODO: This should check the service type as it might not always be WEB
			core.info(`Deploy: https://dashboard.render.com/web/${SERVICEID}/deploys/${data.id}`)
		} else if (response.status === 401) {
			core.setFailed('Render Deploy Action: Unauthorized. Please check your API key.')
		} else {
			core.setFailed(`Deploy error: ${data.message} (status code ${response.status})`)
		}
	});
}

run().catch(e => core.setFailed(e.message));