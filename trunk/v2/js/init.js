(function(){
  if(!$("html")[0] || !$("body")[0] || !$("head")[0]){
    return alert("Project Wikify has encountered a fatal error\n(Missing Required Document Elements)")
  }
  if(wk_removescripts){
    //$("script").remove(); //remove all scripts (strangely doesn't work on ajaxian)
    $(document.getElementsByTagName("script")).remove()
  }else{
    $("script.wk_initsc").remove(); //remove the loader scripts
  }
  wk_original_data = "<html>"+$("html").html()+"</html>";
  
  for(var s=document.styleSheets, i=s.length;i--;){ //loop through styles
    s[i].disabled = true; //and kill them
  }
  
  document.body.innerHTML = wk_toolbar.split("img/").join(wk_img)
  

  $('<link rel="stylesheet" type="text/css" media="screen">') //add the styles
    .attr("href", wk_style)
    .appendTo("head");

  if(!$("#wk_iframe")[0] || !$("#wk_toolbar")[0]){
    return alert("Project Wikify has encountered a fatal error\n(Missing Generated Elements)")
  }

  for(var i = 0; i < wk_readyqueue.length; i++){
    wk_readyqueue[i](); //run readyqueue
  }
  
  wk_get_channels() //load channels
  $([".wk_btn_original",".wk_btn_view",".wk_btn_edit"][wk_mode]).click() //edit!
  
})()

