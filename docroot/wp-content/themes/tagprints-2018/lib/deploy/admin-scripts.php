<?php

add_action('admin_enqueue_scripts', 'tagprints_admin_js');

function tagprints_admin_js() {
	wp_enqueue_script('deployScripts', get_template_directory_uri() . '/lib/deploy/deploy.js', null, true);

	$constants = array(
		'NetlifyProductionHook' => getenv('NETLIFY_PRODUCTION_HOOK'),
		'NetlifyStagingHook' => getenv('NETLIFY_STAGING_HOOK')
	);

	wp_localize_script('deployScripts', 'TagprintsGlobalConstants', $constants);
}
