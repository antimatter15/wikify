var wk_jQuery = "http://ajax.googleapis.com/ajax/libs/jquery/1.2.6/jquery.min.js";

function wk_loadscript(src, callback){
  var s = document.creatElement("script");
  s.type = 'text/javascript';s.src = src;
  s.onreadystatechange = s.onload = callback;
  document.getElementsByTagName("head")[0].appendChild(s)
}

wk_loadscript(wk_jQuery, )