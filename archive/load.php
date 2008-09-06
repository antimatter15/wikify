/*START*/

edt(true); /*TURNOFF DESIGNMODE*/

setTimeout(function(){

<?php
$fn = "sites/".str_replace(":","_",str_replace("/","_",htmlentities(stripslashes($_REQUEST["url"]))));
if(file_exists($fn)){
foreach(explode("<<(X)>>",file_get_contents($fn)) as $k){
echo "parse('".$k."');\n";
}
}
?>

edt(); /*TURNON DESIGNMODE*/

},100);

/*END*/