/*
saveurl:"http://wikify.antimatter15.com/server/save",
loadurl:"http://wikify.antimatter15.com/server/load",
*/


function wk_send_data(url, params, callback){
  var id = "wk_xfnx"+Math.floor(Math.random()*12345)
  var div = document.createElement("div");
  var form = document.createElement("form");

  document.body.appendChild(div);  
  
  window['fn'+id] = function(){
    callback();
    try{
      window['fn'+id] = null;
      delete window['fn'+id];
    }catch(err){}
    setTimeout(function(){
      if(div.parentNode){
        div.parentNode.removeChild(div);
      }
    }, 50000)
  };
  
  div.style.display = "none";
  
  div.innerHTML = "<iframe id=\""+id+"\" name=\""+id+"\" onload=\"window['fn"+id+"']()\"></iframe>"
  
  form.target = id;
  form.action = url;
  form.method = "POST";
  
  div.appendChild(form);  
  
  for(var key in params){
    var input = document.createElement("input"); //create new input
    input.type = "hidden"; //it's hidden! SSH!!!!
    input.name = key; //set name
    input.value = params[key]; //set value
    form.appendChild(input);
  }
  
  form.submit();
}


function wk_get_data(url, params, callback){
  var $ = jQuery;
  if(window.location.href.indexOf("about:") != 0){
    $.get(url, params, callback, "jsonp"); //thx jQuery!
  }else{
    /*The following code is for about:blank*/
    var s = document.createElement("script"),
        c = "jsonp_"+Math.floor(999*Math.random()),
        h = document.getElementsByTagName("head")[0];
    s.type = "text/javascript";
    s.src = url + "?" + $.param(params) + "&callback=" + c;
    window[c] = callback;
    (h?h:document.body).appendChild(s)
  }
}