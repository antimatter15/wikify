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
    },
    wk_dev: false,
    wk_runinit: true //development stuff
  });
  for(var i in wk_conf){
    if(typeof(window[i]) == typeof(undefined) || window[i].innerHTML){
      window[i] = wk_conf[i];
    }
  }
  window.wk_conf = wk_conf;

})()



/*Not-Really variables*/
var wk_readyqueue = [];
var wk_original_data = "";
var wk_ui = 0;
var wk_cache = {};

function wk_onlaunch(){
  wk_remode(); //woot!
}