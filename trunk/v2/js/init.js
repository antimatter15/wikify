(function(){
  wk_original_data = "<html>"+document.getElementsByTagName("HTML")[0].innerHTML+"</html>";

  for(var s=document.styleSheets, i=s.length;i--;){
    s[i].disabled = true;
  }
  
  $('<link rel="stylesheet" type="text/css" media="screen">')
    .attr("href", )
    .appendTo("head");
  
  document.body.innerHTML = wk_toolbar;
})()