<?php

add_filter('template_include', 'redirect_to_app_frontend', 99);

function redirect_to_app_frontend() {
	$redirect = getenv('APP_URL');
	header("Location: $redirect");
}
