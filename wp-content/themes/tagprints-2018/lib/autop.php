<?php

remove_filter('the_content', 'wpautop');

add_filter('the_content', 'tagprints_autop_disable');

function tagprints_autop_disable($content) {

	if (function_exists('get_field')) {
		if (get_field('disableAutoP')) {
			return $content;
		}
	}

	return wpautop($content);
}
