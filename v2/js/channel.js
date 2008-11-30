
function wk_set_channel(channel){
  wk_channel = channel;
  if(!wk_channels[wk_channel]){
    wk_channels[wk_channel] = {edits: 0};
  }
  $([".wk_btn_original",".wk_btn_view",".wk_btn_edit"][wk_mode]).click()
  wk_get_channels()
}

function wk_render_channels(){
  $("#wk_channel_text").text(wk_channel+" ("+wk_channels[wk_channel].edits+")");
  $(".wk_chan").remove();
  for(var i in wk_channels){
    if(i != wk_channel){
      $("<li></li>")
      .text(i+" ("+wk_channels[i].edits+")")
      .addClass("wk_chan")
      .data("chan",i)
      .insertBefore(".wk_custom")
    }
  }
  
  $(".wk_chan").click(function(){
    $(".wk_down").slideUp();
    wk_set_channel($(this).data("chan"))
  })
}

function wk_get_channels(callback){
  wk_get_data(wk_server, {url: wk_url, action: "channel"}, function(e){
    wk_log("Got Channel Data", e)
    for(var x in e.channels){
      wk_channels[x] = e.channels[x]
    }
    wk_render_channels();
  })
}