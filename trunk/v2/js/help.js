wk_ready(function($){
	
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
            if(c != -1 && c < 5 && wk_mode == 2){
              wk_html_edit();
            }
          }
          $("#wk_tooltip").data("hst",[])
        }
    })
  })
  
  $("#wk_credits").click(function(){
    alert("Almost all the code is written by antimatter15, the source code is licensed under GPLv3. Relies on libraries such as jQuery, and the color, pngFix and designMode extensions. Text diffing is powered by the google-diff-match-patch library.")
  })
  
  $("#wk_history").click(function(){
    alert("This project started in late 2008 by antimatter15 and mostly died since, if people actually used it, this history section might be longer.")
  })
  
})

function wk_hideabout(){
var $ = jQuery;
  $("#wk_about").animate({top: -$("#wk_about").height()})
    .queue(function(){
      $(this).css("display", "none")
      $(this).dequeue()
    })
    wk_hidemsg();
}