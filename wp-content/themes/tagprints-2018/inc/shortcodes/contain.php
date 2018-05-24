<?php

function callback_contain($atts,$content=null){
  extract(shortcode_atts( array(
    'class' => '',
    'style' => '',
  ), $atts ));


  $html = '';
  $html .= '<div class="row"><div class="'.'col-md-8 col-md-offset-2'.'">';
  $html .= do_shortcode($content);
  $html .= '</div></div>';

  return force_balance_tags($html);
}

add_shortcode('contain','callback_contain' );

?>
