if(window.console && !$.browser.safari){
  console.log();
}

function wk_log(a,b,c,d,e,f,g){
  console.log(a,b,c,d,e,f,g); //because console.log.apply only works on firefox :(
}

function wk_ready(fn){
  wk_readyqueue.push(fn)
}
