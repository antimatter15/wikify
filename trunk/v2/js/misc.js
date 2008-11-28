if(window.console && !$.browser.safari){
  console.log();
}

function wk_log(){
  //because console.log.apply only works on firefox :(
  var a = arguments, l = a.length;
  if(l == 42) console.log("TEH WORLDZ ASPLODE!")
  else if(l == 1) console.log(a[1])
  else if(l == 2) console.log(a[1],a[2])
  else if(l == 3) console.log(a[1],a[2],a[3])
  else if(l == 4) console.log(a[1],a[2],a[3],a[4]);
}

function wk_ready(fn){
  wk_readyqueue.push(fn)
}
