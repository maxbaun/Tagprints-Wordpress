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

add_filter('rest_endpoints', function ($endpoints) {
	if (isset($endpoints['/wp/v2/comments'])) {
		unset($endpoints['/wp/v2/comments']);
	}

	if (isset($endpoints['/wp/v2/comments/(?P<id>[\d]+)'])) {
		unset($endpoints['/wp/v2/comments/(?P<id>[\d]+)']);
	}

	if (isset($endpoints['/wp/v2/menu-locations'])) {
		unset($endpoints['/wp/v2/menu-locations']);
	}

	if (isset($endpoints['/regenerate-thumbnails/v1'])) {
		unset($endpoints['/regenerate-thumbnails/v1']);
	}

	if (isset($endpoints['/acf/v3/tags'])) {
		unset($endpoints['/acf/v3/tags']);
	}

	if (isset($endpoints['/acf/v3/comments'])) {
		unset($endpoints['/acf/v3/comments']);
	}

	if (isset($endpoints['/acf/v3/users'])) {
		unset($endpoints['/acf/v3/users']);
	}

	if (isset($endpoints['/acf/v3/media'])) {
		unset($endpoints['/acf/v3/media']);
	}

	if (isset($endpoints['/wp/v2/statuses'])) {
		unset($endpoints['/wp/v2/statuses']);
	}

	if (isset($endpoints['/wp/v2/users'])) {
		unset($endpoints['/wp/v2/users']);
	}

	if (isset($endpoints['/regenerate-thumbnails/v1/featuredimages'])) {
		unset($endpoints['/regenerate-thumbnails/v1/featuredimages']);
	}

	return $endpoints;
});

add_filter( 'rest_post_collection_params', 'tagprints_prefix_add_rest_orderby_params', 10, 1 );
add_filter( 'rest_lookbook_collection_params', 'tagprints_prefix_add_rest_orderby_params', 10, 1 );
add_filter( 'rest_case_study_collection_params', 'tagprints_prefix_add_rest_orderby_params', 10, 1 );

function tagprints_prefix_add_rest_orderby_params($params) {
    $params['orderby']['enum'][] = 'menu_order';

    return $params;
}
