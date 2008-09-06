<?php
$fn = "sites/".str_replace(":","_",str_replace("/","_",htmlentities(urlencode(stripslashes($_REQUEST["url"]))))).".txt";
if(!file_exists($fn)){
$f = fopen($fn, 'w') or die("can't create file");
fclose($f);

}
$fh = fopen($fn, 'a') or die("can't open file");
fwrite($fh, str_replace("+","%20",stripslashes($_REQUEST["dat"]))."<<(X)>>");
fclose($fh);

echo '/*saved '.$fn.'*/';
?>

Wikify.setEditable(false)

setTimeout(function(){

Wikify.uisaved();

},100);