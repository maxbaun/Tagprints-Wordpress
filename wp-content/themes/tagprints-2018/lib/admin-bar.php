<?php

add_action('admin_bar_menu', 'tagprints_add_deply_menu', 100);

function tagprints_add_deply_menu($wp_admin_bar) {
	$wp_admin_bar->add_menu(array(
		array(
			'id' => 'tagprintsDeployStaging',
			'title' => 'Deploy -> Staging'
		)
	));

	return $wp_admin_bar;
}

