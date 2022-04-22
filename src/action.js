import fetch from 'node-fetch';
const core = require('@actions/core');

async function run() {
	const SERVICEID = core.getInput('service-id') || process.env.SERVICEID;
  const APIKEY = core.getInput('api-key') || process.env.APIKEY;
  
	const response = await fetch('https://api.render.com/v1/services/' + SERVICEID + '/deploys', {
		method: 'POST',
		headers: { 'Authorization': `Bearer ${APIKEY}`}
		})

	core.info(`Response received: ${response.status}`)
}

run().catch(e => core.setFailed(e.message));