

var wk_mode = 1;
var wk_server = "http://wikify.appjet.net/";
var wk_original_data = "";
var wk_channel = "Spam";
var wk_url = "_WikifyTesting";
var wk_style = "http://localhost/Wikify/v2/styles.css"
var wk_img = "http://localhost/Wikify/v2/img/"
var wk_channels = {
  "Spam": {edits: 0},
  "Update": {edits: 0}
};


/*Not-Really variables*/

var wk_readyqueue = [];





if(window.console && !$.browser.safari){
  console.log();
}

function wk_log(){
  if(window.console && !$.browser.safari){
    console.log.apply(this,arguments);
  }
}

function wk_ready(fn){
  wk_readyqueue.push(fn)
}




var wk_toolbar = '<div id="wk_toolbar"><ul><li class="wk_logo" id="wk_logo"><img src="img/wikify.png" alt="Project Wikify (beta)"></li><li>&nbsp;</li><li id="wk_channel"><ul class="wk_down"><li class="wk_custom">Custom</li></ul><ul id="wk_channel_visible"><li id="wk_channel_text">Loading...</li><li class="wk_arrow"><img src="img/down.png" style="margin-top: 2px;"></li></ul></li><li>&nbsp;</li><li class="wk_btn wk_mode wk_btn_original">Original</li><li class="wk_btn wk_mode wk_btn_view">View</li><li class="wk_btn wk_mode wk_btn_edit">Edit</li></ul><ul style="float: right" class="wk_btn wk_btn_news"><li class="wk_right"><img src="img/package_editors.png"></li><li class="wk_right">News</li></ul><ul style="float: right" class="wk_btn wk_btn_help"><li class="wk_right"><img src="img/info.png"></li><li class="wk_right">Help</li></ul><ul style="float: right" class="wk_btn wk_btn_save"><li id="wk_save" class="wk_right"><img src="img/3floppy_unmount.png"></li><li id="wk_saving" class="wk_right" style="display: none"><img src="img/loading.gif"></li><li class="wk_right">Save</li></ul></div><div id="wk_expand">&gt;</div><div id="wk_mask"><h1 class="wk_load">Loading...</h1></div><iframe id="wk_iframe" class="wk_iframe" border="0"></iframe><div id="wk_news"><div style="float: left; width: 50%"><h3>This Page</h3></div><div style="float: right; width: 50%"><h3>Wikify Global</h3></div></div><div id="wk_help"><span class="wk_note">Move your mouse cursor over the toolbar items to see what they do.</span><div id="wk_tooltip"></div><div style="text-align: left;margin-top: 30px"><span><b>Project Wikify</b> Toolbar UI. Awesome.</span></div></div>';



/*
 * jQuery Color Animations
 * Copyright 2007 John Resig
 * Released under the MIT and GPL licenses.
 */

(function(jQuery){

	// We override the animation for all of these color styles
	jQuery.each(['backgroundColor', 'borderBottomColor', 'borderLeftColor', 'borderRightColor', 'borderTopColor', 'color', 'outlineColor'], function(i,attr){
		jQuery.fx.step[attr] = function(fx){
			if ( fx.state == 0 ) {
				fx.start = getColor( fx.elem, attr );
				fx.end = getRGB( fx.end );
			}

			fx.elem.style[attr] = "rgb(" + [
				Math.max(Math.min( parseInt((fx.pos * (fx.end[0] - fx.start[0])) + fx.start[0]), 255), 0),
				Math.max(Math.min( parseInt((fx.pos * (fx.end[1] - fx.start[1])) + fx.start[1]), 255), 0),
				Math.max(Math.min( parseInt((fx.pos * (fx.end[2] - fx.start[2])) + fx.start[2]), 255), 0)
			].join(",") + ")";
		}
	});

	// Color Conversion functions from highlightFade
	// By Blair Mitchelmore
	// http://jquery.offput.ca/highlightFade/

	// Parse strings looking for color tuples [255,255,255]
	function getRGB(color) {
		var result;

		// Check if we're already dealing with an array of colors
		if ( color && color.constructor == Array && color.length == 3 )
			return color;

		// Look for rgb(num,num,num)
		if (result = /rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/.exec(color))
			return [parseInt(result[1]), parseInt(result[2]), parseInt(result[3])];

		// Look for rgb(num%,num%,num%)
		if (result = /rgb\(\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*\)/.exec(color))
			return [parseFloat(result[1])*2.55, parseFloat(result[2])*2.55, parseFloat(result[3])*2.55];

		// Look for #a0b1c2
		if (result = /#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})/.exec(color))
			return [parseInt(result[1],16), parseInt(result[2],16), parseInt(result[3],16)];

		// Look for #fff
		if (result = /#([a-fA-F0-9])([a-fA-F0-9])([a-fA-F0-9])/.exec(color))
			return [parseInt(result[1]+result[1],16), parseInt(result[2]+result[2],16), parseInt(result[3]+result[3],16)];

		// Otherwise, we're most likely dealing with a named color
		return colors[jQuery.trim(color).toLowerCase()];
	}
	
	function getColor(elem, attr) {
		var color;

		do {
			color = jQuery.curCSS(elem, attr);

			// Keep going until we find an element that has color, or we hit the body
			if ( color != '' && color != 'transparent' || jQuery.nodeName(elem, "body") )
				break; 

			attr = "backgroundColor";
		} while ( elem = elem.parentNode );

		return getRGB(color);
	};
	
	// Some named colors to work with
	// From Interface by Stefan Petre
	// http://interface.eyecon.ro/

	var colors = {
		aqua:[0,255,255],
		azure:[240,255,255],
		beige:[245,245,220],
		black:[0,0,0],
		blue:[0,0,255],
		brown:[165,42,42],
		cyan:[0,255,255],
		darkblue:[0,0,139],
		darkcyan:[0,139,139],
		darkgrey:[169,169,169],
		darkgreen:[0,100,0],
		darkkhaki:[189,183,107],
		darkmagenta:[139,0,139],
		darkolivegreen:[85,107,47],
		darkorange:[255,140,0],
		darkorchid:[153,50,204],
		darkred:[139,0,0],
		darksalmon:[233,150,122],
		darkviolet:[148,0,211],
		fuchsia:[255,0,255],
		gold:[255,215,0],
		green:[0,128,0],
		indigo:[75,0,130],
		khaki:[240,230,140],
		lightblue:[173,216,230],
		lightcyan:[224,255,255],
		lightgreen:[144,238,144],
		lightgrey:[211,211,211],
		lightpink:[255,182,193],
		lightyellow:[255,255,224],
		lime:[0,255,0],
		magenta:[255,0,255],
		maroon:[128,0,0],
		navy:[0,0,128],
		olive:[128,128,0],
		orange:[255,165,0],
		pink:[255,192,203],
		purple:[128,0,128],
		violet:[128,0,128],
		red:[255,0,0],
		silver:[192,192,192],
		white:[255,255,255],
		yellow:[255,255,0]
	};
	
})(jQuery);



/**
 * designMode jQuery plugin v0.1, by Emil Konow.
 * This plugin allows you to handle functionality related to designMode in a cross-browser way.
 */

/**
 * Cross-browser function to access a DOM:Document element
 * Example: $('#foo').contentDocument();
 *
 * @uses jQuery
 *
 * @return object DOM:Document - the document of the frame, iframe or window
 */
jQuery.fn.contentDocument = function() {
	var frame = this[0];
	if (frame.contentDocument) {
		return frame.contentDocument;
	} else if (frame.contentWindow && frame.contentWindow.document) {
		return frame.contentWindow.document;
	} else if (frame.document) {
		return frame.document;
	} else {
		return null;
	}
}

/**
 * Cross-browser function to set the designMode property
 * Example: $('#foo').designMode('on');
 *
 * @uses jQuery, jQuery.fn.contentDocument
 *
 * @param string mode - Which mode to use, should either 'on' or 'off'
 *
 * @return jQuery element - The jQuery element itself, to allow chaining
 */
jQuery.fn.designMode = function(mode) {
	// Default mode is 'on'
	var mode = mode || 'on';
	this.each(function() {
		var frame = $(this);
		var doc = frame.contentDocument();
		if (doc && doc.designMode != mode) {
		
			doc.designMode = mode;
			// Some browsers are kinda slow, so you'll have to wait for the window to load
			// commented, causes IE to give me a seizure!
			/*
			frame.load(function() {
				$(this).contentDocument().designMode = mode;
			});
			*/
		}
	});
	return this;
}

/**
 * Cross-browser function to execute designMode commands
 * Example: $('#foo').execCommand('formatblock', '<p>');
 *
 * @uses jQuery, jQuery.fn.contentDocument
 *
 * @param string cmd - The command to execute. Please see http://www.mozilla.org/editor/midas-spec.html
 * @param string param - Optional parameter, required by some commands
 *
 * @return jQuery element - The jQuery element itself, to allow chaining
 */
jQuery.fn.execCommand = function(cmd, param) {
	this.each(function() {
		var doc = $(this).contentDocument();
		if (doc) {
			// Use try-catch in case of invalid or unsupported commands
    		try {
				// Non-IE-browsers requires all three arguments
				doc.execCommand(cmd, false, param);
			} catch (e) {
			}
		}
	});
	return this;
}



function wk_enable_edit(){
  wk_doc = $("#wk_iframe").contentDocument();
  
  if($.browser.mozilla || $.browser.safari){
      $("#wk_iframe").designMode('on');
      $("#wk_iframe").execCommand("useCSS",true);
      
    if($.browser.mozilla){
      wk_mozeditfix();
    }
    $('#wk_iframe').data('useDesignMode', true)
  }else{
    $("#wk_iframe").contentDocument().body.contentEditable = true;
  }
  
  wk_autosnapshot();
  $("#wk_iframe").one("load",function(){
    wk_autosnapshot()
  })
  //return editor;
}


function wk_disable_edit(){
  if(!$('#wk_iframe').data('useDesignMode')){
    $("#wk_iframe").contentDocument().body.contentEditable = false;
  }else{
    $("#wk_iframe").designMode('off')
  }
}


function wk_mozeditfix(){
  if(!$('#wk_iframe').data('hasEvent')){
    $($("#wk_iframe").contentDocument()).keypress(function(e){
      var key = String.fromCharCode(e.charCode).toLowerCase();
      if("biu".indexOf(key) != -1 && e.ctrlKey){
        $("#wk_iframe").execCommand(({
          b: "bold",
          i: "italic",
          u: "underline"
        })[key], null);
        e.preventDefault();
        e.stopPropagation();
      }
    });
    $('#wk_iframe').data('hasEvent', true)
  }
}



/*
$(document).ready(function(){
  $('#wk_iframe').one('load',function(){
    original_data = $("#wk_iframe").contentDocument().getElementsByTagName("HTML")[0].innerHTML
  })
})
*/



function wk_original(){
    $(".wk_btn_save").fadeOut()
    wk_mode = 0;
    wk_write_original();
    wk_patch_links();
    wk_disable_edit();
    wk_mask(false)
}

function wk_view(){
    $(".wk_btn_save").fadeOut()
    wk_mode = 1
    wk_write_original();
    wk_disable_edit()
    wk_patch_links()
    wk_load(function(){
          wk_mask(false)
    });
}

function wk_edit(){
    $(".wk_btn_save").fadeIn()
    wk_mode = 2
    wk_write_original();
    wk_load(function(){
          wk_enable_edit();
          wk_mask(false)
    });
}


wk_ready(function(){
  $(".wk_mode").click(function(){
    $(".wk_mode").animate({color: "#858585"})
    wk_mask(true)
    $(this).animate({color: "white"})
  })
  
  /*mode buttons*/
  $(".wk_btn_original").click(wk_original)
  $(".wk_btn_view").click(wk_view)
  $(".wk_btn_edit").click(wk_edit)  
})



wk_ready(function(){
  $(".wk_btn_save").click(function(){
    wk_saving(true);
    wk_diffsave(function(){
        setTimeout(function(){
          wk_saving(false);
        },250);
      }
    )
  })
  
  $(".wk_btn_news").click(function(){
    $("#wk_help").slideUp().queue(function(){
      $("#wk_news").slideToggle();
      $(this).dequeue();
    })
  })
  
  $(".wk_btn_help").click(function(){
    $("#wk_news").slideUp().queue(function(){
      $("#wk_help").slideToggle();
      $(this).dequeue();
    })
  })

  $("#wk_channel_visible").click(function(){
    $(".wk_down").slideToggle();
    $("#wk_news").slideUp()
    $("#wk_help").slideUp()
  })

  
  $("#wk_channel").hover(function(e){
  },function(e){
    if($(".wk_down").queue().length == 0){
      setTimeout(function(){
        $(".wk_down").slideUp();
      },500);
    }
  })
  
  $(".wk_custom").click(function(){
    var newchan = prompt("Enter name of channel you would like to go to or create.");
    $(".wk_down").slideUp();
    if(newchan){
      wk_set_channel(newchan)
    }else{
      //do nothing
    }
  })
  
  //$([".wk_btn_original",".wk_btn_view",".wk_btn_edit"][wk_mode]).click()
})



function wk_collapse(){
  $("#wk_news").slideUp()
  $("#wk_help").slideUp()
  $(".wk_down").slideUp();
  $("#wk_toolbar").animate({
    left: "-100%"
  })
  $("#wk_iframe").animate({
    "top": "0px"
  },null,null,function(){
    $(window).resize()
  })
}

function wk_expand(){
  $("#wk_toolbar").animate({
    left: "0%"
  })
  $("#wk_iframe").animate({
    "top":30
  },null,null,function(){
    $(window).resize()
  })
}

function wk_resize(){
  if($("#wk_iframe").css("top") == "30px"){
    $("#wk_iframe").height($(window).height()-30)
  }else{
    $("#wk_iframe").height($(window).height())
  }
}


function wk_saving(mode){
  if(mode == true){
    $("#wk_save").hide()
    $("#wk_saving").show();
  }else{
    $("#wk_saving").hide();
    $("#wk_save").show()
  }
}

function wk_mask(mode){
  if(mode == true){
    $("#wk_mask").slideDown()
    $("#wk_news").slideUp()
    $("#wk_help").slideUp()
  }else{
    $("#wk_mask").slideUp()
  }
}

wk_ready(function(){
  $(window).resize(wk_resize);
  wk_resize();
  
  $("#wk_logo").click(wk_collapse)
  $("#wk_expand").click(wk_expand)
})



$(document).ready(function(){
  var areas = {
    "#wk_logo": "Click on this logo to minimize the toolbar",
    ".wk_btn_save": "Save your edits to the server",
    ".wk_btn_news": "Find the latest Wikify edits",
    ".wk_btn_help": "Gets you here! (Awesome Help)",
    ".wk_btn_original": "View the original, unmodified page",
    ".wk_btn_view": "View the page, with the Wikify changes",
    ".wk_btn_edit": "Edit the page like a word processor",
    "#wk_channel_visible": "Switch Wikify changesets."
  }
  
  $.each(areas,function(key, value){
    $(key).mouseover(function(){
      $("#wk_tooltip")
        .stop(true)
        .animate({
          marginLeft: ($(key).offset().left+$(key).width()+50)>$(document).width()?
                      $(key).offset().left-75:
                      $(key).offset().left
        },"fast","swing")
        .queue(function(){
          $(this).text(value)
          $(this).dequeue();
        })
    })
  })
})




function wk_set_channel(channel){
  wk_channel = channel;
  if(!wk_channels[wk_channel]){
    wk_channels[wk_channel] = {edits: 0};
  }
  $([".wk_btn_original",".wk_btn_view",".wk_btn_edit"][wk_mode]).click()
  wk_get_channels()
}

function wk_render_channels(){
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
    wk_set_channel($(this).data("chan"))
  })

}

function wk_get_channels(callback){
  wk_get_data(wk_server, {url: "_WikifyTesting"}, function(e){
    wk_log("Got Channel Data", e)
    for(var x in e.channels){
      wk_channels[x] = e.channels[x]
    }
    wk_render_channels();
  })
}



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
  $(wk_doc).find("a") //find all links
    .click(function(){ //on click event
      window.parent.location = this.href; //make them open up in the parent
  })
}

function wk_load(callback){
  wk_get_data(wk_server, {url: wk_url, channel: wk_channel}, 
    function(data){
      var edits = [];
      for(var i = 0; i < data.edits.length; i++){
        edits.push(data.edits[i].data)
      }
      wk_parse(edits);
      wk_log("Loaded Data: ",data)
      if(callback) callback();
    })
}

function wk_diffsave(callback){
  if(!wk_snapshot){wk_log("Error: No Snapshot!")}
  
  var changes = wk_diff();
  if(changes == "" || wk_mode != 2) return callback?callback():false; //no need for simple edits
  
  wk_send_data(wk_server, {url: wk_url, channel: wk_channel, data: changes}, 
    function(){
      if(callback) callback();
      wk_log("Sent Data: ",changes)
    })
    wk_snapshot = wk_capture();
    wk_get_channels()
}



/*
saveurl:"http://wikify.antimatter15.com/server/save",
loadurl:"http://wikify.antimatter15.com/server/load",
*/

function wk_send_data(url, params, callback){
  var id = "wk_xfnx"+Math.floor(Math.random()*12345)

  var form = $("<form>")
    .attr({
      action: url,
      target: id,
      method: "POST"
    })
    .append($("<iframe>")
      .attr('name',id)
      .load(function(){
        callback()
        setTimeout(function(){
          form.remove()
        },50000)
      }))
    .appendTo("body")
    
  $.each(params,function(key,value){
    $("<input type='hidden'>")
      .attr({
        name: key
      })
      .val(value)
      .appendTo(form)
  })
  form.submit();
}


function wk_get_data(url, params, callback){
  $.get(url, params, callback, "jsonp"); //thx jQuery!
}



var wk_snapshot = null;
var wk_lastsnapshot = 0;
var wk_doc = null;

function wk_getChildren(e){
  var m = [], k = e.childNodes, v = k.length, u;
  for(var x = 0; x < v; x++){
    u = k[x];
    if(u.nodeType != 3) m.push(u)
  }
  return m;
}

function wk_getText(e){
  for(var i = e.childNodes.length, text = ""; i--;){
    if(e.childNodes[i].nodeType == 3)
      text += e.childNodes[i].nodeValue;
  }
  return text;
}

function wk_fromID(text){
  var a = text.split(">>")
  var e = (a[0]=="_body")?wk_doc.body: //body
      wk_doc.getElementById(a[0]); //or id
  
  while(a.length > 1)
    e = wk_getChildren(e)[a.splice(1,1)];
  return e;
}

function wk_getID(e){
  var a = "", //declare string that holds ID components
      k = [] //declare temporary cache thing
  while(e != wk_doc.body && !e.id){
    k = wk_getChildren(e.parentNode);
    for(var i = 0; k[i] != e; i++);
    a = ">>"+i+a;
    e = e.parentNode;
  }
  return (e.id?e.id:"_body") + a
}

function wk_in_list(list,str){
  return (","+list+",").indexOf(","+str+",") != -1;
}

function wk_capture(){
  var all = wk_doc.body.getElementsByTagName("*");
  var cap = {};
  for(var i = all.length; i--;){
    if(!wk_in_list("script,noscript,style,link,frame,iframe",all[i].tagName.toLowerCase()) && 
        all[i].id.indexOf("firebug") == -1){
      try{
        cap[wk_getID(all[i])] = wk_getText(all[i]);
      }catch(err){
        /*ignore errors*/
      }
    }else{
      /*invalid elements*/
    }
  }
  cap["_body"] = wk_getText(wk_doc.body);
  return cap;
}

function wk_diff(){
  var cap = wk_capture(),
      ignore = "",
      changes = [];
  
  for(var i in cap){
    if(!wk_in_list(ignore, i) && //make sure it's not 
       wk_snapshot[i] != cap[i]
    ){
      var el = wk_fromID(i), //get element
          ch = el.getElementsByTagName("*") //get children
      for(var x = 0; x < ch.length; x++)
        ignore += ","+wk_getID(ch[x]); //add element to ignore list
      changes.push(i+"[::]"+el.innerHTML)
    }
  }
  return changes.join("[++]")
}

function wk_parse(changes){
  changes = changes.join("[++]").split("[++]"); //generic units
  for(var i = 0; i < changes.length; i++){
    if(changes[i] != ''){
      try{
      var edit = changes[i].split("[::]");
      wk_fromID(edit[0]).innerHTML = edit[1]
      }catch(err){
        /*ignore errors*/
      }
    }
  }
}

function wk_autosnapshot(c){
  setTimeout(function(){
        if((new Date()).getTime() - wk_lastsnapshot > 300){
          wk_snapshot = wk_capture();
          wk_lastsnapshot = (new Date()).getTime();
        }
        if(c) c();
  },1337/10);
}



(function(){
  $(".wk_initsc").remove();

  wk_original_data = "<html>"+document.getElementsByTagName("HTML")[0].innerHTML+"</html>";

  for(var s=document.styleSheets, i=s.length;i--;){
    s[i].disabled = true;
  }
  
  $('<link rel="stylesheet" type="text/css" media="screen">')
    .attr("href", wk_style)
    .appendTo("head");
    
  
  document.body.innerHTML = wk_toolbar.split("img/").join(wk_img); //replaceall
  
  for(var i = 0; i < wk_readyqueue.length; i++){
    wk_readyqueue[i]();
  }
  
  wk_get_channels()
  $([".wk_btn_original",".wk_btn_view",".wk_btn_edit"][wk_mode]).click()
})()



