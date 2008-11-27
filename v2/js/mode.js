function wk_original(){
    $(".wk_btn_save").fadeOut()
    wk_mode = 0;
    wk_write_original();
    wk_patch_links();
    wk_disable_edit();
    wk_mask(false)
}

function wk_view(){
    $(".wk_btn_save").fadeOut()
    wk_mode = 1
    wk_write_original();
    wk_disable_edit()
    wk_patch_links()
    wk_load(function(){
          wk_mask(false)
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