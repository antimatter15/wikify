var wk_snapshot = null;
var wk_lastsnapshot = 0;
var wk_doc = null;

/*Wikify Format Legacy:

Element ID (or _xdby)
</,/> Parent Node Index (as needed)
</,/> Parent Node Index (as needed)
[[]] (marks beginning of data
<!!!> split patches

_xdby</,/>0</,/>1[[]]blah


Wikify Format:

Element ID (or _body)
>> Parent Node Index (as needed)
>> Parent Node Index (as needed)
[::] (marks beginning of data
[++] split patches

_body>>0>>1[::]blah

Wikify Format v2:

Element ID (or _body)
>> Parent Node Index (as needed)
>> Parent Node Index (as needed)
>>d0>> (marks beginning of data (format, d0, d1, d2)
[++] split patches

_body,0,1(d0):blah

_body>0>1>d:blah
_body>div:0>div:1>d=blah


jq-content>p=


_body>>0>>1>>d0>>blah
_body>>0>>1>>[1]blah
*/


function wk_getChildren2(e,tag){
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


function wk_fromID2(text){
  var a = text.split(">"),
      k = [],
      e = (a[0]=="_body")?wk_doc.body: //body
        wk_doc.getElementById(a[0]); //or id
  
  while(a.length > 1){
    k = a.splice(1,1)[0].split(":")
    e = wk_getChildren2(e,k[0])[k[1]];
  }
  return e;
}

function wk_splitdata(text){
  var x = text.indexOf("="),
      k = text.substr(0,x),
      l = k.lastIndexOf(">")
  return [
    k.substr(l+1),
    k.substr(0,l),
    text.substr(x+1)
  ]
}

function wk_getID2(e){
  var a = "", //declare string that holds ID components
      k = [] //declare temporary cache thing
  while(e != wk_doc.body && !e.id){
    k = wk_getChildren2(e.parentNode,e.tagName);
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
        cap[wk_getID2(all[i])] = [wk_getText(all[i]),all[i].innerHTML];
      }catch(err){
        /*ignore errors*/
      }
    }else{
      /*invalid elements*/
    }
  }
  cap["_body"] = wk_getText(wk_doc.body);
  return cap;
}

function wk_diff2(){
  var cap = wk_capture(),
      ignore = "",
      changes = [];
  
  for(var i in cap){
    if(!wk_in_list(ignore, i) && //make sure it's not 
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
        if(el.innerHTML.length < patch_text){
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
      
      var edit = changes[i].split("[::]");
      wk_fromID(edit[0]).innerHTML = edit[1]
      }catch(err){
        /*ignore errors*/
      }
    }
  }
}