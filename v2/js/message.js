function wk_hidemsg(){
  $("#wk_msg").animate({
    left: "-100%"
  })
}

function wk_showmsg(message){
  $("#wk_msgtext").text(message)
  $("#wk_msg").animate({
    left: "0%"
  });
  setTimeout(wk_hidemsg, 5000)
}


wk_ready(function(){
  $(".wk_dismiss").click(function(){
    wk_hidemsg();
  })
})