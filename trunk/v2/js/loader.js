(function(){
  var w = window;
  if(document.body.tagName.toLowerCase()!="body"){
    w = frames['content'];
  }
  var d=w.document,b=d.body;
  if(w.wk_onlaunch) return wk_onlaunch();
  function l(u) {
   var s = d.createElement('SCRIPT');
   s.type = 'text/javascript';
   s.src = u;
   s.className = "wk_initsc";
   b.appendChild(s);
  }
  if(!w.loadmode){
    w.loadmode = 1;
    var m = d.createElement("div");
    m.id = "wk_premask";
    m.setAttribute("style","font-family:Tahoma,Verdana,'Trebuchet MS',Arial,Helvetica,sans-serif;color:#000;background-color:#8095AA;position:absolute;width:100%;height:100%;top:0;left:0;font-size:100px;z-index:51000;text-align:center")
    m.innerHTML="Loading..." 
    b.appendChild(m);
    l("http://ajax.googleapis.com/ajax/libs/jquery/1.2.6/jquery.min.js")
  }
  if(!w.jQuery){
    setTimeout(arguments.callee, 100);
  }else{
    l("http://wikify.antimatter15.com/static3/wikify2.js")
  }
})()