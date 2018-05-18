<?php


// Allow CORS
function tagprints_allow_cors() {
	header('Access-Control-Allow-Origin: *');
	header('Access-Control-Allow-Methods: GET');
	header('Access-Control-Allow-Credentials: true');
	header('Access-Control-Expose-Headers: Link', false);
}
add_action('rest_api_init', 'tagprints_allow_cors', 15);

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Expose-Headers: Link', false);
