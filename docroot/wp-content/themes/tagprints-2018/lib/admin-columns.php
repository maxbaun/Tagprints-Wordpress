<?php

add_filter('manage_pages_columns', 'tagprints_column_page');
function tagprints_column_page($defaults) {
	$defaults['column_template'] = 'Page Template';
	return $defaults;
}

add_action('manage_pages_custom_column', 'tagprings_column_page_template', 10, 2);
function tagprings_column_page_template($column_name, $post_ID) {
	if ($column_name == 'column_template') {
		$template = get_page_template_slug($post_ID);
		if (!empty($template)) {
			echo '<p> '. $template .' </p>';
		}
	}
}
