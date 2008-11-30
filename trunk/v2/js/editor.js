function wk_enable_edit(){
  $('#wk_iframe').data('hasEdit', true)
  wk_doc = $("#wk_iframe").contentDocument();
  
  if($.browser.mozilla || $.browser.safari){
      $("#wk_iframe").designMode('on');
      $("#wk_iframe").execCommand("useCSS",true);
      
    if($.browser.mozilla){
      wk_mozeditfix();
    }
    $('#wk_iframe').data('useDesignMode', true)
  }else{
    wk_doc.body.contentEditable = true;
  }
  
  wk_keyboard();
  
  wk_autosnapshot();
  $("#wk_iframe").one("load",function(){
    wk_autosnapshot()
  })
  //return editor;
}

function wk_keyboard(){
  if(!$('#wk_iframe').data('wkhd')){
    $(wk_doc.documentElement).keypress(function(e){
      if(e.ctrlKey && e.charCode == 115 && wk_mode == 2){
        e.preventDefault();
        $(".wk_btn_save").click();
      }
    })
    $('#wk_iframe').data('wkhd',true)
  }
}

function wk_html_edit(){
  if(!$('#wk_iframe').data('inshtl')){
    $(wk_doc.documentElement).keypress(function(e){
      if(e.ctrlKey && e.charCode == 104){
        e.preventDefault();
        $("#wk_iframe").execCommand("inserthtml",prompt("Enter HTML to insert:"))
      }
    })
  }
  $('#wk_iframe').data('inshtl', true)
}


function wk_disable_edit(){
  if($("#wk_iframe").data("hasEdit") == true){
    if(!$('#wk_iframe').data('useDesignMode')){
      wk_doc.body.contentEditable = false;
    }else{
      $("#wk_iframe").designMode('off')
    }
  }
}


function wk_mozeditfix(){
  if(!$('#wk_iframe').data('hasEvent')){
    $(wk_doc.documentElement).keypress(function(e){
      var key = String.fromCharCode(e.charCode).toLowerCase();
      if("biu".indexOf(key) != -1 && e.ctrlKey){
        $("#wk_iframe").execCommand(({
          b: "bold",
          i: "italic",
          u: "underline"
        })[key], null);
        e.preventDefault();
      }
    });
    $('#wk_iframe').data('hasEvent', true)
  }
}



/*
$(document).ready(function(){
  $('#wk_iframe').one('load',function(){
    original_data = $("#wk_iframe").contentDocument().getElementsByTagName("HTML")[0].innerHTML
  })
})
*/