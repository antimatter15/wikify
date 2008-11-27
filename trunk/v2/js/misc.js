console.log();
function wk_log(){
  if(window.console && !$.browser.safari){
    console.log.apply(this,arguments);
  }
}