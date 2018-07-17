<?php
/*
Plugin Name: Media Cleaner Pro
Plugin URI: https://meowapps.com
Description: Clean your Media Library, many options, trash system.
Version: 4.8.4
Author: Jordy Meow
Author URI: https://meowapps.com
Text Domain: media-cleaner

Originally developed for two of my websites:
- Jordy Meow (http://offbeatjapan.org)
- Haikyo (http://haikyo.org)
*/

if ( class_exists( 'Meow_WPMC_Core' ) ) {
	function wpmc_thanks_admin_notices() {
		echo '<div class="error"><p>Thanks for installing the Pro version of Media Cleaner :) However, the free version is still enabled. Please disable or uninstall it.</p></div>';
	}
	add_action( 'admin_notices', 'wpmc_thanks_admin_notices' );
	return;
}

if ( is_admin() ) {
	global $wpmc_version;
	$wpmc_version = '4.8.4';

	// Admin
	require __DIR__ . '/admin.php';
	$wpmc_admin = new Meow_WPMC_Admin( 'wpmc', __FILE__, 'media-cleaner' );

	// Core
	require __DIR__ . '/core.php';
	wpmc_init( __FILE__ );
	$wpmc_core = new Meow_WPMC_Core( $wpmc_admin );
	$wpmc_admin->core = $wpmc_core;

	// Pro Core
	require __DIR__ . '/meowapps/core.php';
	new MeowAppsPro_WPMC_Core( 'wpmc', __FILE__, 'media-cleaner',
		$wpmc_version, $wpmc_core, $wpmc_admin );

	// UI
	require __DIR__ . '/ui.php';
	new Meow_WPMC_UI( $wpmc_core, $wpmc_admin );
}

?>
