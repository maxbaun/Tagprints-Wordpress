const $ = window.jQuery;

function triggetNetlifyDeploy(hook) {
	return e => {
		e.preventDefault();

		if (hook === '' || !hook) {
			return;
		}

		// eslint-disable-next-line no-alert
		if (window.confirm('Are you sure you are ready to deploy?')) {
			$.post(hook);
		}
	};
}

document.addEventListener('DOMContentLoaded', () => {
	const btnStaging = document.querySelector('.tagprintsDeployStaging');
	const btnProduction = document.querySelector('.tagprintsDeployProduction');

	// Register click handlers
	btnStaging.addEventListener(
		'click',
		triggetNetlifyDeploy(TagprintsGlobalConstants.NetlifyStagingHook)
	);
	btnProduction.addEventListener(
		'click',
		triggetNetlifyDeploy(TagprintsGlobalConstants.NetlifyProductionHook)
	);

	// Make them look clickable
	btnProduction.style.cursor = 'pointer';
	btnStaging.style.cursor = 'pointer';
});
