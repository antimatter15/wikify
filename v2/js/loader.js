(function(){
  if(window.wk_onlaunch) return wk_onlaunch();
  if(!window.wk_tl) window.wk_tl = [
    "http://ajax.googleapis.com/ajax/libs/jquery/1.2.6/jquery.min.js",
    "http://localhost/Wikify/"
  ];
  if(wk_tl[0]){
    var s = document.createElement("script");
    s.type = 'text/javascript';
    s.src = wk_tl.splice(0,1)[0];
    s.onreadystatechange = s.onload = arguments.callee;
    document.getElementsByTagName("head")[0].appendChild(s);
  }
})()