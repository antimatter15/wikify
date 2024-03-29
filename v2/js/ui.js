function wk_collapse(){
var $ = jQuery;
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
var $ = jQuery;
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
var $ = jQuery;
  if($(window).width() < 800){
    if($(window).width() < 500){
      wk_ui = 2;
      wk_render_channels();
      if($(window).width() < 370){
        $(".wk_btn_original").text("O")
        $(".wk_btn_view").text("V")
        $(".wk_btn_edit").text("E")
      }else{
        $(".wk_btn_original").text("Org")
        $(".wk_btn_view").text("Viw")
        $(".wk_btn_edit").text("Edt")
      }
    }else{
      $(".wk_btn_original").text("Original")
      $(".wk_btn_view").text("View")
      $(".wk_btn_edit").text("Edit")    
    }
    wk_ui = 1;
    if($(window).width() < 500){wk_ui = 2}
    if($(window).width() < 340){wk_ui = 3}
    wk_render_channels()
    $("#wk_help").css("height","55px")
    $("li.wk_space").hide("slow")
    $(".wk_btn_txt").hide("slow")
    $("#wk_logo").stop(true).animate({
      width: 32
    });
  }else{
    wk_ui = 0;
    $("li.wk_space").show("slow")
    $("#wk_help").css("height","")
    wk_render_channels()
    $(".wk_btn_txt").show("slow")
    $("#wk_logo").stop(true).animate({
      width: 190
    });
    $(".wk_btn_original").text("Original")
    $(".wk_btn_view").text("View")
    $(".wk_btn_edit").text("Edit")    
  }
  $("#wk_about").stop(true).animate({
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
var $ = jQuery;
  if(mode == true){
    $("#wk_save").hide()
    $("#wk_saving").show();
  }else{
    $("#wk_saving").hide();
    $("#wk_save").show()
  }
}

function wk_mask(mode){
var $ = jQuery;
  if(mode == true){
    $("#wk_mask").slideDown()
    $("#wk_news").slideUp()
    $("#wk_help").slideUp()
    wk_hideabout()
    
  }else{
    $("#wk_mask").slideUp()
  }
}

wk_ready(function($){
  $("#wk_logo").click(wk_collapse)
  $("#wk_expand").click(wk_expand)
  $(window).resize(wk_resize);
  setTimeout(wk_resize, 100);
  wk_resize();
})