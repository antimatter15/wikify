$(document).ready(function(){
  $(".wk_btn_save").click(function(){
    wk_saving(true);
    wk_diffsave(function(){
        setTimeout(function(){
          wk_saving(false);
        },250);
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
  },function(e){
    if($(".wk_down").queue().length == 0){
      setTimeout(function(){
        $(".wk_down").slideUp();
      },500);
    }
  })
  
  $(".wk_custom").click(function(){
    var newchan = prompt("Enter name of channel you would like to go to or create.");
    $(".wk_down").slideUp();
    if(newchan){
      wk_set_channel(newchan)
    }else{
      //do nothing
    }
  })
  
  //$([".wk_btn_original",".wk_btn_view",".wk_btn_edit"][wk_mode]).click()
})