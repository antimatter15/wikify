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

$(document).ready(function(){
  $(window).resize(function(){
    if($("#wk_iframe").css("top") == "30px"){
      $("#wk_iframe").height($(window).height()-30)
    }else{
      $("#wk_iframe").height($(window).height())
    }
  });
  
  $(window).resize();
  
  $("#wk_logo").click(function(){
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
  })
  
  $("#wk_collapse").click(function(){
    $("#wk_toolbar").animate({
      left: "0%"
    })
    $("#wk_iframe").animate({
      "top":30
    },null,null,function(){
      $(window).resize()

    })
  })
  
  $(".wk_mode").click(function(){
    $(".wk_mode").animate({color: "#858585"})
    wk_mask(true)
    $(this).animate({color: "white"})
  })
  
  /*mode buttons*/
  
  $(".wk_btn_original").click(function(){
    $(".wk_btn_save").fadeOut()
    wk_mode = 0;
    wk_write_original();
    wk_patch_links();
    wk_disable_edit();
    wk_mask(false)
    
  })
  $(".wk_btn_view").click(function(){
    $(".wk_btn_save").fadeOut()
    wk_mode = 1
    wk_write_original();
    wk_disable_edit()
    wk_patch_links()
    wk_load(function(){
          wk_mask(false)
    });
  })
  $(".wk_btn_edit").click(function(){
    $(".wk_btn_save").fadeIn()
    wk_mode = 2
    wk_write_original();
    wk_load(function(){
          wk_enable_edit();
          wk_mask(false)
    });
    
  })  
  
  $(".wk_btn_save").click(function(){
    wk_saving(true);
    wk_save(function(){
        setTimeout(function(){
          wk_saving(false);
        },500);
      }
    )
    
  })
  
  $(".wk_btn_news").click(function(){
    $("#wk_help").slideUp().queue(function(){
      $("#wk_news").slideToggle();
      $(this).dequeue();
    })
  })
  
  $(".wk_btn_help").click(function(){
    $("#wk_news").slideUp().queue(function(){
      $("#wk_help").slideToggle();
      $(this).dequeue();
    })
  })

  $("#wk_channel_visible").click(function(){
    $(".wk_down").slideToggle();
    $("#wk_news").slideUp()
    $("#wk_help").slideUp()
  })

  
  $("#wk_channel").hover(function(e){
    //$(".wk_down").slideDown();
  },function(e){
    if($(".wk_down").queue().length == 0){
      setTimeout(function(){
        $(".wk_down").slideUp();
      },500);
    }
  })
  
  $(".wk_custom").click(function(){
    var newchan = prompt("Enter name of channel you would like to go to or create.");
    if(newchan){
      $(".wk_down").slideUp();
      wk_set_channel(newchan)
    }else{
      //do nothing
    }
  })
  
  //$([".wk_btn_original",".wk_btn_view",".wk_btn_edit"][wk_mode]).click()
  
})


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