$(document).ready(function(){
  var areas = {
    "#wk_logo": "Click on this logo to minimize the toolbar",
    ".wk_btn_save": "Save your edits to the server",
    ".wk_btn_news": "Find the latest Wikify edits",
    ".wk_btn_help": "Gets you here! (Awesome Help)",
    ".wk_btn_original": "View the original, unmodified page",
    ".wk_btn_view": "View the page, with the Wikify changes",
    ".wk_btn_edit": "Edit the page like a word processor",
    "#wk_channel_visible": "Switch Wikify changesets."
  }
  
  $.each(areas,function(key, value){
    $(key).mouseover(function(){
      $("#wk_tooltip")
        .stop(true)
        .animate({
          marginLeft: ($(key).offset().left+$(key).width()+50)>$(document).width()?
                      $(key).offset().left-75:
                      $(key).offset().left
        },"fast","swing")
        .queue(function(){
          $(this).text(value)
          $(this).dequeue();
        })
    })
  })
})