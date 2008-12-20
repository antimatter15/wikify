wk_coreinit = function(){
  if(!jQuery || !$ ||!jQuery() || !$() || !$().jquery){
    return alert("Project Wikify has encountered a fatal error\n(JS Loader failed initializing dependencies)")
  }
  if(!$("head")[0] || !jQuery("<div>Something_Very_Strange</div>").html()){
    var blank = '<html><head><title></title></head><body></body></html>';
    document.open()
    document.write(blank);
    document.close();
  }

  
  if(!$("html")[0] || !$("body")[0] || !$("head")[0]){
    return alert("Project Wikify has encountered a fatal error\n(Missing Required Document Elements)")
  }
  
  if(wk_removescripts){
    //$("script").remove(); //remove all scripts (strangely doesn't work on ajaxian)
    $(document.getElementsByTagName("script")).remove()
  }else{
    $("script.wk_initsc").remove(); //remove the loader scripts
  }
  
  $("#wk_premask").remove();
  wk_original_data = document.documentElement.innerHTML;
  

  for(var s=document.styleSheets, i=s.length;i--;){ //loop through styles
    s[i].disabled = true; //and kill them
  }
 
  document.body.innerHTML = wk_toolbar.split("img/").join(wk_img)

  var m = document.createElement("div");
  m.id = "wk_premask";
  m.setAttribute("style","font-family:Tahoma,Verdana,'Trebuchet MS',Arial,Helvetica,sans-serif;color:#000;background-color:#8095AA;position:absolute;width:100%;height:100%;top:0;left:0;font-size:100px;z-index:51000;text-align:center")
  m.innerHTML="Loading..." 
  document.body.appendChild(m);
  

  $('<link rel="stylesheet" type="text/css" media="screen">') //add the styles
    .attr("href", wk_style)
    .appendTo("head");

  if(!$("#wk_iframe")[0] || !$("#wk_toolbar")[0]){
    return alert("Project Wikify has encountered a fatal error\n(Missing Generated Elements)")
  }

  for(var i = 0; i < wk_readyqueue.length; i++){
    wk_readyqueue[i](); //run readyqueue
  }
  if(document.title == ""){
    document.title = "Wikify: Untitled";
  }else{
    document.title = "Wikify: "+document.title
  }
  wk_get_channels() //load channels
  wk_remode();


}

wk_coreinit();

