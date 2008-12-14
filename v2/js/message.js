var wk_curmsgid = -1;

function wk_hidemsg(){
  $("#wk_msg").stop(true).animate({
    left: "-100%"
  })
}

function wk_showmsg(message){
  $("#wk_msgtext").text(message)
  $("#wk_msg").stop(true).animate({
    left: "0%"
  });
  var msgid = Math.floor(Math.random()*999999999); //bignumber!
  wk_curmsgid = msgid;
  setTimeout(function(){
    if(wk_curmsgid == msgid){
      wk_hidemsg()
    }
  }, 5000)
}


wk_ready(function(){
  $(".wk_dismiss").click(function(){
    wk_hidemsg();
  })
})