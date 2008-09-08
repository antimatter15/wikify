/* Wikify Core
 * (c) Copyright 2008 Antimatter15
 * Prototype 4, Revision 1
 */

/*
Wikify Config is required! It is generated by the bookmarklet

Wikify_Config = {
saveurl: "http://saveurl.com/saveurl",
loadurl: "http://loadurl.com/loadurl"
}
*/

Wikify_Config = {
saveurl: "http://localhost/wikify/php/save2.php",
loadurl: "http://localhost/wikify/php/load2.php"
}

if(!window.Wikify){window.Wikify = {

version: "Prototype 4, Revision 1",


DOMSnapshot: {}, //snapshot of document contents
UIFrame: null, //user interface
DWin: null, //the hack frame pointing to the same location as this page


getID: function(e){ //gets a special identifier for elements
var a=[]; //declare array
while(e!=Wikify.DWin.document.body && !e.id){ //loop until the element has an id
for(var i=0;e.parentNode.childNodes[i]!=e;i++){}//find parent index
a.push(i);//add to array
e = e.parentNode; //set parent
} //end loop
return [a.reverse(),(e.id?e.id:"_xdby")]; //format output
},



fromID: function(a,b){ //get element from identifier
var e = (b=="_xdby")?Wikify.DWin.document.body:Wikify.DWin.document.getElementById(b); //get origin
if((a[0]=="" && a.length == 1) || !a){return e}
while(a.length>0) //loop while a (from id) is not empty
e = e.childNodes[a.splice(0,1)]; //set e to child of itself
//end while loop
return e; //return element
},


sendData: function(url,params){ //create a JSONP request
var script = document.createElement("script"); //create script tag
var head = document.getElementsByTagName("head")[0]; //get head element
var cbk = function(){
head.removeChild(script);
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
y+=el.childNodes[i].textContent; //add to output
} //end if
} //end loop
return y; //return output
},


diff: function(){
var s = Wikify.capture(), v=[], i=[]; //get DOM snapshot, diff list, ignore list
for(var x in s){ //loop through snaphsot elements
if(i.indexOf(x) == -1 && //make sure it's not on the ignore list
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
if(a != ""){ //if it's not empty
//console.log("SAVED");
Wikify.setEditable(false)
setTimeout(function(){
Wikify.setEditable(false)
Wikify.sendData(Wikify_Config.saveurl, "url="+escape(window.location.href)+"&dat="+escape(escape(a)));
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
}catch(err){
//console.error(err)
}; //ignore errors
} //end loop
},


setEditable: function(option){
if(!Wikify.DWin) return
if(option==true){
Wikify.DWin.document.designMode = "on";
Wikify.DWin.document.body.contentEditable=true
}else if(option == false){
Wikify.DWin.document.designMode = "off";
Wikify.DWin.document.body.contentEditable=false
}
},


createUI: function(){ //EXPERIMENTAL!
var dochtml = document.getElementsByTagName("html")[0].innerHTML
document.body.innerHTML = "";

var p = document.createElement("iframe");
p.setAttribute("style","border:0;position:absolute;left: 0;top:0;width:100%;height:100%;background-color:#fff");
p.width = "100%";
p.height = "100%";
p.frameborder = "0";

document.body.appendChild(p);
p = (p.contentWindow)? p.contentWindow: (p.contentDocument.document)? p.contentDocument.document: p.contentDocument
p.document.open();
p.document.write(dochtml.replace(/script/g,"noscript")+"<script>window.top.Wikify.load();</script>"); //murder scripts
p.document.close();

Wikify.DWin = p

var links="",linksrc = {
"Save":"javascript:Wikify.uisave()",
"Update": "javascript:Wikify.uiload()",
"About":"javascript:Wikify.uiabout()",
"Help":"javascript:Wikify.uihelp()"
}
for(var v in linksrc){
links+='<a style="text-decoration:none;color:#fff" href="'+linksrc[v]+'">'+v+'</a> '
}

var i = document.createElement("div");
i.setAttribute("style","width: 280px; height: 25px; position: absolute; top: 0; right: 0; background-color: #0099FF; font: 16px 'Times New Roman'");

document.body.bgcolor = "#0099FF";
document.body.style.backgroundColor = "#0099FF";
i.innerHTML = '<span style="left:0;position:absolute"><span style="color:#FFFF00">&nbsp;Wikify&nbsp;-&nbsp;</span><span id="Wikify_Status" style="color:#66FF00">Loaded</span></span><span style="right:3px;position:absolute">'+links+'</span>'

document.body.appendChild(i);
},


status: function(text){
document.getElementById("Wikify_Status").innerHTML = text
},


uisave: function(){
Wikify.status("Saving")
if(Wikify.save()==true)
Wikify.uisaved() //it's already saved if its empty
},


uisaved: function(){
Wikify.status("Saved");
Wikify.setEditable(true)
},


uiabout: function(){
alert(Wikify.version+"\n(C) Antimatter15 2008\n By using Project Wikify, you agree that all of your (the user) contributions are/will be under the Creative Commons 3.0 Share Alike license, and is fully responsible for all content created by yourself.\n Project Wikify source is under GPLv3 (Acessible Via Google Code SVN).");
},


uihelp: function(){
alert("Run the bookmarklet from any web page. Be warned, it's terribly glitchy, edits won't be stored if they involve deleting an element or if it's in a paragraph with images or other HTML tags in it.");
},


uiloaded: function(){
Wikify.status("Loaded")
},


uiload: function(){
Wikify.status("Loading")
Wikify.load();
}
}

if(window.top == window){
Wikify.createUI();
}

}
