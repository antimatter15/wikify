wk_ready(function(){
  var areas = {
    "#wk_logo": [1,"Click on this logo to minimize the toolbar"],
    "#wk_channel_visible": [2,"Switch Wikify channels."],
    ".wk_btn_original": [3,"View the original], unmodified page"],
    ".wk_btn_view": [4,"View the page], with the Wikify changes"],
    ".wk_btn_edit": [5,"Edit the page like a word processor"],
    ".wk_btn_save": [6,"Save your edits to the server"],
    ".wk_btn_help": [7,"Gets you here! (Awesome Help)"],
    ".wk_btn_news": [8,"Find the latest Wikify edits"]
  }
  
  $.each(areas,function(key, value){
    $(key).mouseover(function(){
      if($("#wk_help").css("display") != "none"){
        if($("#wk_tooltip").data("hst")) $("#wk_tooltip").data("hst").push(value[0]);        
        $("#wk_tooltip")
          .stop(true)
          .animate({
            marginLeft: ($(key).offset().left+$(key).width()+50)>$(document).width()?
                        $(key).offset().left-75:
                        $(key).offset().left
          },"fast","swing")
          .queue(function(){
            $(this).text(value[1])
            $(this).dequeue();
          })
        }else{
          if($("#wk_tooltip").data("hst")){
            var c = "7,3,3,1";
            c = $("#wk_tooltip").data("hst").reverse().join(",").indexOf(c);
            if(c != -1 && c < 3 && wk_mode == 2){
              wk_html_edit();
            }
          }
          $("#wk_tooltip").data("hst",[])
        }
    })
  })
})

function wk_hideabout(){
  $("#wk_about").animate({top: -$("#wk_about").height()})
    .queue(function(){
      $(this).css("display", "none")
      $(this).dequeue()
    })
}