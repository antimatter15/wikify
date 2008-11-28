$.get("etc/content.htm",{}, function(e){
  wk_original_data = e;
  $(document).ready(function(){
    wk_get_channels()
    wk_mode()
  })
})

$(document).ready(function(){
  $.each(wk_readyqueue, function(){
    this();
  })
})

var wk_url = "_WikifyTesting"