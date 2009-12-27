function enable_edit(){
  /*
  editor = new xbDesignMode('wk_iframe');
  editor.setCSSCreation(true);
  */
  
  $("#wk_iframe").designMode('on')
  $("#wk_iframe").execCommand("useCSS",true);
  
  //if(navigator.userAgent.toLowerCase().indexOf("gecko") != -1){
  if($.browser.mozilla && !$('#wk_iframe').data('hasEvent')){
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
    //editor.mEditorDocument.addEventListener("keypress", keyhandler, true);
  }
  //return editor;
}


function disable_edit(){
  
  $("#wk_iframe").designMode('off')
}