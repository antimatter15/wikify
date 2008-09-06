/* Wikify, (c) Copyright 2008 Antimatter15 */


/*Bookmarklet*/

(function(){
if(window.Wikify){ //check if already loaded
Wikify.save(); //if so, save page
}else{ //if not, load script
var x = document.createElement("script"); //create script tag
x.src = "c2.js"; //insert absolute HTTP url to script
document.getElementsByTagName("head")[0].appendChild(x); //add to document head
} //end if
})//()


var Wikify = {

/*START CONFIG*/
saveurl: "save2.php",
loadurl: "load2.php",
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

sendData: function(url,params){ //create a JSONP request
var x = document.createElement("script"); //create script tag
x.type = "text/javascript"; //set element type
x.src = url+"?ck="+Math.random().toString()+"&"+params; //set src, kill cache
document.getElementsByTagName("head")[0].appendChild(x); //add to doc head
},

capture: function(){ //captures and returns a snapshot of the DOM
var x = document.getElementsByTagName("*"), s = {}; //declare variables
for(var i = 0; i < x.length; i++){ //loop through all document elements
if(x[i] != document.body && //exclude document body
x[i].id.indexOf("firebug") == -1 &&  //exclude firebug
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
return escape(v.join("<!!!>")); //return processed diff
},

save: function(){ //save data to server
var a = Wikify.diff(); //get diff
if(a != "") //if it's not empty
Wikify.sendData(Wikify.saveurl, "url="+window.location.href+"&dat="+a);
},

load: function(){ //try getting/loading data from server
Wikify.sendData(Wikify.loadurl, "url="+window.location.href);
},

parse: function(q){ //parse output from server
q = unescape(q); //unescape data
var w = q.split("<!!!>"); //split changes
for(var i = 0;i < w.length; i++){ //loop through changes
var f = w[i].split("[[]]"), //split contnet
u = f[0].split("</,/>") //decrypt ID
Wikify.fromID(u.slice(1),u[0]).innerHTML = f[1]; //set element contents
} //end loop
},

createUI: function(){ //EXPERIMENTAL!
var i = document.createElement("iframe");
i.setAttribute("style","border:0;position:fixed;right: 0;top:0;width:235px;height:20px");
document.body.appendChild(i);
i = (i.contentWindow)? i.contentWindow: (i.contentDocument.document)? i.contentDocument.document: i.contentDocument;
i.document.open();
i.document.write('<style>a{text-decoration:none;color:#fff} span{color:#FFFF00} #status{color:#66FF00}</style><script>function status(t){document.getElementById("status").innerHTML=t}</script><div style="width: 100%; height: 100%; position: absolute; top: 0; left: 0; background-color: #0099FF"><span>&nbsp;Wikify&nbsp;-&nbsp;</span><span id="status">Loaded</span><span style="right:3px;position:absolute"><a href="javascript:window.top.Wikify.uisave()">Save</a> <a href="javascript:window.top.Wikify.uiabout()">About</a> <a href="javascript:window.top.Wikify.uihelp()">Help</a></span></div>');
i.document.close();
Wikify.UIFrame = i;
},


uiabout: function(){
alert("(C) Antimatter15 2008");
},
uihelp: function(){
alert("Simply run the bookmarklet fron any web page.");
},
uisave: function(){
Wikify.save();
Wikify.UIFrame.status("Saving")
},
uisaved: function(){
Wikify.UIFrame.status("Saved")
}
}

Wikify.load();
Wikify.createUI();