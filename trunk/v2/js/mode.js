function wk_original(){
    $(".wk_btn_save").fadeOut()
    wk_mode = 0;
    wk_write_original();
    wk_disable_edit();
    wk_patch_links();
    wk_mask(false)
}

function wk_view(){
    $(".wk_btn_save").fadeOut()
    wk_mode = 1
    wk_write_original();
    wk_disable_edit()
    wk_load(function(){
          wk_mask(false)
          wk_patch_links()
    });
}

function wk_edit(){
    $(".wk_btn_save").fadeIn()
    wk_mode = 2
    wk_write_original();
    wk_load(function(){
          wk_enable_edit();
          wk_mask(false)
    });
}


wk_ready(function(){
  $(".wk_mode").click(function(){
    $(".wk_mode").animate({color: "#858585"})
    wk_mask(true)
    $(this).animate({color: "#ffffff"})
  })
  
  /*mode buttons*/
  $(".wk_btn_original").click(wk_original)
  $(".wk_btn_view").click(wk_view)
  $(".wk_btn_edit").click(wk_edit)  
})