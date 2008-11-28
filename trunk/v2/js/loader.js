(function(d,w){
  if(w.wk_onlaunch) return wk_onlaunch();
  w.wk_loader = 2;
  if(!w.wk_tl){
    w.wk_wl = w.wk_tl = [
      "http://ajax.googleapis.com/ajax/libs/jquery/1.2.6/jquery.min.js",
      "http://localhost/Wikify/v2/etc/compile_js.php"
    ];
    var m = d.createElement("div");
    m.id = "wk_premask";
    m.setAttribute("style","font-family:Tahoma,Verdana,'Trebuchet MS',Arial,Helvetica,sans-serif;color:#000;background-color:#8095AA;position:absolute;width:100%;height:100%;top:0;left:0;font-size:100px;z-index:51000;text-align:center")
    m.innerHTML="Loading..." 
    d.body.appendChild(m);
  }
  if(wk_tl[0]){
    var s = d.createElement("script");
    s.type = 'text/javascript';
    s.src = wk_tl.splice(0,1)[0];
    s.className = "wk_initsc";
    s.onreadystatechange = s.onload = arguments.callee;
    d.getElementsByTagName("head")[0].appendChild(s);
  }
})(document,window)