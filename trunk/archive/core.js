/*
* Wikifying the Internets
* 
* javascript:(function(){var url='core.js';if(wikinternet_loaded){save()}else{var x=document.createElement("script");x.type="text/javascript";x.src=url;document.getElementsByTagName("head")[0].appendChild(x);}})()
* 
*/

var saveurl = "save.php";
var loadurl = "load.php";

//it's not necessary to edit anything beyond this point

var wikinternet_loaded = true;

var snapshot;

function gpi(e){
var i=e.parentNode.childNodes,
x=i.length;
while(x--){
if(i[x]==e) 
return x 
}
}


function ghx(e,a){
a=a?a:[]
if(e!=document.body && !e.id){
a.push(gpi(e));
return ghx(e.parentNode,a)
}else
return [a.reverse(),(e.id?e.id:"_xdocbody")]
}

function fbx(a,b){
var e=(b=="_xdocbody")?document.body:document.getElementById(b)
while(a.length>0) 
e=e.childNodes[a.splice(0,1)]
return e;
}

function edt(off){
document.designMode = off?"Off":"on"
snapshot=snp();
}

function start(){
load()
}

function sdiff(noesc){
if(snapshot){
var x = diff();
for(var i = 0; i < x.length; i++){
x[i]=x[i].join("[[]]")
}
var o = x.join("<!!!>")
}
snapshot=snp();
return (noesc?(function(x){return x?x:""}):escape)(o);
}

function save(){
var sdc = sdiff();
if(sdc!=""){
send(saveurl,"url="+window.location.href+"&dat="+sdc);
}
}

function load(){
edt(true);
send(loadurl,"url="+window.location.href);
}

function snp(){
var x = document.getElementsByTagName("*"), s = {}
for(var i = 0; i < x.length; i++){
if(x[i] != document.body && x[i].id.indexOf("firebug") == -1 && x[i].innerHTML.indexOf("<") == -1){
try{
var mk = ghx(x[i]);
s[mk[1]+"</,/>"+mk[0].join("</,/>")]=x[i].innerHTML
}catch(err){}
}
}
return s;
}

function diff(){
var s = snp(),v=[]
for(var x in s){
if(s[x] != snapshot[x]){
v.push([x,s[x]])
}
}
return v
}

function send(url,params){
var x = document.createElement("script");
x.type = "text/javascript"
x.src=url+"?cachekillerz="+Math.random().toString()+"&"+params;
document.getElementsByTagName("head")[0].appendChild(x);
}

function parse(q,nomodif){
if(q!=""){
q=unescape(q);
var w=q.split("<!!!>")
for(var i=0;i<w.length;i++){
var f=w[i].split("[[]]")
var u=f[0].split("</,/>");
var o = fbx(u.slice(1),u[0])
if(!nomodif){
if(o){
o.innerHTML = f[1];
}
}else{
console.log(o,f[1])
}
}
}
}

start();