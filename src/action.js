const fetch = require('node-fetch');
const core = require('@actions/core');

async function run() {
	const SERVICEID = core.getInput('service-id');
  const APIKEY = core.getInput('api-key') 
  
	fetch('https://api.render.com/v1/services/' + SERVICEID + '/deploys', {
		method: 'POST',
		headers: { 'Authorization': `Bearer ${APIKEY}`}
		}).then(response => {
			core.info(`Received response: ${response.status}`)
		})
		.catch(error => core.setFailed(error.message));

}

run().catch(e => core.setFailed(e.message));