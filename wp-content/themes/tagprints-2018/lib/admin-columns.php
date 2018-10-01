<?php

add_filter('manage_pages_columns', 'tagprints_column_page');
function tagprints_column_page($defaults) {
	$defaults['column_template'] = 'Page Template';
	return $defaults;
}

add_action('manage_pages_custom_column', 'tagprings_column_page_template', 10, 2);
function tagprings_column_page_template($column_name, $post_ID) {
	if ($column_name == 'column_template') {
		$custom_field_values = get_post_meta($post_ID, 'page_template');
		if (!empty($custom_field_values)) {
			echo '<p> '. join(', ', $custom_field_values) .' </p>';
		}
	}
}
