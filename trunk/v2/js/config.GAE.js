/*Google App Engine Config*/

(function(){
  var wk_conf = ({
    wk_mode: 2,
    wk_server: "http://wikify.antimatter15.com/wkserver",
    wk_url: window.location.href,
    wk_style: "http://wikify.antimatter15.com/static3/styles.css",
    wk_img: "http://wikify.antimatter15.com/static3/img/",
    wk_removescripts: true,
    wk_channel: "Spam",
    wk_channels: { //default channel database
      "Spam": {edits: 0},
      "Update": {edits: 0}
    }
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
var wk_mini = false;

function wk_onlaunch(){
  wk_remode(); //woot!
}