jQuery.get("etc/content.htm",{}, function(e){
  wk_original_data = e;
  jQuery(document).ready(function(){
    wk_get_channels()
    wk_remode()
  })
})

jQuery(document).ready(function(){
  jQuery.each(wk_readyqueue, function(){
    this(jQuery);
  })
})

var wk_url = "_WikifyTesting"