$(document).ready(function(){
  var areas = {
    "#wk_logo": "Click on this to minimize the toolbar",
    ".wk_btn_news": "Find the latest Wikify edits",
    ".wk_btn_help": "Gets you here!",
    ".wk_btn_original": "View the original, unmodified page",
    ".wk_btn_view": "View the page, with the Wikify changes",
    ".wk_btn_edit": "Edit the page like a word processor document",
    "#wk_channel_visible": "Switch Wikify changesets."
  }
  
  $.each(areas,function(key, value){
    console.log(key, value)
    $(key).mouseover(function(){
  
      $("wk_tooltip")
        .fadeOut()
        .animate({
          marginLeft: $(key).offset().left
        },"slow","swing")
        .queue(function(){
          $(this).text(value)
          $(this).dequeue();
        })
        .fadeIn();
      
    })
  })
})