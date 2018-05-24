<?php

add_action('save_page', 'tagprintsTriggerNetlifyBuild' );
add_action('save_lookbook', 'tagprintsTriggerNetlifyBuild' );
add_action('save_case-study', 'tagprintsTriggerNetlifyBuild' );
add_action('save_post', 'tagprintsTriggerNetlifyBuild' );
function tagprintsTriggerNetlifyBuild($post_id)
{
	if(wp_is_post_revision( $post_id) || wp_is_post_autosave( $post_id )) {
		return;
	}
	$curl = curl_init();
	curl_setopt($curl, CURLOPT_URL, 'https://api.netlify.com/build_hooks/5b066f03b13fb16a987dee41');
	curl_setopt($curl, CURLOPT_POST, 1);
	curl_setopt($curl, CURLOPT_POSTFIELDS, '');
	$response = curl_exec( $curl );
	curl_close( $curl );
}
