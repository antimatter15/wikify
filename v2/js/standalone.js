$.get("etc/content.htm",{}, function(e){
  wk_original_data = e;
  $(document).ready(function(){
  wk_get_channels()
    $([".wk_btn_original",".wk_btn_view",".wk_btn_edit"][wk_mode]).click()
  })
})

$(document).ready(function(){
  $.each(wk_readyqueue, function(){
    this();
  })
})