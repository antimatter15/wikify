<?php
if($_POST["url"] && $_POST["dat"]){

include "fnapi.php";
if(!file_exists($fn)){
$f = fopen($fn, 'w') or die("can't create file");
fclose($f);
}
$fh = fopen($fn, 'a') or die("can't open file");
fwrite($fh, str_replace("+","%20",stripslashes($_REQUEST["dat"]))."<<(X)>>");
fclose($fh);

echo 'saved data (iframe) '.$fn.'';
}else{
echo 'Error! Invalid Parameters';
}
?>
