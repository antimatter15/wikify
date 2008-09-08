function WKXfromID(a,b){ //get element from identifier
var e = (b=="_xdby")?document.body:document.getElementById(b); //get origin
if((a[0]=="" && a.length == 1) || !a){return e}
while(a.length>0) //loop while a (from id) is not empty
e = e.childNodes[a.splice(0,1)]; //set e to child of itself
//end while loop
return e; //return element
}

function WKXparse(q){ //parse output from server
q = unescape(q); //unescape data
var w = q.split("<!!!>"); //split changes
for(var i = 0;i < w.length; i++){ //loop through changes
try{ //ignore errors
var f = w[i].split("[[]]"), //split contnet
u = f[0].split("</,/>") //decrypt ID
WKXfromID(u.slice(1),u[0]).innerHTML = f[1]; //set element contents
}catch(err){
//console.error(err)
}; //ignore errors
} //end loop
}


/*CGPARTSTART*/

<?php
$fn = "sites/".str_replace(":","_",str_replace("/","_",htmlentities(urlencode(stripslashes($_REQUEST["url"]))))).".txt";
echo "\n /* FILENAME: $fn */ \n";
if(file_exists($fn)){
foreach(explode("<<(X)>>",file_get_contents($fn)) as $k){
if($k != ""){
echo "WKXparse('".str_replace("+","%20",$k)."');\n";
}
}
}else{
echo "\n /*NO FILE EXISTS!*/ \n";
}
?>


/*CGPARTEND*/

