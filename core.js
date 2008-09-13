/* Wikify Core
 * (c) Copyright 2008 Antimatter15
 * Prototype 4, Revision 6
 */

/*
Wikify Config is required! It is generated by the bookmarklet

Wikify_Config = {
saveurl: "http://saveurl.com/saveurl",
loadurl: "http://loadurl.com/loadurl"
}
*/

if(!window.Wikify){window.Wikify = {

version: "Prototype 4, Revision 6",


DOMSnapshot: {}, //snapshot of document contents
UIFrame: null, //user interface
DWin: null, //the hack frame pointing to the same location as this page
log: [], //the log for the system
oldHTML: "", //the old html of the document
links: { //link menu config
"Save": "javascript:Wikify.uisave()",
"Update": "javascript:Wikify.uiload()",
"About":" javascript:Wikify.uiabout()",
"Help": "javascript:Wikify.uihelp()"
},

/*Core Functions*/
arrayIndex: function(v, a){
for(var i = a.length; i-- && a[i] != v;);
return i;
},

getChildren: function(e){ //element
var m = [];
for(var x = 0; x < e.childNodes.length; x++){
if(e.childNodes[x].nodeType != 3){
m.push(e.childNodes[x])
}
}
return m;
},

getID: function(e){ //gets a special identifier for elements
var a=[]; //declare array
while(e!=Wikify.DWin.document.body && !e.id){ //loop until the element has an id
for(var i=0;Wikify.getChildren(e.parentNode)[i]!=e;i++){}//find parent index
a.push(i);//add to array
e = e.parentNode; //set parent
} //end loop
return [a.reverse(),(e.id?e.id:"_xdby")]; //format output
},


fromID: function(a,b){ //get element from identifier
var e = (b=="_xdby")?Wikify.DWin.document.body:Wikify.DWin.document.getElementById(b); //get origin
if((a[0]=="" && a.length == 1) || !a){return e}
while(a.length>0) //loop while a (from id) is not empty
e = Wikify.getChildren(e)[a.splice(0,1)]; //set e to child of itself
//end while loop
return e; //return element
},
/*End Core*/



cdSendData: function(url,params, callback){
var i = document.createElement("iframe"), //submit target
f = document.createElement("form"), //create new form
d = "wk_xif"+Math.ceil(Math.random()*1337*1337) //random iframe ID
i.id = d; //set iframe id
i.name = d; //set iframe name
i.style.display = "none"; //ssh! it's secret!
f.action = url; //set form action
f.method = "post"; //set form method
f.target = d; //make form submit to iframe
f.style.display = "none"; //ssh! it's secret!
for(var q in params){
var b = document.createElement("input"); //create new input
b.type = "hidden"; //it's hidden! SSH!!!!
b.name = q; //set name
b.value = params[q]; //set value
f.appendChild(b); //add to form
}
var w = document.createElement("div"); //create container
/*Area51 secrecy!!!*/
w.style.display = "none"; w.style.height = "1px";
w.style.width = "1px"; w.style.position = "absolute";
w.style.top = "-100px"; w.style.left = "-100px";
/*Declassified*/
w.appendChild(i); //append to container
w.appendChild(f); //ditto
document.body.appendChild(w); //add to document
i.onload = function(){
if(callback){callback();}
setTimeout(function(){
if(w.parentNode){
document.body.removeChild(w); //bye bye!
}
},5000);
}; //set callback!
f.submit(); //submit!
},



sendData: function(url,params,callback){ //create a JSONP request
Wikify.log.push(url+"?"+params);
var script = document.createElement("script"); //create script tag
var head = document.getElementsByTagName("head")[0]; //get head element
var cbk = function(){
if(callback){
callback();
}
setTimeout(function(){
if(script.parentNode){
head.removeChild(script);
}
},5000)
}
script.type = "text/javascript"; //set element type
script.src = url+"?"+params; //set src, kill cache
script.onreadystatechange = cbk 
script.onload = cbk
head.appendChild(script); //add to doc head
},


getText: function(el){ //vague name. I know
var y = ""; //where the output will be stored
for(var i = 0; i < el.childNodes.length; i++){ //loop children
if(el.childNodes[i].nodeType == 3){
y+=el.childNodes[i].nodeValue; //add to output
} //end if
} //end loop
return y; //return output
},


diff: function(){
var s = Wikify.capture(), v=[], i=[]; //get DOM snapshot, diff list, ignore list
for(var x in s){ //loop through snaphsot elements
if(Wikify.arrayIndex(x, i) == -1 && //make sure it's not on the ignore list
s[x] != Wikify.DOMSnapshot[x]){ //check for changes
var t = Wikify.fromID(x.split("</,/>").slice(1),x.split("</,/>")[0]), b=t.getElementsByTagName("*"); //get all children
for(var u = 0; u < b.length; u++){ //loop children
var k = Wikify.getID(b[u])
i.push(k[1]+"</,/>"+k[0].join("</,/>")); //expel them from school :)
}//end evil-principalling
v.push(x+"[[]]"+t.innerHTML);
}//end check for changes
}//end loop
Wikify.DOMSnapshot = s; //update snapshot
//console.log(v);
alert(v.join("<!!!>"));
return v.join("<!!!>"); //return diff
},


capture: function(){ //captures and returns a snapshot of the DOM
var x = Wikify.DWin.document.getElementsByTagName("*"), s = {}; //declare variables
for(var i = 0; i < x.length; i++){ //loop through all document elements
if(x[i] != Wikify.DWin.document.body && //exclude document body
x[i].id.indexOf("firebug") == -1 &&  //exclude firebug
x[i].tagName.toLowerCase() != "script" && //exclude scripts
x[i].tagName.toLowerCase() != "noscript" && //exclude scripts
x[i].tagName.toLowerCase() != "style" && //exclude styles
x[i].tagName.toLowerCase() != "link" && //exclude styles
x[i].tagName.toLowerCase() != "iframe" && //excludes frames
x[i].tagName.toLowerCase() != "br" //excludes brs
){ //make sure it has no children
//console.log(x[i]);
try{ //continue even on error
var k = Wikify.getID(x[i]); //get element ID
s[k[1]+"</,/>"+k[0].join("</,/>")] = Wikify.getText(x[i])
}catch(err){}; //ignore errors
} //end if
} //end loop
return s; //return snapshot
},


save: function(){ //save data to server
Wikify.setEditable(false)
var a = Wikify.diff(); //get diff
Wikify.log.push("Diff Size: "+a.length);
if(a != ""){ //if it's not empty
Wikify.setEditable(false)
setTimeout(function(){
Wikify.setEditable(false)
if(escape(escape(a)).length < 1500){
Wikify.log.push("SubmitType: JSONP");
Wikify.sendData(Wikify_Config.saveurl, "url="+escape(window.location.href)+"&dat="+escape(escape(a)));
}else{
Wikify.log.push("SubmitType: Iframe");
Wikify.cdSendData(Wikify_Config.saveurl, {url:window.location.href,dat:escape(a)},function(){ //callback
Wikify.setEditable(false);
setTimeout(function(){
Wikify.uisaved()
},100);
});
}

},100);
}else{
return true
}
},


load: function(){ //try getting/loading data from server
Wikify.setEditable(false);
Wikify.sendData(Wikify_Config.loadurl, "url="+escape(window.location.href)+"&ck="+escape(Math.round(Math.random()*99999).toString()));
},


parse: function(q){ //parse output from server
q = unescape(q); //unescape data
var w = q.split("<!!!>"); //split changes
for(var i = 0;i < w.length; i++){ //loop through changes
try{ //ignore errors
var f = w[i].split("[[]]"), //split contnet
u = f[0].split("</,/>") //decrypt ID
Wikify.fromID(u.slice(1),u[0]).innerHTML = f[1]; //set element contents
Wikify.log.push(">>>"+f[0]+"<<<");
Wikify.log.push(f[1]);
}catch(err){
//console.error(err)
}; //ignore errors
} //end loop
},


setEditable: function(option){
if(!Wikify.DWin) return; //phailz when theres no DWin!
if(option==true){
Wikify.DWin.document.designMode = "on"; //everything
Wikify.DWin.document.body.contentEditable=true; //IE
}else if(option == false){
Wikify.DWin.document.designMode = "off"; //everything
Wikify.DWin.document.body.contentEditable=false; //IE
}
},


createUI: function(){ //EXPERIMENTAL!
Wikify.oldHTML = document.getElementsByTagName("html")[0].innerHTML

document.title += " - Wikify";


var links="";for(var v in Wikify.links){links+='<a style="text-decoration:none;color:#fff" href="'+Wikify.links[v]+'">'+v+'</a> '}

var divstyle = "width:280px;height:25px;position:absolute;top:0;right:0;background-color:#0099FF;font:16px 'Times New Roman'"

var wikifyexec = '<script type="text/javascript">try{if(window.top.Wikify){window.top.Wikify.load()}}catch(err){}</script>';

document.body.innerHTML = '<iframe id="Wikify_Frame" align="top" marginheight="0" frameborder="0" marginwidth="0" style="top:0;left:0;position:absolute;width:100%;height:100%" width="100%" height="100%"></iframe><div style="'+divstyle+'"><span style="left:0;position:absolute"><span style="color:#FFFF00">&nbsp;Wikify&nbsp;-&nbsp;</span><span id="Wikify_Status" style="color:#66FF00">Loaded</span></span><span style="right:3px;position:absolute">'+links+'</span></div>'

var p = document.getElementById("Wikify_Frame");
p = (p.contentWindow)? p.contentWindow: (p.contentDocument.document)? p.contentDocument.document: p.contentDocument
p.document.open();
p.document.write(Wikify.oldHTML.replace(/<script/ig,"<noscript").replace(/<\/script/ig,"</noscript")+wikifyexec); //murder scripts
p.document.close();

Wikify.DWin = p


},


status: function(text){
document.getElementById("Wikify_Status").innerHTML = text
},

uiabout: function(){
alert(Wikify.version+"\n(C) Antimatter15 2008\n By using Project Wikify, you agree that all of your (the user) contributions are/will be under the Creative Commons 3.0 Share Alike license, and is fully responsible for all content created by yourself.\n Project Wikify source is under GPLv3 (Acessible Via Google Code SVN).");
},
uihelp: function(){
alert("Run the bookmarklet from any web page. Be warned, it's glitchy, and it's likely much contributed information will be dumped eventually due to DB updates, or the information might not be submitted if there is a data size max. Of course, it's getting stabler every day.");
},

uiloaded: function(){Wikify.status("Loaded")},
uiload: function(){Wikify.status("Loading");Wikify.load();},
uisave: function(){
Wikify.status("Saving")
if(Wikify.save()==true)
Wikify.uisaved() //it's already saved if its empty
},

uisaved: function(){
Wikify.status("Saved");Wikify.setEditable(true)
}
}

if(window.top == window && !window.NO_WIKIFY_UI){
Wikify.createUI();
}

}
