const core = require('@actions/core');

try {
	const serviceID = core.getInput('service-id');
	const apiKey =  core.getInput('api-key');

	const sdk = require('api')('@render-api/v1.0#t0hgnkl09w8siw');

	sdk.auth(apiKey);
	sdk['create-deploy']({clearCache: 'do_not_clear'}, {serviceId: serviceID })
  	.then(res => core.info(res))
  	.catch(err => core.setFailed(err));

} catch (error) {
  core.setFailed(error.message);
}

