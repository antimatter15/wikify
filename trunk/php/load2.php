/*START*/

Wikify.setEditable(false);

setTimeout(function(){

/*CGPARTSTART*/

<?php
$fn = "sites/".str_replace(":","_",str_replace("/","_",htmlentities(urlencode(stripslashes($_REQUEST["url"]))))).".txt";
echo "\n /* FILENAME: $fn */ \n";
if(file_exists($fn)){
foreach(explode("<<(X)>>",file_get_contents($fn)) as $k){
if($k != ""){
echo "Wikify.parse('".str_replace("+","%20",$k)."');\n";
}
}
}else{
echo "\n /*NO FILE EXISTS!*/ \n";
}
?>


/*CGPARTEND*/



setTimeout(function(){

Wikify.setEditable(true);
Wikify.DOMSnapshot = Wikify.capture();
Wikify.uiloaded();

},100);


},100);

/*END*/