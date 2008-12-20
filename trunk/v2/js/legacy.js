function wk_fromIDLegacy(text){
  var a = text.split(">>")
  var e = (a[0]=="_body")?wk_doc.body: //body
      wk_doc.getElementById(a[0]); //or id
  
  while(a.length > 1)
    e = wk_getChildrenLegacy(e)[a.splice(1,1)];
  return e;
}


function wk_getChildrenLegacy(e){
  var m = [], k = e.childNodes, v = k.length, u;
  for(var x = 0; x < v; x++){
    u = k[x];
    if(u.nodeType != 3) m.push(u)
  }
  return m;
}