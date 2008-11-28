if(window.console && !$.browser.safari){
  console.log();
}

function wk_log(){
  //because console.log.apply only works on firefox :(
  var s = "";
  for(var i = 0; i < arguments.length; i++){
    s+="arg["+i+"]"+(i==arguments.length-1?"":",");
  }
  eval("(function(arg){console.log("+s+")})")(arguments)
}

function wk_ready(fn){
  wk_readyqueue.push(fn)
}
