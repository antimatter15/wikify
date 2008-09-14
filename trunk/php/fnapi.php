<?php
$fn = "sites/".str_replace(":","_",str_replace("/","_",htmlentities(urlencode(stripslashes($_REQUEST["channel"])))))."XF".str_replace(":","_",str_replace("/","_",htmlentities(urlencode(stripslashes($_REQUEST["url"]))))).".txt";
?>