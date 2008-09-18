    (function(){
    var g = function(q){ 
    q = unescape(q); //unescape data
    var w = q.split("<!!!>"); //split changes
    for(var i = 0;i < w.length; i++){ //loop through changes
    try{ //ignore errors
    var f = w[i].split("[[]]"), //split contnet
    u = f[0].split("</,/>"); //decrypt ID
    (function(a,b){ //get element from identifier
    var e = (b=="_xdby")?document.body:document.getElementById(b); //get origin
    if((a[0]=="" && a.length == 1) || !a){return e}
    while(a.length>0) //loop while a (from id) is not empty
    e = (function(e){ //element
    var m = [], k = e.childNodes, v = k.length, u;
    for(var x = 0; x < v; x++){
    u = k[x];
    if(u.nodeType != 3){
    m.push(u)
    }
    }
    return m;
    })(e)[a.splice(0,1)]; //set e to child of itself
    //end while loop
    return e; //return element
    })(u.slice(1),u[0]).innerHTML = f[1]; //set element contents
    }catch(err){
    }; //ignore errors
    } //end loop
    };

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

