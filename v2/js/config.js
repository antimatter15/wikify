var wk_mode = 1;
var wk_server = "http://wikify.appjet.net/";
var wk_original_data = "";
var wk_channel = "Spam";
var wk_url = window.wk_real?window.location.href:"_WikifyTesting"; 
var wk_style = "http://localhost/Wikify/v2/styles.css"
var wk_img = "http://localhost/Wikify/v2/img/"
var wk_channels = {
  "Spam": {edits: 0},
  "Update": {edits: 0}
};


/*Not-Really variables*/

var wk_readyqueue = [];

