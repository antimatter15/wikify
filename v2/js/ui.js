function wk_collapse(){
  $("#wk_news").slideUp()
  $("#wk_help").slideUp()
  $(".wk_down").slideUp();
  wk_hideabout()
  $("#wk_toolbar").animate({
    left: "-100%"
  })
  $("#wk_iframe").animate({
    "top": "0px"
  },null,null,function(){
    $(window).resize()
  })
}

function wk_expand(){
  $("#wk_toolbar").animate({
    left: "0%"
  })
  $("#wk_iframe").animate({
    "top":30
  },null,null,function(){
    $(window).resize()
  })
}

function wk_resize(){
  if($(window).width() < 800){
    $(".wk_btn_txt").hide()
  }else{
    $(".wk_btn_txt").fadeIn()
  }
  $("#wk_about").animate({
    top: ($(window).height()/2) - ($("#wk_about").height()/2),
    left: ($(window).width()/2) - ($("#wk_about").width()/2)
  });
  if($(".wk_fill").css("top") == "30px"){
    $(".wk_fill").height($(window).height()-30)
  }else{
    $(".wk_fill").height($(window).height())
  }
}


function wk_saving(mode){
  if(mode == true){
    $("#wk_save").hide()
    $("#wk_saving").show();
  }else{
    $("#wk_saving").hide();
    $("#wk_save").show()
  }
}

function wk_mask(mode){
  if(mode == true){
    $("#wk_mask").slideDown()
    $("#wk_news").slideUp()
    $("#wk_help").slideUp()
    wk_hideabout()
    
  }else{
    $("#wk_mask").slideUp()
  }
}

wk_ready(function(){
  $("#wk_logo").click(wk_collapse)
  $("#wk_expand").click(wk_expand)
  $(window).resize(wk_resize);
  setTimeout(wk_resize, 100);
  wk_resize();
})