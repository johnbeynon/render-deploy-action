const core = require('@actions/core');

try {
	const serviceID = core.getInput('service-id');
	const key = core.getInput('key')

	const options = {
		method: 'POST',
	};

	fetch('https://api.render.com/deploy/' + serviceID + '?key=' + key, options)
  .then(response => response.json())
  .then(response => console.log(response))
  .catch(err => console.error(err));

} catch (error) {
  core.setFailed(error.message);
}

