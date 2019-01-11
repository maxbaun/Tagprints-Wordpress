<?php

add_action('admin_bar_menu', 'tagprints_add_deply_menu', 100);

function tagprints_add_deply_menu($adminBar) {
	$adminBar->add_menu(array(
		'id' => 'tagprintsDeploy',
		'title' => 'Deploy To'
	));

	$adminBar->add_menu(array(
		'id' => 'tagprintsDeployStaging',
		'title' => 'Staging',
		'parent' => 'tagprintsDeploy',
		'href' => '#',
		'meta' => array(
			'class' => 'tagprintsDeployStaging',
			'id' => 'tagprintsDeployStaging'
		)
	));

	$adminBar->add_menu(array(
		'id' => 'tagprintsDeployProduction',
		'title' => 'Production',
		'parent' => 'tagprintsDeploy',
		'href' => '#',
		'meta' => array(
			'class' => 'tagprintsDeployProduction',
			'id' => 'tagprintsDeployProduction'
		)
	));

	return $adminBar;
}

