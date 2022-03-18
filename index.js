const core = require('@actions/core');
const fetch = require('node-fetch');

try {
	const serviceID = core.getInput('service-id');

	const options = {
		method: 'POST',
	};

	fetch('https://api.render.com/v1/services/' + serviceID + '/deploys', options)
		.then(response => response.json())
		.then(response => console.log(response))
		.catch(err => console.error(err));

} catch (error) {
  core.setFailed(error.message);
}

