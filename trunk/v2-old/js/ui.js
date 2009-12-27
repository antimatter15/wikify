$(document).ready(function(){
  /*
  $(window).resize(function(){
    var height = window.innerHeight?window.innerHeight: //try w3c way
                 (document.documentElement.clientWidth==0? //ie quirks?
                 document.body.clientHeight: //ie quirks
                 document.documentElement.clientHeight) //ie strict
                 
    document.getElementById("wk_iframe").style.height = (height-30)+"px";
  })
  */
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
    $("#wk_mask").slideUp()
  })
  
  $(".wk_btn_original").click(function(){
    dummy_write_original();
  })
  $(".wk_btn_view").click(function(){
    disable_edit()
  })
  $(".wk_btn_edit").click(function(){
    enable_edit();
  })  
  
  $(".wk_btn_save").click(function(){
    saving(true);
    setTimeout(function(){
      saving(false);
    },1000)
  })
  
  $("#wk_channel_visible").click(function(){
    $(".wk_down").slideDown();
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
    var newchan = prompt("Enter name of channel you would like to visit/create.")
    $(".wk_down").slideUp();
    $("#wk_mask").slideDown()
    $("#wk_mask").slideUp()
    $("#wk_channel_text").text(newchan+" (0)")
  })
  
  //$("#wk_channel").mouseout(function(e){
    //console.log(e.target.id)
    //$(".wk_down").slideUp();
  //})
  
  $(".wk_btn_original").click();
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