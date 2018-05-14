<?php

function getTagprintsGlobalConstants($basePath) {
	return array(
		'BasePath' => '/' . $basePath,
		'AjaxUrl' => admin_url('admin-ajax.php'),
		'ApiUrl' => get_home_url() . '/wp-json',
		'CTAUrl' => get_permalink(getSetting('cta_page')),
		'PerPage' => 18
	);
}
