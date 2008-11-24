function enable_edit(){
  doc = $("#wk_iframe").contentDocument();
  
  if($.browser.mozilla || $.browser.safari){
      $("#wk_iframe").designMode('on');
      $("#wk_iframe").execCommand("useCSS",true);
      
    if($.browser.mozilla){
      mozeditfix();
    }
    $('#wk_iframe').data('useDesignMode', true)
  }else{
    $("#wk_iframe").contentDocument().body.contentEditable = true;
  }
  
  
  $("#wk_iframe").one("load",function(){
    setTimeout(function(){
      snapshot = capture();
    },100);
  })
  //return editor;
}


function disable_edit(){
  if(!$('#wk_iframe').data('useDesignMode')){
    $("#wk_iframe").contentDocument().body.contentEditable = false;
  }else{
    $("#wk_iframe").designMode('off')
  }
}


function mozeditfix(){
  if(!$('#wk_iframe').data('hasEvent')){
    $($("#wk_iframe").contentDocument()).keypress(function(e){
      var key = String.fromCharCode(e.charCode).toLowerCase();
      if("biu".indexOf(key) != -1 && e.ctrlKey){
        $("#wk_iframe").execCommand(({
          b: "bold",
          i: "italic",
          u: "underline"
        })[key], null);
        e.preventDefault();
        e.stopPropagation();
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