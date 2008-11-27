var wk_readyqueue = [];

function wk_ready(fn){
  wk_readyqueue.push(fn)
}

wk_original_data = "<html>"+document.getElementsByTagName("HTML")[0].innerHTML+"</html>";

for(var s=document.styleSheets, i=s.length;i--;){
  s[i].disabled = true;
}

