function wk_local(){
	var $ = jQuery;
	$("#local").text("Loading...")
	wk_get_data(wk_server, {url: wk_url, action: "page"}, 
    function(data){
      wk_log("Got Local Edit Data: ",data)
      var edits = [];
	$("#local").text("")
      for(var i = 0; i < data.edits.length; i++){
		var d = unescape(unescape(unescape(unescape(data.edits[i].data))))
		$("#local").append("<center><i>"+data.edits[i].channel+"</i> ("+data.edits[i].date.split(".")[0]+")</center><pre>"+
		d.substr(0,140)+(d.length>140?"...":"")+"</pre><br>") //tweet-sized turns out to be a great truncation length
      }
    })
	
}

function wk_global(){
	var $ = jQuery;
	$("#global").text("Loading...")
	wk_get_data(wk_server, {action: "latest"}, 
    function(data){
      wk_log("Got Global Edit Data: ",data)
	$("#global").text("");
      
	for(var i = 0; i < data.edits.length; i++){
		var d = unescape(unescape(unescape(unescape(data.edits[i].data))))
		$("#global").append("<center><a href='"+data.edits[i].url+"'>"+data.edits[i].url+"</a> "+ //xss flaw, too bored to fix
		"<i>"+data.edits[i].channel+"</i> ("+data.edits[i].date.split(".")[0]+")</center><pre>"+
		d.substr(0,140)+(d.length>140?"...":"")+"</pre><br>") //tweet-sized turns out to be a great truncation length
		
      }

     
    })
}