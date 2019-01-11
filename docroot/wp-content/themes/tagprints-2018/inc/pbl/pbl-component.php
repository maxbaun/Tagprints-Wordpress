<?php

add_action('init', function () {
	$base = pblBasePath();

	if (!isset($base)) {
		return;
	}

	$url_path = trim(parse_url(add_query_arg(array()), PHP_URL_PATH), '/');
	$url_path = explode('/', $url_path);
	if ($url_path[0] === $base) {
		add_action('wp_enqueue_scripts', 'photoboothLiteScripts', 101);
		// load the file if exists
		// $load = locate_template('template-photobooth-lite.php', true);
		// if ($load) {
		// 	exit(); // just exit if template was found and loaded
		// }
	}
});

function photoboothLiteScripts() {
	$base = ourWorkBase();

	if (!isset($base)) {
		return;
	}

	$constants = getTagprintsGlobalConstants(pblBasePath());

	wp_localize_script('tagprints/js', 'TagprintsGlobalConstants', $constants);
	wp_enqueue_script('tagprints/vendor', asset_path('scripts/vendor.js'), ['tagprints/js'], null, true);
	wp_enqueue_script(
		'tagprints/pbl',
		asset_path('scripts/pbl.js'),
		['tagprints/js', 'tagprints/vendor'],
		null,
		true
	);
}

function pblBasePath() {
	$ourWorkBase = get_permalink(getSetting('pbl_page'));
	$siteUrl = get_home_url();

	$ourWorkBase = str_replace($siteUrl, '', $ourWorkBase);
	$parts = explode('/', $ourWorkBase);

	if (!isset($parts[1])) {
		return;
	}

	return $parts[1];
}
