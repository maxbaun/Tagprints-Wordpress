<?php

class MeowAppsPro_WPMC_Core {

	private $prefix = 'wpmc';
	private $item = 'Media Cleaner Pro';
	private $admin = null;
	private $core = null;
	public static $exclude_dir = array( ".", "..", "wpmc-trash", ".htaccess",
	"ptetmp", "profiles", "sites", "bws_captcha_images",
	"woocommerce_uploads", "wc-logs", "bb-plugin" );

	public function __construct( $prefix, $mainfile, $domain, $version, $core, $admin  ) {
		$this->prefix = $prefix;
		$this->mainfile = $mainfile;
		$this->domain = $domain;
		$this->core = $core;
		$this->admin = $admin;
		new MeowApps_Admin_Pro( $prefix, $mainfile, $domain, $this->item, $version );

		// Overrides for the Pro
		add_action( 'init', array( $this, 'init' ) );
		add_filter( 'wpmc_plugin_title', array( $this, 'plugin_title' ), 10, 1 );
		add_action( 'wpmc_list_uploaded_files', array( $this, 'list_uploaded_files' ), 10, 2 );
		add_filter( 'wpmc_check_file', array( $this, 'check_file' ), 10, 2 );
	}

	function init() {
		require( 'scan.php' );
		new MeowAppsPro_WPMC_Scan( $this->core );
	}

	function plugin_title( $string ) {
			return $string . " (Pro)";
	}

	function list_uploaded_files( $result, $path ) {
		$upload_folder = wp_upload_dir();
		$files = $this->scan_list_uploaded_files( $path ? ( trailingslashit( $upload_folder['basedir'] ) . $path ) : $upload_folder['basedir'] );
		return array( 'results' => $files, 'success' => true, 'message' => __( "Files retrieved.", 'media-cleaner' ) );
	}

	function scan_list_uploaded_files( $dir ) {
		$result = array();
		$files = scandir( $dir );
		$files = array_diff( $files, MeowAppsPro_WPMC_Core::$exclude_dir );
		$thumbnails_only = get_option( 'wpmc_thumbnails_only', false );
		$utf8 = get_option( 'wpmc_utf8', false );
		foreach( $files as $file ) {
			$fullpath = trailingslashit( $dir ) . $file;
			if ( $thumbnails_only && !is_dir( $fullpath ) && !preg_match("/(\-\b)[0-9]\d*x[0-9]\d*(\b.jpg\b)/", $file ) )
				continue;
			if ( !$utf8 && mb_detect_encoding( $file, 'ASCII', true ) === false )
				continue;
			array_push( $result, array( 'path' => $this->core->wpmc_clean_uploaded_filename( $fullpath ), 
				'type' => is_dir( $fullpath ) ? 'dir' : 'file' ) );
		}
		return $result;
	}

	// Return true if the files is referenced, false if it is not.
	function check_file( $result, $path ) {
		global $wpdb, $wpmc_debug;
		$path = stripslashes( $path );
		$filepath = wp_upload_dir();
		$filepath = $filepath['basedir'];
		$filepath = trailingslashit( $filepath ) . $path;

		// Ignored path
		if ( $this->core->wpmc_check_is_ignore( $path ) )
			return true;

		// Retina support
		if ( strpos( $path, '@2x.' ) !== false ) {
			$originalfile = str_replace( '@2x.', '.', $filepath );
			if ( file_exists( $originalfile ) )
				return true;
			else {
				$table_name = $wpdb->prefix . "mclean_scan";
				$wpdb->insert( $table_name,
					array(
						'time' => current_time('mysql'),
						'type' => 0,
						'path' => $path,
						'size' => filesize( $filepath ),
						'issue' => 'ORPHAN_RETINA'
					)
				);
				return false;
			}
		}

		$issue = "NO_CONTENT";
		$check_medialibrary = get_option( 'wpmc_media_library', false );

		// Is it a Media?
		$attachment_id = $this->core->wpmc_find_attachment_id_by_file( $path );
		if ( $check_medialibrary && !empty( $attachment_id ) )
			return true;

		// No Media ID? We maybe have a filename with resolution.
		if ( empty( $attachment_id ) ) {
			$potential_filepath = $this->core->clean_url_from_resolution( $filepath );
			if ( file_exists( $potential_filepath ) ) {
				$mainfile = $this->core->clean_url_from_resolution( $path );
				$potentialMediaId = $this->core->wpmc_find_attachment_id_by_file( $mainfile );
				// Found Media ID, but is really the file with
				if ( !empty( $potentialMediaId ) ) {
					$meta = wp_get_attachment_metadata( $potentialMediaId );
					if ( $meta ) {
						$attachment_id = $potentialMediaId;
						$pathinfo = pathinfo( $meta['file'] );
						foreach ( $meta['sizes'] as $size ) {
							$sizepath = trailingslashit( $pathinfo['dirname'] ) . $size['file'];
							//$this->core->log( "Check with Media {$potentialMediaId}: {$sizepath}." );
							// This size is part of the Media.
							if ( $sizepath == $path ) {
								if ( $check_medialibrary ) {
									$this->core->log( "File {$path} found in metadata of Media {$attachment_id}." );
									return true;
								}
							}
						}
					}
				}
			}
		}

		if ( get_option( 'wpmc_media_library', false ) && !empty( $attachment_id ) )
			return true;
		if ( get_option( 'wpmc_media_library', false ) )
			$issue = "NO_MEDIA";

		$path = $this->core->wpmc_clean_uploaded_filename( $path );
		if ( $this->core->checkers->check_file( $path ) )
			return true;

		$table_name = $wpdb->prefix . "mclean_scan";
		$filesize = file_exists( $filepath ) ? filesize ($filepath) : 0;
		$wpdb->insert( $table_name,
			array(
				'time' => current_time('mysql'),
				'type' => 0,
				'path' => $path,
				'size' => $filesize,
				'issue' => $issue
			)
		);
		return false;
	}

}
