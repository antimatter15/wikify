<?php
header("content-type: text/javascript");
$scripts = array(
"js/config.js",
"js/misc.js",
"js/toolbar.js",
"js/jquery.color.js",
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

foreach($scripts as $script){
  echo "\n\n".file_get_contents("../".$script)."\n\n";
}
?>