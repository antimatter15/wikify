/*START*/

Wikify.loadhistory([

/*CGPARTSTART*/

<?php
include "fnapi.php";
echo "\n /* FILENAME: $fn */ \n";
if(file_exists($fn)){
foreach(explode("<<(X)>>",file_get_contents($fn)) as $k){
if($k != ""){
echo "['".str_replace("+","%20",$k)."'],\n";
}
}
}else{
echo "/*NO DATA ON URL!*/'ENDPARSE', \n";
}
?>


/*CGPARTEND*/


      "ENDPARSE"]);
      
      Wikify.autoparse();
      

/*END*/