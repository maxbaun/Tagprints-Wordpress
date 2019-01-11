<?php
/**
 * Template Name: Photobooth Lite
 *
 * @package - TagPrints 2018 Theme
 */

?>

<?php get_template_part('templates/includes/head'); ?>

<?php

$context = Timber\Timber::get_context();
$context['post'] = new Timber\Post();

Timber\Timber::render('templates/template-photobooth-lite.twig', $context);

?>

<?php get_template_part('templates/includes/foot'); ?>
