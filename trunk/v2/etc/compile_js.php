<?php
$scripts = array(
"js/config.js",
"js/init.js",
"js/jquery.color.js",
"js/jquery.designmode.js",
"js/misc.js",
"js/editor.js",
"js/mode.js",
"js/button.js",
"js/ui.js",
"js/help.js",
"js/channel.js",
"js/data.js",
"js/communication.js",
"js/dom.js"
);

foreach($scripts as $script){
  echo "\n\n".file_get_contents("../".$script)."\n\n";
}
?>