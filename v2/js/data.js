var server = "http://wikify.appjet.net/";
var original_data = "";
var wk_channel = "Spam";
var wk_channels = {
"Spam": {edits: 0},
"Update": {edits: 0}
};

$.get("content.htm",{}, function(e){
  original_data = e;
  $(document).ready(function(){
  get_channels()
    $([".wk_btn_original",".wk_btn_view",".wk_btn_edit"][wk_mode]).click()
  })
})

function write_data(data){
  doc = $("#wk_iframe").contentDocument();
  doc.open();
  doc.write(data);
  doc.close();
}

function write_original(){
  write_data(original_data)
}

function patch_links(){
  $(doc).find("a") //find all links
    .click(function(){ //on click event
      window.parent.location = this.href; //make them open up in the parent
  })
}

function set_channel(channel){
  wk_channel = channel;
  if(!wk_channels[wk_channel]){
    wk_channels[wk_channel] = {edits: 0};
  }
  $([".wk_btn_original",".wk_btn_view",".wk_btn_edit"][wk_mode]).click()
  get_channels()
}

function render_channels(){
  $("#wk_channel_text").text(wk_channel+" ("+wk_channels[wk_channel].edits+")");
  $(".wk_chan").remove();
  for(var i in wk_channels){
    $("<li></li>")
    .text(i+" ("+wk_channels[i].edits+")")
    .addClass("wk_chan")
    .data("chan",i)
    .insertBefore(".wk_custom")
  }
  
  $(".wk_chan").click(function(){
    $(".wk_down").slideUp();
    set_channel($(this).data("chan"))
  })

}

function get_channels(callback){
  get_data(server, {url: "_WikifyTesting"}, function(e){
    wk_log("Got Channel Data", e)
    for(var x in e.channels){
      wk_channels[x] = e.channels[x]
    }
    render_channels();
  })
}

function load(callback){
  get_data(server, {url: "_WikifyTesting", channel: wk_channel}, 
    function(data){
      var edits = [];
      for(var i = 0; i < data.edits.length; i++){
        edits.push(data.edits[i].data)
      }
      parse(edits);
      wk_log("Loaded Data: ",data)
      if(callback) callback();
    })
}

function save(callback){
  if(!snapshot){wk_log("Error: No Snapshot!")}
  
  var changes = diff();
  if(changes == "" || wk_mode != 2) return callback?callback():false; //no need for simple edits
  
  send_data(server, {url: "_WikifyTesting", channel: wk_channel, data: changes}, 
    function(){
      if(callback) callback();
      wk_log("Sent Data: ",changes)
    })
    snapshot = capture();
    get_channels()
}