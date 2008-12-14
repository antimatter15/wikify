<?php
header("content-type: text/javascript");
$scripts = array(
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
"js/message.js",
"js/init.js"
);

$c = "";

foreach($scripts as $script){
  $c.="\n\n /*wikify file: $script */ \n\n".file_get_contents("../".$script)."\n\n";
}

echo file_get_contents("../js/config.js")."\n\n".$c;

file_put_contents("../js/wikify.js",file_get_contents("../js/config.js")."\n\n".$c);
file_put_contents("../../appengine/webwikify/static3/wikify2.js",file_get_contents("../js/config.GAE.js")."\n\n".$c);
?>