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

add_filter('rest_post_collection_params', 'tagprints_prefix_add_rest_orderby_params', 10, 1);
add_filter('rest_lookbook_collection_params', 'tagprints_prefix_add_rest_orderby_params', 10, 1);
add_filter('rest_case_study_collection_params', 'tagprints_prefix_add_rest_orderby_params', 10, 1);

function tagprints_prefix_add_rest_orderby_params($params) {
	$params['orderby']['enum'][] = 'menu_order';

	return $params;
}

function add_menu_order_to_return() {
	register_rest_field(
		array('case_study'), // add to these post types
		'menu_order', // name of field
		array('get_callback' => function ($post) {
			return intval(get_post_field('menu_order', $post['id'])); // value of field
		})
	);
}

add_action('rest_api_init', 'add_menu_order_to_return');


add_filter('acf/format_value/type=image', function ($value, $post_id, $field) {
	if (empty($value)) {
		return null;
	}

	return $value;
}, 100, 3);

add_filter('acf/format_value/type=relationship', function ($value, $post_id, $field) {
	if (empty($value)) {
		return null;
	}

	$newValues = array();
	foreach ($value as $v) {
		$v->featured_media = wp_get_attachment_image_url(get_post_thumbnail_id($v->ID), 'full');
		$v->url = get_permalink($v);
		$newValues[] = $v;
	}

	return $newValues;
}, 100, 3);
// add_filter('acf/format_value/type=relationship', 'nullify_empty', 100, 3);
// // not sure if gallery is internally named gallery as well but this should work
// add_filter('acf/format_value/type=gallery', 'nullify_empty', 100, 3);
add_filter('acf/format_value/type=repeater', function ($value, $post_id, $field) {
	if (empty($value)) {
		return null;
	}

	return $value;
}, 100, 3);

add_filter('acf/format_value/type=group', function ($value, $post_id, $field) {
	if (empty($value)) {
		return null;
	}

	return $value;
}, 100, 3);

add_filter('acf/format_value/type=gallery', function ($value, $post_id, $field) {
	if (empty($value)) {
		return null;
	}

	return $value;
}, 100, 3);

add_filter('acf/format_value/type=component_field', function ($value, $post_id, $field) {
	if (empty($value)) {
		return null;
	}

	return $value;
}, 100, 3);

add_filter('acf/format_value/type=flexible_content', function ($value, $post_id, $field) {
	if (empty($value)) {
		return array();
	}

	return $value;
}, 100, 3);

add_filter('acf/format_value/type=image', function ($value, $post_id, $field) {
	if (empty($value)) {
		return null;
	}

	return $value;
}, 100, 3);

add_filter('acf/format_value/type=link', function ($value, $post_id, $field) {
	if (empty($value)) {
		return null;
	}

	return $value;
}, 100, 3);
