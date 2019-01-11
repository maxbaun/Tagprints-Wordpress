<?php

class MeowAppsPro_WPMC_Scan {

	private $core = null;

	public function __construct( $core  ) {
		$this->core = $core;

		// Divi (ElegantThemes)
		if ( function_exists( '_et_core_find_latest' ) )
			add_action( 'wpmc_scan_post', array( $this, 'scan_html_divi' ), 10, 2 );

		// Visual Composer (WPBakery)
		if ( class_exists( 'Vc_Manager' ) ) {
			add_action( 'wpmc_scan_post', array( $this, 'scan_html_visualcomposer' ), 10, 2 );
			add_action( 'wpmc_scan_postmeta', array( $this, 'scan_postmeta_visualcomposer' ), 10, 1 );
		}

		// Fusion Builder (Avada)
		if ( function_exists( 'fusion_builder_map' ) )
			add_action( 'wpmc_scan_post', array( $this, 'scan_html_fusionbuilder' ), 10, 2 );

		// Beaver Builders
		if ( class_exists( 'FLBuilderModel' ) )
			add_action( 'wpmc_scan_postmeta', array( $this, 'scan_postmeta_beaverbuilder' ), 10, 1 );
	}

	public function scan_html_divi( $html, $id ) {
		$posts_images_urls = array();
		$galleries_images_et = array();

		// Single Image
		preg_match_all( "/src=\"((https?:\/\/)?[^\\&\#\[\] \"\?]+\.(jpe?g|gif|png|ico|tif?f|bmp))\"/", $html, $res );
		if ( !empty( $res ) && isset( $res[1] ) && count( $res[1] ) > 0 ) {
			foreach ( $res[1] as $url ) {
				if ( !preg_match('/(elegantthemesimages\.com)|(elegantthemes\.com)/', $url ) )
					array_push( $posts_images_urls, $this->core->wpmc_clean_url( $url ) );
			}
		}

		// Background Image
		preg_match_all( "/background_image=\"((https?:\/\/)?[^\\&\#\[\] \"\?]+\.(jpe?g|gif|png|ico|tif?f|bmp))\"/", $html, $res );
		if ( !empty( $res ) && isset( $res[1] ) && count( $res[1] ) > 0 ) {
			foreach ( $res[1] as $url ) {
				if ( !preg_match('/(elegantthemesimages\.com)|(elegantthemes\.com)/', $url ) )
					array_push( $posts_images_urls, $this->core->wpmc_clean_url( $url ) );
			}
		}

		// Galleries
		preg_match_all( "/gallery_ids=\"([0-9,]+)/", $html, $res );
		if ( !empty( $res ) && isset( $res[1] ) ) {
			foreach ( $res[1] as $r ) {
				$ids = explode( ',', $r );
				$galleries_images_et = array_merge( $galleries_images_et, $ids );
			}
		}

		$this->core->add_reference_url( $posts_images_urls, 'CONTENT (URL)' );
		$this->core->add_reference_id( $galleries_images_et, 'PAGE BUILDER (ID)' );
	}

	public function scan_html_visualcomposer( $html, $id ) {
		$posts_images_vc = array();
		$galleries_images_vc = array();

		// Single Image
		preg_match_all( "/image=\"([0-9]+)\"/", $html, $res );
		if ( !empty( $res ) && isset( $res[1] ) && count( $res[1] ) > 0 ) {
			foreach ( $res[1] as $url ) {
				array_push( $posts_images_vc, $this->core->wpmc_clean_url( $url ) );
			}
		}
		$this->core->add_reference_id( $posts_images_vc, 'PAGE BUILDER (ID)' );

		// Gallery
		preg_match_all( "/images=\"([0-9,]+)/", $html, $res );
		if ( !empty( $res ) && isset( $res[1] ) ) {
			foreach ( $res[1] as $r ) {
				$ids = explode( ',', $r );
				$galleries_images_vc = array_merge( $galleries_images_vc, $ids );
			}
		}
		$this->core->add_reference_id( $galleries_images_vc, 'GALLERY (ID)' );
	}

	public function scan_html_fusionbuilder( $html, $id ) {
		$galleries_images_fb = array();
		preg_match_all( "/image_ids=\"([0-9,]+)/", $html, $res );
		if ( !empty( $res ) && isset( $res[1] ) ) {
			foreach ( $res[1] as $r ) {
				$ids = explode( ',', $r );
				$galleries_images_fb = array_merge( $galleries_images_fb, $ids );
			}
		}
		$this->core->add_reference_id( $galleries_images_fb, 'PAGE BUILDER GALLERY (ID)' );
	}

	public function scan_postmeta_beaverbuilder( $id ) {
		$postmeta_images_ids = array();
		$postmeta_images_urls = array();
		$data = get_post_meta( $id, '_fl_builder_data' );
		if ( !empty( $data ) ) {
			$this->core->get_from_meta( $data, array( 'id', 'bg_image_src', 'photo_src' ), $postmeta_images_ids, $postmeta_images_urls );
		}
		$this->core->add_reference_id( $postmeta_images_ids, 'PAGE BUILDER META (ID)' );
		$this->core->add_reference_url( $postmeta_images_urls, 'PAGE BUILDER META (URL)' );
	}

	public function scan_postmeta_visualcomposer( $id ) {
		$urls = get_transient( "wpmc_postmeta_images_urls" );
		if ( empty( $urls ) )
			$urls = array();
		$data = get_post_meta( $id, '_wpb_shortcodes_custom_css' );
		if ( is_array( $data ) ) {
			foreach ( $data as $d ) {
				$newurls = $this->core->get_urls_from_html( $d );
				$urls = array_merge( $urls, $newurls );
			}
		}
		$this->core->add_reference_url( $urls, 'PAGE BUILDER META (URL)' );
	}

}
