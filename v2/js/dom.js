var snapshot = null;
var doc = null;

function getChildren(e){
  var m = [], k = e.childNodes, v = k.length, u;
  for(var x = 0; x < v; x++){
    u = k[x];
    if(u.nodeType != 3) m.push(u)
  }
  return m;
}

function getText(e){
  for(var i = e.childNodes.length, text = ""; i-- && e.childNodes[i].nodeType == 3;)
    text += e.childNodes[i].nodeValue;
  return text;
}

function fromID(text){
  var a = text.split(">>")
  var e = (a[0]=="_body")?doc.body: //body
      doc.getElementById(a[0]); //or id
  
  while(a.length > 1)
    e = getChildren(e)[a.splice(1,1)];
  return e;
}

function getID(e){
  var a = "", //declare string that holds ID components
      k = [] //declare temporary cache thing
  while(e != doc.body && !e.id){
    k = getChildren(e.parentNode);
    for(var i = 0; k[i] != e; i++);
    a = ">>"+i+a;
    e = e.parentNode;
  }
  return (e.id?e.id:"_body") + a
}

function in_list(list,str){
  return (","+list+",").indexOf(","+str+",") != -1;
}

function capture(){
  var all = doc.body.getElementsByTagName("*");
  var cap = {};
  for(var i = all.length; i--;){
    if(!in_list("script,noscript,style,link,frame,iframe,br",all[i].tagName.toLowerCase()) && 
        all[i].id.indexOf("firebug") == -1){
      try{
        cap[getID(all[i])] = getText(all[i]);
      }catch(err){/*ignore errors*/}
    }
  }
  cap["_body"] = getText(doc.body);
  return cap;
}

function diff(){
  var cap = capture(),
      ignore = "",
      changes = [];
  
  for(var i in cap){
    if(!in_list(ignore, i) && //make sure it's not 
       snapshot[i] != cap[i]
    ){
      var el = fromID(i), //get element
          ch = el.getElementsByTagName("*") //get children
      for(var x = 0; x < ch.length; x++)
        ignore += ","+getID(ch[x]); //add element to ignore list
      changes.push(i+"[::]"+el.innerHTML)
    }
  }
  return changes.join("[++]")
}

function parse(changes){
  changes = changes.join("[++]").split("[++]"); //generic units
  for(var i = 0; i < changes.length; i++){
    if(changes[i] != ''){
      try{
      var edit = changes[i].split("[::]");
      fromID(edit[0]).innerHTML = edit[1]
      }catch(err){/*ignore errors*/}
    }
  }
}
  