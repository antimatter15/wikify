var wk_mode = 1;

function wk_collapse(){
  $("#wk_news").slideUp()
  $("#wk_help").slideUp()
  $(".wk_down").slideUp();
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
  if($("#wk_iframe").css("top") == "30px"){
    $("#wk_iframe").height($(window).height()-30)
  }else{
    $("#wk_iframe").height($(window).height())
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
  }else{
    $("#wk_mask").slideUp()
  }
}

$(document).ready(function(){
  $(window).resize(wk_resize);
  wk_resize();
  
  $("#wk_logo").click(wk_collapse)
  $("#wk_expand").click(wk_expand)
})