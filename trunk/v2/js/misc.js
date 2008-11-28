/*I just feel like blaming this whole file on microsoft*/

if(window.console && !($.browser.msie && $.browser.version == 6)){
  try{
    console.log();
  }catch(err){}
}

function wk_log(){
  if(window.console && !($.browser.msie && $.browser.version == 6)){
    //because console.log.apply only works on firefox :(
    var a = arguments, l = a.length;
    if(l == 42) console.log("TEH WORLDZ ASPLODE!")
    else if(l == 1) console.log(a[0])
    else if(l == 2) console.log(a[0],a[1])
    else if(l == 3) console.log(a[0],a[1],a[2])
    else if(l == 4) console.log(a[0],a[1],a[2],a[3]);
  }
}

function wk_ready(fn){
  wk_readyqueue.push(fn)
}


wk_ready(function(){ //dumbie!
  if($.browser.msie){
    $.getScript("http://wikify.googlecode.com/svn-history/r161/trunk/v2/js/jquery.pngFix.js",
      function(){
         $('#wk_logo').pngFix();
         $('.wk_btn').pngFix();
      })
  }
})
