(function(){
  $(".wk_initsc").remove();

  wk_original_data = "<html>"+document.getElementsByTagName("HTML")[0].innerHTML+"</html>";

  for(var s=document.styleSheets, i=s.length;i--;){
    s[i].disabled = true;
  }
  
  $('<link rel="stylesheet" type="text/css" media="screen">')
    .attr("href", wk_style)
    .appendTo("head");
    
  
  document.body.innerHTML = wk_toolbar.split("img/").join(wk_img); //replaceall
  
  for(var i = 0; i < wk_readyqueue.length; i++){
    wk_readyqueue[i]();
  }
  
  wk_get_channels()
  $([".wk_btn_original",".wk_btn_view",".wk_btn_edit"][wk_mode]).click()
})()

