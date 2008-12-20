//not technically legacy, more of an intermediate format

function wk_fromIDLegacy(text){
  var a = text.split(">")
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

//_body>>   0>>   1>>    2 [::] blah (old)
//_body>    0>    1>     2 >o=  blah (intermediate)
//_body>div:0>div:1>span:2 >d=  blah (modern)


function wk_upgrade_v0(data){
  function nf(d){return unescape(data).indexOf(d)}
  if(nf("</,/>") != -1 &&
     nf("[[]]") != -1 &&
     nf("[::]") == -1){
       data = unescape(data)
           .split("</,/>").join(">>")
           .split("<!!!>").join("[++]")
           .split("[[]]").join("[::]")
           .split("_xdby").join("_body")
           .split(">>[::]").join("[::]")
  }
  return data
}

function wk_upgrade_v1(data){
  function nf(d){return unescape(data).indexOf(d)}
  if(nf("[::]") != -1 &&
    unescape(data)
      .split("[::]").join(">>[::]")
      .substr(0,nf("[::]")+2).indexOf(">>") != -1){
    data = data
    .split(">>").join(">")
    .split("[::]").join(">o=")
  }
  return data;
}

function wk_upgrade(data){
  function nf(d){return unescape(data).indexOf(d)}
  if(nf(">o=") == -1 &&
     nf(">p=") == -1 &&
     nf(">d=") == -1){
    data = wk_upgrade_v0(data) //upgrade v0 to v1
    data = wk_upgrade_v1(data) //upgrade v1 to v2 (Legacy)
  }
  return data;
}