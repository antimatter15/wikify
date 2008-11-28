(function(){
  if(wk_removescripts){
    //$("script").remove(); //remove all scripts (strangely doesn't work on ajaxian)
    $(document.getElementsByTagName("script")).remove()
  }else{
    $("script.wk_initsc").remove(); //remove the loader scripts
  }
  wk_original_data = "<html>"+document.getElementsByTagName("HTML")[0].innerHTML+"</html>";
  
  for(var s=document.styleSheets, i=s.length;i--;){ //loop through styles
    s[i].disabled = true; //and kill them
  }
  
  document.body.innerHTML = wk_toolbar.split("img/").join(wk_img)
  
  /*teh jqueryish way doesn't work on some sites, notably ajaxian.com*/
  var s = document.createElement("link");
  s.setAttribute("rel","stylesheet")
  s.setAttribute("type","text/css")
  s.setAttribute("href",wk_style)
  s.setAttribute("media","screen")
  document.getElementsByTagName("head")[0].appendChild(s)
  /*
  $('<link rel="stylesheet" type="text/css" media="screen">') //add the styles
    .attr("href", wk_style)
    .appendTo("head");
    */

  
  for(var i = 0; i < wk_readyqueue.length; i++){
    wk_readyqueue[i](); //run readyqueue
  }
  
  wk_get_channels() //load channels
  $([".wk_btn_original",".wk_btn_view",".wk_btn_edit"][wk_mode]).click() //edit!
  
})()

