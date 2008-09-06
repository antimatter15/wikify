/* Wikify, (c) Copyright 2008 Antimatter15 */


/*Bookmarklet*/

(function(){
if(window.Wikify){ //check if already loaded
Wikify.uisave(); //if so, save page
}else{ //if not, load script
var x = document.createElement("script"); //create script tag
x.src = "http://localhost/wikiinternet/c2.js"; //insert absolute HTTP url to script
document.getElementsByTagName("head")[0].appendChild(x); //add to document head
} //end if
})//()


//javascript:(function(){if(window.Wikify){Wikify.uisave()}else{var A=document.createElement("script");A.src="c2.js";document.getElementsByTagName("head")[0].appendChild(A)}})()

var Wikify = {

/*START CONFIG*/
saveurl: "http://localhost/wikiinternet/save2.php",
loadurl: "http://localhost/wikiinternet/load2.php",
/*END CONFIG*/

DOMSnapshot: {}, //snapshot of document contents
UIFrame: null,

getID: function(e){ //gets a special identifier for elements
var a=[]; //declare array
while(e!=document.body && !e.id){ //loop until the element has an id
for(var i=0;e.parentNode.childNodes[i]!=e;i++){}//find parent index
a.push(i);//add to array
e = e.parentNode; //set parent
} //end loop
return [a.reverse(),(e.id?e.id:"_xdby")]; //format output
},

fromID: function(a,b){ //get element from identifier
var e = (b=="_xdby")?document.body:document.getElementById(b); //get origin
while(a.length>0) //loop while a (from id) is not empty
e = e.childNodes[a.splice(0,1)]; //set e to child of itself
//end while loop
return e; //return element
},

sendData: function(url,params,callback){ //create a JSONP request
var script = document.createElement("script"); //create script tag
var head = document.getElementsByTagName("head")[0]; //get head element
var cbk = function(){
//console.log(script)
head.removeChild(script);
if(callback){
callback();
}
}
script.type = "text/javascript"; //set element type
script.src = url+"?"+params; //set src, kill cache
script.onreadystatechange = cbk 
script.onload = cbk
head.appendChild(script); //add to doc head
},

capture: function(){ //captures and returns a snapshot of the DOM
var x = document.getElementsByTagName("*"), s = {}; //declare variables
for(var i = 0; i < x.length; i++){ //loop through all document elements
if(x[i] != document.body && //exclude document body
x[i].id.indexOf("firebug") == -1 &&  //exclude firebug
x[i].tagName.toLowerCase() != "script" && //exclude scripts
x[i].tagName.toLowerCase() != "style" && //exclude styles
x[i].innerHTML.indexOf("<") == -1){ //make sure it has no children
try{ //continue even on error
var k = Wikify.getID(x[i]); //get element ID
s[k[1]+"</,/>"+k[0].join("</,/>")] = x[i].innerHTML
}catch(err){}; //ignore errors
} //end if
} //end loop
return s; //return snapshot
},

diff: function(){ //diff a current
var s = Wikify.capture(), v=[]; //get DOM snapshot
for(var x in s){ //loop through snaphsot elements
if(s[x] != Wikify.DOMSnapshot[x]) //check for changes
v.push(x+"[[]]"+s[x]);
//end check for changes
}//end loop
Wikify.DOMSnapshot = s; //update snapshot
return v.join("<!!!>"); //return processed diff
},

save: function(){ //save data to server
var a = Wikify.diff(); //get diff
if(a != ""){ //if it's not empty
//console.log("SAVED");
document.designMode = "off";
setTimeout(function(){
Wikify.sendData(Wikify.saveurl, "url="+escape(window.location.href)+"&dat="+escape(a));
},100);
}else{
return true
}
},

load: function(){ //try getting/loading data from server
Wikify.sendData(Wikify.loadurl, "url="+escape(window.location.href)+"&ck="+escape(Math.round(Math.random()*99999).toString()));
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
console.error(err)
}; //ignore errors
} //end loop
},

createUI: function(){ //EXPERIMENTAL!
var i = document.createElement("iframe");
i.setAttribute("style","border:0;position:fixed;right: 0;top:0;width:135px;height:20px");
document.body.appendChild(i);
i = (i.contentWindow)? i.contentWindow: (i.contentDocument.document)? i.contentDocument.document: i.contentDocument;
i.document.open();
i.document.write('<style>a{text-decoration:none;color:#fff} span{color:#FFFF00} #status{color:#66FF00}</style><script>function status(t){document.getElementById("status").innerHTML=t}</script><div style="width: 100%; height: 100%; position: absolute; top: 0; left: 0; background-color: #0099FF"><span>&nbsp;Wikify&nbsp;-&nbsp;</span><span id="status">Loaded</span></div>');
i.document.close();
Wikify.UIFrame = i;
},
uisave: function(){
if(Wikify.save()==true)
return Wikify.uisaved() //it's already saved if its empty
Wikify.UIFrame.status("Saving")
},
uisaved: function(){
Wikify.UIFrame.status("Saved")
}
}

Wikify.load();
Wikify.createUI();
//alert("Wikify (C) Antimatter15 2008 \n Click on the Wikify bookmarklet again to save edits");
