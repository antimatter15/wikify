
    (function(){
    var g = function(q){ 
    q = unescape(q);
    var w = q.split("<!!!>");
    for(var i = 0;i < w.length; i++){ try{
    var f = w[i].split("[[]]"), 
    u = f[0].split("</,/>")
    var e = (u[0]=="_xdby")?document.body:document.getElementById(u[0]), a=u.slice(1);
    if(!(a[0]=="" && a.length == 1) && a){
    var m = [];
    for(var x = 0; x < e.childNodes.length; x++){
    if(e.childNodes[x].nodeType != 3){
    m.push(e.childNodes[x])}}
    while(a.length>0) e=m.childNodes[a.splice(0,1)];
    }
    e.innerHTML = f[1]
    }catch(err){}}};


/*CGPARTSTART*/

<?php
include "fnapi.php";
echo "\n /* FILENAME: $fn */ \n";
if(file_exists($fn)){
foreach(explode("<<(X)>>",file_get_contents($fn)) as $k){
if($k != ""){
echo "\n ng('".str_replace("+","%20",$k)."');\n";
}
}
}else{
echo "\n /*NO FILE EXISTS!*/ \n";
}
?>


/*CGPARTEND*/


})();

