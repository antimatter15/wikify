(function(){
  var wk_conf = ({
    wk_mode: 2,
    wk_server: "http://wikify.appjet.net/",
    wk_url: window.location.href,
    wk_style: "http://localhost/Wikify/v2/styles.css",
    wk_img: "http://localhost/Wikify/v2/img/",
    wk_removescripts: true,
    wk_channel: "Spam",
    wk_channels: { //default channel database
      "Spam": {edits: 0},
      "Update": {edits: 0}
    }
  });
  for(var i in wk_conf){
    if(typeof(wk_image)==typeof(undefined)){
      window[i] = wk_conf[i];
    }
  }
  window.wk_conf = wk_conf;
})()



/*Not-Really variables*/
var wk_readyqueue = [];
var wk_original_data = "";

function wk_onlaunch(){
  wk_mode(); //woot!
}