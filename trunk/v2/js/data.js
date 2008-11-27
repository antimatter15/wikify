var server = "http://wikify.appjet.net/";
var original_data = "";

$.get("content.htm",{}, function(e){
  original_data = e;
  $(document).ready(function(){
    $([".wk_btn_original",".wk_btn_view",".wk_btn_edit"][wk_mode]).click()
  })
})

function write_data(data){
  doc = $("#wk_iframe").contentDocument();
  doc.open();
  doc.write(data);
  doc.close();
  
  $(doc).find("a") //find all links
    .click(function(){ //on click event
      window.parent.location = this.href; //make them open up in the parent
    })
}

function write_original(){
  write_data(original_data)
}


function load(callback){
  get_data(server, {url: "_WikifyTesting", channel: "_WikifyTesting"}, 
    function(data){
      var edits = [];
      for(var i = 0; i < data.edits.length; i++){
        edits.push(data.edits[i].data)
      }
      parse(edits);
      wk_log("Loaded Data: ",data)
      //console.log(data)
      if(callback) callback();
    })
  
}

function save(callback){
  if(!snapshot){
    wk_log("Error: No Snapshot!")
  }

  var changes = diff();
  
  if(changes == "" || wk_mode != 2) return callback?callback():false; //no need for simple edits
  
  //console.log(changes)
  
  send_data(server, {url: "_WikifyTesting", channel: "_WikifyTesting", data: changes}, 
    function(){
      if(callback) callback();
      wk_log("Sent Data: ",changes)
    })
    snapshot = capture();
}