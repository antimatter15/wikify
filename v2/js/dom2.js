var wk_snapshot = null;
var wk_lastsnapshot = 0;
var wk_doc = null;

/*

Element Locator FOrmat:
  
  Element ID (or _body)
{
  >
  Element Tag Name (or *)
  :
  Element Parent Index 
} (use/repeat as needed)  
  >
  Patch Format (d for normal, p for patch, o for legacy)
  =
  Patch Data (or innerHTML dump, depending on format)
  
  
Example:
  _body>div:0>div:1>span:2>d=Hello World!
*/


function wk_getChildren(e,tag){
  var m = [], k = e.childNodes, v = k.length, u;
  for(var x = 0; x < v; x++){
    u = k[x];
    if(u.nodeType == 1 && 
      (u.tagName == tag || u.tagName.toLowerCase() == tag.toLowerCase())
    ) m.push(u)
  }
  return m;
}


function wk_getText(e){
  for(var i = e.childNodes.length, text = ""; i--;){
    if(e.childNodes[i].nodeType == 3)
      text += e.childNodes[i].nodeValue;
  }
  return text;
}


function wk_fromID(text){
  var a = text.split(">"),
      k = [],
      e = (a[0]=="_body")?wk_doc.body: //body
        wk_doc.getElementById(a[0]); //or id
  
  while(a.length > 1){
    k = a.splice(1,1)[0].split(":")
    e = wk_getChildren(e,k[0])[k[1]];
  }
  return e;
}

function wk_splitdata(text){
  var x = text.indexOf("="),
      k = text.substr(0,x),
      l = k.lastIndexOf(">")
  return [
    k.substr(l+1), //the patch type
    k.substr(0,l), //the element patched
    text.substr(x+1) //the patch data
  ]
}

function wk_getID(e){
  var a = "", //declare string that holds ID components
      k = [] //declare temporary cache thing
  while(e != wk_doc.body && !e.id){
    k = wk_getChildren(e.parentNode,e.tagName);
    for(var i = 0; k[i] != e; i++);
    a = (">"+k[i].tagName+":"+i)+a;
    e = e.parentNode;
  }
  return (e.id?e.id:"_body") + a
}

function wk_in_list(list,str){
  return (","+list+",").indexOf(","+str+",") != -1;
}

function wk_capture(){
  var all = wk_doc.body.getElementsByTagName("*");
  var cap = {};
  for(var i = all.length; i--;){
    if(!wk_in_list("script,noscript,style,link,frame,iframe",all[i].tagName.toLowerCase()) && 
        all[i].id.indexOf("firebug") == -1){
      try{
        cap[wk_getID(all[i])] = [wk_getText(all[i]),all[i].innerHTML];
      }catch(err){
        /*ignore errors*/
      }
    }else{
      /*invalid elements*/
    }
  }
  cap["_body"] = [wk_getText(wk_doc.body),wk_doc.body.innerHTML];
  return cap;
}

function wk_diff(){
  var cap = wk_capture(),
      ignore = "",
      changes = [];
  
  for(var i in cap){
    if(!wk_in_list(ignore, i) && //make sure it's not 
       wk_snapshot[i] && cap[i] && //stuff...
       wk_snapshot[i][0] != cap[i][0] //and it's changed...
    ){
      var el = wk_fromID(i), //get element
          ch = el.getElementsByTagName("*") //get children
      for(var x = 0; x < ch.length; x++) //loop all children
        ignore += ","+wk_getID(ch[x]); //add element to ignore list
        
      //i is the ID, el is the element
      //id>type=text
      if(window.diff_match_patch){ //check if advanced patcherator is available
        var dmp = new diff_match_patch();
        var diff = dmp.diff_main(wk_snapshot[i][1],el.innerHTML)
        var patch_list = dmp.patch_make(wk_snapshot[i][1],el.innerHTML,diff)
        var patch_text = dmp.patch_toText(patch_list);
        
        if(el.innerHTML.length < patch_text.length){
          //if innerHTML dump is more efficient
          changes.push(i+">d="+el.innerHTML)
        }else{
          //if super-patch is more efficient
          changes.push(i+">p="+patch_text)
        }
      }else{
        changes.push(i+">d="+el.innerHTML)
      }
    }
  }
  return changes.join("[++]")
}

function wk_parse(changes){
  changes = changes.join("[++]").split("[++]"); //generic units
  for(var i = 0; i < changes.length; i++){
    if(changes[i] != ''){
      try{
        var edit = wk_splitdata(changes[i]);
        
        //0: patch type, 1: patch element, 2: patch data
        if(edit[0] == "p"){
          //patch
          var dmp = new diff_match_patch();
          var patches = dmp.patch_fromText(edit[2]);
          var results = dmp.patch_apply(patches, wk_fromID(edit[1]).innerHTML);
          wk_fromID(edit[1]).innerHTML = results[0];
        }else if(edit[0] == "d"){
          //normal
          wk_fromID(edit[1]).innerHTML = edit[2]
        }else if(edit[0] == "o"){
          //legacy
          wk_fromIDLegacy(edit[1]).innerHTML = edit[2]
        }
      }catch(err){
        //alert(edit.join(";"))
        //alert(err)
        //console.error(err)
        /*ignore errors*/
      }
    }
  }
}


function wk_autosnapshot(c){
  setTimeout(function(){
        if((new Date()).getTime() - wk_lastsnapshot > 300){
          wk_snapshot = wk_capture();
          wk_lastsnapshot = (new Date()).getTime();
        }
        if(c) c();
  },1337/10);
}