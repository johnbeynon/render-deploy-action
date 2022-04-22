const core = require('@actions/core');
import fetch from "node-fetch";

try {
	const serviceID = core.getInput('service-id');
	const key = core.getInput('api-key')

	fetch('https://api.render.com/v1/services/' + serviceID + '/deploys', {
		method: 'POST',
		headers: { 'Authorization': `Bearer ${key}`}
		}).then(response => {
			core.info(`Received response: ${response.status}`)
		})
		.catch(error => core.setFailed(error.message));

} catch (error) {
  core.setFailed(error.message);
}
