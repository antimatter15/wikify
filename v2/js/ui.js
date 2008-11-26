var wk_mode = 1;

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
    $("#wk_mask").slideDown()
    $(this).animate({color: "white"})
  })
  
  /*mode buttons*/
  
  $(".wk_btn_original").click(function(){
    $(".wk_btn_save").fadeOut()
    wk_mode = 0;
    write_original();
    disable_edit();
    $("#wk_mask").slideUp()
    
  })
  $(".wk_btn_view").click(function(){
    $(".wk_btn_save").fadeOut()
    wk_mode = 1
    write_original();
    disable_edit()
    load(function(){
          $("#wk_mask").slideUp()
    });
  })
  $(".wk_btn_edit").click(function(){
    $(".wk_btn_save").fadeIn()
    wk_mode = 2
    write_original();
    load(function(){
          enable_edit();
          $("#wk_mask").slideUp()
    });
    
  })  
  
  $(".wk_btn_save").click(function(){
    saving(true);
    save(function(){
        setTimeout(function(){
          saving(false);
        },500);
      }
    )
    
  })
  
  $(".wk_btn_news").click(function(){
    $("#wk_news").slideToggle();
  })
  
  $("#wk_channel_visible").click(function(){
    $(".wk_down").slideToggle();
  })
  
  $(".wk_chan").click(function(){
    $(".wk_down").slideUp();
    $("#wk_channel_text").text($(this).text())
    $("#wk_mask").slideDown()
    $("#wk_mask").slideUp()
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
    var newchan = prompt("Enter name of channel you would like to visit/create.");
    if(newchan){
      $(".wk_down").slideUp();
      $("#wk_mask").slideDown();
      $("#wk_mask").slideUp();
      $("#wk_channel_text").text(newchan+" (0)")
    }else{
      
    }
  })
  
  //$([".wk_btn_original",".wk_btn_view",".wk_btn_edit"][wk_mode]).click()
  
})


function saving(mode){
  if(mode == true){
    $("#wk_save").hide()
    $("#wk_saving").show();
  }else{
    $("#wk_saving").hide();
    $("#wk_save").show()
  }
}