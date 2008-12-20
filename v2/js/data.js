function wk_write_data(data){
  wk_doc = $("#wk_iframe").contentDocument();
  wk_doc.open();
  wk_doc.write(data);
  wk_doc.close();
}

function wk_write_original(){
  wk_write_data(wk_original_data)
}

function wk_patch_links(){
  setTimeout(function(){
    $(wk_doc).find("a") //find all links
      .click(function(){ //on click event
        window.parent.location = this.href; //make them open up in the parent
    })
  },300)
}

function wk_load(callback){
  wk_get_data(wk_server, {url: wk_url, channel: wk_channel, action: "load"}, 
    function(data){
      var edits = [];
      for(var i = 0; i < data.edits.length; i++){
        /*Backwards Compatability*/
   
        data.edits[i].data = wk_upgrade(data.edits[i].data)
        edits.push(unescape(data.edits[i].data))
      }
      wk_cache[wk_channel] = unescape(data);
      wk_parse(edits);
      wk_log("Loaded Data: ",data)
      if(callback) callback();
    })
}



function wk_diffsave(callback){
  if(!wk_snapshot){wk_log("Error: No Snapshot!")}
  
  var changes = wk_diff();
  if(changes == "" || wk_mode != 2) return callback?callback():false; //no need for simple edits
  
  wk_send_data(wk_server, {url: wk_url, channel: wk_channel, data: escape(changes), action: "save"}, 
    function(){
      if(callback) callback();
      wk_log("Sent Data: ",changes)
      wk_channels[wk_channel].edits++;
      wk_render_channels()
    })
    wk_snapshot = wk_capture();
}