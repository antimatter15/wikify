wk_coreinit = function(){
  //check if jQuery is loaded

  if(!jQuery || !jQuery().jquery){
    return alert("Project Wikify has encountered a fatal error\n(JS Loader failed initializing dependencies)")
  }

  var $ = jQuery;
  
  //test for some strange oddities
  if(!$("head")[0] || !jQuery("<div>Something_Very_Strange</div>").html()){
    var blank = '<html><head><title></title></head><body></body></html>';
    document.open()
    document.write(blank);
    document.close();
  }

  //check for required document elements
  if(!$("html")[0] || !$("body")[0] || !$("head")[0]){
    return alert("Project Wikify has encountered a fatal error\n(Missing Required Document Elements)")
  }
  
  //remove scripts
  if(wk_removescripts){
    $(document.getElementsByTagName("script")).remove()
  }else{
    $("script.wk_initsc").remove(); //remove the loader scripts
  }
  
  $("#wk_premask").remove(); //remove premask created by preloader
  wk_original_data = document.documentElement.innerHTML; //dump html
  

  for(var s=document.styleSheets, i=s.length;i--;){ //loop through styles
    s[i].disabled = true; //and kill them
  }
 
  document.body.innerHTML = wk_toolbar.split("img/").join(wk_img); //load wikify gui

  //re-add premask
  var m = document.createElement("div");
  m.id = "wk_premask";
  m.setAttribute("style","font-family:Tahoma,Verdana,'Trebuchet MS',Arial,Helvetica,sans-serif;color:#000;background-color:#8095AA;position:absolute;width:100%;height:100%;top:0;left:0;font-size:100px;z-index:51000;text-align:center")
  m.innerHTML="Loading..." 
  document.body.appendChild(m);
  
  //add styles
  var l = document.createElement("link")
  l.rel = "stylesheet";
  l.type = "text/css";
  l.media = "screen";
  l.href = wk_style;
  document.getElementsByTagName("head")[0].appendChild(l)

  //check for other oddities
  if(!$("#wk_iframe")[0] || !$("#wk_toolbar")[0]){
    return alert("Project Wikify has encountered a fatal error\n(Missing Generated Elements)")
  }

  //loop thorugh init queue
  for(var i = 0; i < wk_readyqueue.length; i++){ 
    try{
      wk_readyqueue[i](jQuery); //run readyqueue
    }catch(err){
      alert("Project Wikify has encountered an error. \n"+err)
      //console.error(err)
    }
  }
  
  
  if(document.title == ""){ //set titles
    document.title = "Wikify: Untitled";
  }else{
    document.title = "Wikify: "+document.title
  }
  wk_get_channels() //load channels
  wk_remode(); //ligths, camera, action!


}

if(wk_runinit){
  wk_coreinit();
}

