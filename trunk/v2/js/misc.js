if(window.console && !$.browser.safari){
  console.log();
}

function wk_log(){
  if(window.console && !$.browser.safari){
    console.log.apply(this,arguments);
  }
}

function wk_ready(fn){
  wk_readyqueue.push(fn)
}
