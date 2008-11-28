<?php
header("content-type: text/javascript");
$scripts = array(
"js/config.js",
"js/misc.js",
"js/toolbar.js",
"js/jquery.color.mini.js",
"js/jquery.designmode.js",
"js/editor.js",
"js/mode.js",
"js/button.js",
"js/ui.js",
"js/help.js",
"js/channel.js",
"js/data.js",
"js/communication.js",
"js/dom.js",
"js/init.js"
);

$c = "";

foreach($scripts as $script){
  $c.="\n\n".file_get_contents("../".$script)."\n\n";
  echo "\n\n".file_get_contents("../".$script)."\n\n";
}

file_put_contents("../js/wikify.js",$c);
?>