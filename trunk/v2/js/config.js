var wk_mode = 1; //0=original, 1=view, 2=edit
var wk_server = "http://wikify.appjet.net/"; //the server url
var wk_channel = "Spam"; //default channel
var wk_url = window.wk_real?window.location.href:"_WikifyTesting"; 
var wk_style = "http://localhost/Wikify/v2/styles.css"; //style location
var wk_img = "http://localhost/Wikify/v2/img/"; //image location
var wk_removescripts = true; //remove scripts?
var wk_channels = { //default channel database
  "Spam": {edits: 0},
  "Update": {edits: 0}
};


/*Not-Really variables*/
var wk_readyqueue = [];
var wk_original_data = "";
