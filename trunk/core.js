/* Wikify Core
 * (c) Copyright 2008 Antimatter15
 * Prototype 5, Revision 4
 */

/*
Wikify Config is required! It is generated by the bookmarklet

Wikify.config = {
coreurl: "http://coreurl.com/core.js", //used by bookmarklet to load itself
saveurl: "http://saveurl.com/saveurl",
loadurl: "http://loadurl.com/loadurl",
channel: "main"
}
*/


if(!window.Wikify){
window.Wikify = {

config: {
saveurl: "",
loadurl: "",
channel: ""
},

version: "Prototype 5, Revision 4",
home: "http://wikify.antimatter15.com/bookmarklet",

DOMSnapshot: {}, //snapshot of document contents
UIFrame: null, //user interface
DWin: null, //the hack frame pointing to the same location as this page
log: [], //the log for the system
history: [], //history stuffs
oldHTML: "", //the old html of the document
docedit: false, //blah

links: { //link menu config
"Save": ["Wikify.uisave()","Save Contributions"],
"Update": ["Wikify.uiload()","Update Wikified Page"],
"Toggle": ["Wikify.uitoggle()","Toggle Edit Mode On/Off"],
"Switch": ["Wikify.uiswitch()","Switch To Different Channel"],
"Info": ["Wikify.uiinfo()","Display Page/Edit Info"],
"Help": ["Wikify.uihelp()","Display Project Wikify Help"]
},

/*Core Functions*/
arrayIndex: function(v, a){
for(var i = a.length; i-- && a[i] != v;);
return i;
},

getChildren: function(e){ //element
var m = [], k = e.childNodes, v = k.length, u;
for(var x = 0; x < v; x++){
u = k[x];
if(u.nodeType != 3){
m.push(u)
}
}
return m;
},

getID: function(e){ //gets a special identifier for elements
var a=[],k; //declare array
while(e!=Wikify.DWin.document.body && !e.id){ //loop until the element has an id
k = Wikify.getChildren(e.parentNode);
for(var i=0;k[i]!=e;i++){}//find parent index
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



sendData: function(url,params, callback){
var xfnx = "wk_xifnf"+Math.floor(Math.random()*12345)+"ud",
d = "wk_xif"+Math.ceil(Math.random()*1337*1337) //random iframe ID
document.getElementById("Wikify_Comm").innerHTML = "";
if ((!navigator.appVersion.match(/MSIE (\d\.\d)/)) || (navigator.userAgent.toLowerCase().indexOf("opera") != -1)) {
var i = document.createElement("iframe") //submit target
i.id = d; //set iframe id
i.name = d; //set iframe name
document.getElementById("Wikify_Comm").appendChild(i);
}else{ //internets exploders
document.getElementById("Wikify_Comm").innerHTML = "<iframe id=\""+d+"\" name=\""+d+"\" onload=\"Wikify['"+xfnx+"']()\"></iframe>";
var i=document.getElementById(d);}
i.style.display = "none"; //ssh! it's secret!
var f = document.createElement("form") //create new form
f.action = url; //set form action
f.method = "post"; //set form method
f.target = d; //make form submit to iframe
f.style.display = "none"; //ssh! it's secret!
for(var q in params){
var b = document.createElement("input"); //create new input
b.type = "hidden"; //it's hidden! SSH!!!!
b.name = q; //set name
b.value = params[q]; //set value
f.appendChild(b);} //add to form
document.body.appendChild(f); //add to document
Wikify[xfnx] = function(){delete Wikify[xfnx];
if(callback){callback();};setTimeout(function(){
if(f.parentNode){f.parentNode.removeChild(f)};if(i.parentNode){i.parentNode.removeChild(i)}},5000);}; //bye bye!
if ((!navigator.appVersion.match(/MSIE (\d\.\d)/)) || (navigator.userAgent.toLowerCase().indexOf("opera") != -1)) {
i.onload = Wikify[xfnx];}
f.submit(); //submit!
},



loadData: function(url,params,callback){ //create a JSONP request
url+="?";params["ck"] = "xkjn"+Math.round(Math.random()*99999)+"rd"; //i <3 random strings
for(var x in params){url+="&"+x+"="+escape(params[x]);}
Wikify.log.push(url)
var script = document.createElement("script"); //create script tag
var head = document.getElementsByTagName("head")[0]; //get head element
var cbk = function(){
if(callback){callback();}
setTimeout(function(){if(script.parentNode){
script.parentNode.removeChild(script);}},5000)}
script.type = "text/javascript"; //set element type
script.src = url; //set src, kill cache
script.onreadystatechange = cbk;
script.onload = cbk;
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
return v.join("<!!!>"); //return diff
},


capture: function(){ //captures and returns a snapshot of the DOM
var x = Wikify.DWin.document.getElementsByTagName("*"), s = {}; //declare variables
for(var i = 0; i < x.length; i++){ //loop through all document elements
if(x[i] != Wikify.DWin.document.body && //exclude document body
x[i].id.indexOf("firebug") == -1 &&  //exclude firebug
",script,noscript,style,link,iframe,br,meta,html,".indexOf(","+x[i].tagName.toLowerCase()+",") == -1
){ //make sure it has no children
try{ //continue even on error
var k = Wikify.getID(x[i]); //get element ID
s[k[1]+"</,/>"+k[0].join("</,/>")] = Wikify.getText(x[i])
}catch(err){}; //ignore errors
} //end if
} //end loop
return s; //return snapshot
},


save: function(){ //save data to server
Wikify.editable(false)
var a = Wikify.diff(); //get diff
Wikify.log.push("Diff Size: "+a.length);
if(a != ""){ //if it's not empty
Wikify.editable(false)

Wikify.sendData(Wikify.config.saveurl, {url:window.location.href,channel:Wikify.config.channel.toLowerCase(),dat:escape(a)}, function(){
Wikify.uisaved()
});

}else{
return true;
}
},


load: function(){ //try getting/loading data from server
Wikify.mask(true);
Wikify.editable(false);
Wikify.loadData(Wikify.config.loadurl, {url: window.location.href, channel: Wikify.config.channel.toLowerCase()});
},


parse: function(q){ //parse output from server
q = unescape(q); //unescape data
var w = q.split("<!!!>"); //split changes
for(var i = 0;i < w.length; i++){ //loop through changes
try{ //ignore errors
var f = w[i].split("[[]]"), //split contnet
u = f[0].split("</,/>") //decrypt ID
Wikify.fromID(u.slice(1),u[0]).innerHTML = Wikify.noScript(f[1]); //set element contents
}catch(err){
}; //ignore errors
} //end loop
},

loadhistory: function(q){
q.push("ENDPARSE");
var m = 0, u = [];
while(q[m] != "ENDPARSE"){
if(q[m]){
u.push(q[m]);
}
m++;
}
Wikify.history = u;
},

autoparse: function(){
if(Wikify.log.length > 1){ //hack so that it doesn't run again on initialization
Wikify.writeFrame();
}
for(var i = 0; i < Wikify.history.length; i++){
Wikify.parse(Wikify.history[i][0]);
}
Wikify.editable(true);
Wikify.DOMSnapshot = Wikify.capture();
Wikify.uiloaded()
},


createUI: function(){
for(var i = 0; i < document.links.length; i++){
document.links[i].target = "_top";
}


Wikify.oldHTML = document.getElementsByTagName("html")[0].innerHTML
document.title += " - Wikify";

var links="";
for(var v in Wikify.links){
links+='&nbsp;<span title="'+Wikify.links[v][1]+'"><a onclick="'+Wikify.links[v][0]+';return false;" style="text-decoration:none;color:#fff" href="#'+Wikify.links[v][1]+'">'+v+'</a></span>&nbsp;'}

var divstyle = "width:390px;height:25px;position:absolute;top:0;right:20px;background-color:#265cc8;font-size:16px;font-family:'Times New Roman', Times, serif";

(function(){
try{
for(var i=0,x;x=document.styleSheets[i];++i){ //murder all styles
x.disabled=true; //DIE!!!!
} //bai bai!

}catch(err){/*OMG!*/}
})()

document.body.innerHTML = '<iframe id="Wikify_Frame" align="top" marginheight="0" frameborder="0" marginwidth="0" style="top:0;left:0;position:absolute;width:100%;height:100%" width="100%" height="100%"></iframe><div id="Wikify_Mask" style="width:100%;height:100%;position:absolute;left:0;top:0;opacity:0.85;filter:alpha(opacity=85);background-color:#DDDDDD"><h1 style="padding-left:50px">Please Wait...</h1><br><br><div id="Wikify_MaskInfo" style="padding-left:40px"></div></div><div style="'+divstyle+'"><span style="left:0;position:absolute"><span style="color:#FFFF00">&nbsp;Wikify&nbsp;-&nbsp;</span><span id="Wikify_Status" style="color:#66FF00">Loading</span></span><span style="right:3px;position:absolute">'+links+'</span></div><div style="display:none" id="Wikify_Comm"></div>'

var p = document.getElementById("Wikify_Frame");
Wikify.DWin = (p.contentWindow)? p.contentWindow: (p.contentDocument.document)? p.contentDocument.document: p.contentDocument

Wikify.writeFrame();
Wikify.load()

setTimeout(function(){
if(Wikify.mask().style.display!="none" && Wikify.history.length == 0){
document.getElementById("Wikify_MaskInfo").innerHTML = "It looks like the Project Wikify can't connect to the patch server. This could happen if the patch contains too much data and/or your internet connection is slow, or if the bookmarklet is misconfigured.<br>You can try to press the &quot;Update&quot; button after whatever problems are resolved."
}
},8000);

},

writeFrame: function(){
Wikify.DWin.document.open();
Wikify.DWin.document.write(Wikify.noScript(Wikify.oldHTML));
Wikify.DWin.document.close();
},

noScript: function(s){ /*RWK is vulnerable to XSS, and this is vulnerable to crappy css expression()s, but that only screws IE users, so i'm fine with that*/
return s.replace(/<script/ig,"<noscript").replace(/<\/script/ig,"</noscript"); //there was this one funny bug that made all references to "javascript" turn to "javanoscript", which IMO, actually sounds pretty cool.
},


editable: function(option){
if(!Wikify.DWin) return; //phailz when theres no DWin!
if(option==null){return Wikify.docedit}
if(option==true){
Wikify.docedit = true;
Wikify.DWin.document.designMode = "on"; //everything
Wikify.DWin.document.body.contentEditable=true; //IE
}else if(option == false){
Wikify.docedit = false;
Wikify.DWin.document.designMode = "off"; //everything
Wikify.DWin.document.body.contentEditable=false; //IE
}
},

status: function(text){document.getElementById("Wikify_Status").innerHTML = text},
mask: function(mode){
if(mode==null){return document.getElementById("Wikify_Mask")}
Wikify.mask().style.display=(mode==true)?"block":"none";
document.getElementById("Wikify_MaskInfo").innerHTML="";},

uiinfo: function(){
alert("This page has been edited "+Wikify.history.length+" times before on the "+Wikify.config.channel+" channel.")
},
uihelp: function(){
alert(Wikify.version+"\n(C) Antimatter15 2008\n\nUsage:\nRun the bookmarklet from any web page to access/edit any web page.\n\nNotes:\nProject Wikify is experimental software, the main content storage server may be dumped every so often for when the communication protocal changes, or the DB structure is modified. It will occur less often as the project reaches maturity, but it can and will happen, without warning. \n\nAll content contributed to the Wikify Network is automatically licensed under the Creative Commons 3.0.");
},

uiswitch: function(){
var nchan=prompt("Project Wikify supports several channels including Spam, Update, Talk, and Main.\nWhich channel do you wish to join?",Wikify.config.channel)
if(nchan==null || nchan==""){
Wikify.status("Cancelled");
}else{
Wikify.config.channel = nchan;
Wikify.uiload();
}
},

uiloaded: function(){Wikify.status("Loaded");Wikify.mask(false)},
uiload: function(){Wikify.status("Loading");Wikify.mask(true);Wikify.load();},
uisave: function(){
Wikify.status("Saving");Wikify.mask(true);
if(Wikify.save()==true) Wikify.uisaved() //it's already saved if its empty
},
uitoggle: function(){
Wikify.editable((Wikify.editable())?false:true); //pwetty one-liner
switch(Wikify.editable()){
case true:
Wikify.status("On");
break;
case false:
Wikify.status("Off");
break;
}
},
uisaved: function(){Wikify.status("Saved");Wikify.editable(true);Wikify.mask(false)}
}


Wikify.config = window.WKConf;

if(window.top == window && !window.NO_WIKIFY_UI){
Wikify.createUI();
}

if(!window.NO_WIKIFY_CHECK){
setTimeout(function(){

if(!window.WKConfig && window.Wikify_Config){
alert("You are running an outdated version of Project Wikify, you will automatically be redirected to the Wikify install page where you can install a newer version of the Bookmarklet");
window.location = Wikify.home
return;
}

if(!Wikify.config.loadurl){
alert("Error! Missing Load URL. Redirecting to install page.");
window.location = Wikify.home
}
if(!Wikify.config.saveurl){
alert("Error! Missing Save URL. Redirecting to install page.");
window.location = Wikify.home
}
if(!Wikify.config.channel){
alert("Error! Missing Channel ID. Redirecting to install page.");
window.location = Wikify.home
}
},1337);
}
}
