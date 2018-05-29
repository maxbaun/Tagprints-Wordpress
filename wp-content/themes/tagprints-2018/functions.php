<?php
/**
* Cutlass includes
*
* The $cutlass_includes array determines the code library included in your theme.
* Add or remove files to the array as needed. Supports child theme overrides.
*
* Please note that missing files will produce a fatal error.
*/

require_once(__DIR__ . '/vendor/autoload.php');

// Initialize Timber
new Timber\Timber();
\Timber\Timber::$dirname = array( 'templates' );

/* Start wp customization */
define('DISALLOW_FILE_EDIT', true); // Don't allow file edtiting
define('DISALLOW_FILE_MODS', true); // Don't allow plugin uploads
/* End wp customization */

$cutlass_includes = array(
	// 'inc/assets.php',
	// 'inc/replace-images.php',
	// 'inc/utils.php',
	// 'inc/deregister-scripts.php',
	'inc/init.php',
	// 'inc/theme-settings.php',
	// 'inc/component-scripts.php',
	// 'inc/our-work-component.php',
	// 'inc/pbl/pbl-component.php',
	// 'inc/react-app.php',
	// 'inc/config.php',
	// 'inc/activation.php',
	// 'inc/titles.php',
	// 'inc/wp_bootstrap_navwalker.php',
	// 'inc/gallery.php',
	// 'inc/comments.php',
	// 'inc/extras.php',
	// 'inc/image-sizes.php',
	'inc/shortcodes/index.php',
	// 'inc/custom-post-types/case-study.php',
	// 'inc/custom-post-types/icons.php',
	// 'inc/custom-post-types/lookbook.php',
	// 'inc/widgets.php',
	// 'inc/widgets/index.php',
	// 'inc/s3.php',
	// 'inc/check-plugins.php',
	'lib/api.php',
	'lib/app-redirect.php',
	'lib/deploy/admin-bar.php',
	'lib/deploy/admin-scripts.php'
);

foreach ($cutlass_includes as $file) {
	if (!$filepath = locate_template($file)) {
		trigger_error(sprintf(__('Error locating %s for inclusion', 'cutlass'), $file), E_USER_ERROR);
	}

	require_once $filepath;
}
unset($file, $filepath);
