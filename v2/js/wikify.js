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



 /*wikify file: js/misc.js */ 

/*I just feel like blaming this whole file on microsoft*/

if(window.console && !($.browser.msie && $.browser.version == 6)){
  try{
    console.log();
  }catch(err){}
}

function wk_log(){
  if(window.console && !($.browser.msie && $.browser.version == 6)){
    //because console.log.apply only works on firefox :(
    var a = arguments, l = a.length;
    if(l == 42) console.log("TEH WORLDZ ASPLODE!")
    else if(l == 1) console.log(a[0])
    else if(l == 2) console.log(a[0],a[1])
    else if(l == 3) console.log(a[0],a[1],a[2])
    else if(l == 4) console.log(a[0],a[1],a[2],a[3]);
  }
}

function wk_ready(fn){
  wk_readyqueue.push(fn)
}


wk_ready(function(){ //dumbie!
  if($.browser.msie){
    $.getScript("http://wikify.googlecode.com/svn-history/r161/trunk/v2/js/jquery.pngFix.js",
      function(){
        $(".wk_arrow img").attr("src",$(".wk_arrow img").attr("src").replace(/\.png/g,".gif"))
         $('#wk_logo').pngFix();
         $('.wk_btn').pngFix();
      })
  }
})


setInterval(function(){
  $ = jQuery;
},500)



 /*wikify file: js/toolbar.js */ 

var wk_toolbar = '<div id="wk_toolbar"><ul><li class="wk_logo" id="wk_logo"><img src="img/wikify.png" alt="Project Wikify (beta)" title="Collapse Toolbar"></li><li class="wk_space">&nbsp;</li><li id="wk_channel"><ul class="wk_down"><li class="wk_custom">Custom</li></ul><ul id="wk_channel_visible"><li id="wk_channel_text" title="Change Channel">Loading...</li><li class="wk_arrow"><img src="img/down.png" style="padding-top: 5px;"></li></ul></li><li class="wk_space">&nbsp;</li><li class="wk_btn wk_mode wk_btn_original" title="Original">Original</li><li class="wk_btn wk_mode wk_btn_view" title="View">View</li><li class="wk_btn wk_mode wk_btn_edit" title="Edit">Edit</li></ul><ul style="float: right" class="wk_btn wk_btn_news" title="News"><li class="wk_right"><img src="img/package_editors.png"></li><li class="wk_right wk_btn_txt">News</li></ul><ul style="float: right" class="wk_btn wk_btn_help" title="Help"><li class="wk_right"><img src="img/info.png"></li><li class="wk_right wk_btn_txt">Help</li></ul><ul style="float: right" class="wk_btn wk_btn_save" title="Save"><li id="wk_save" class="wk_right"><img src="img/3floppy_unmount.png"></li><li id="wk_saving" class="wk_right" style="display: none"><img src="img/loading.gif"></li><li class="wk_right wk_btn_txt">Save</li></ul></div><div id="wk_expand">&gt;</div><div id="wk_mask"><h1 class="wk_load">Loading...</h1></div><iframe id="wk_iframe" class="wk_fill" border="0"></iframe><div id="wk_news"><div style="float: left; width: 50%"><h3>This Page</h3></div><div style="float: right; width: 50%"><h3>Wikify Global</h3></div></div><div id="wk_help"><span class="wk_note">Move your mouse cursor over the toolbar items to see what they do.</span><div id="wk_tooltip">&nbsp;</div></div><div id="wk_about"><h3>About Project Wikify</h3><p>&copy; 2008-2009 Antimatter15. Please don\'t sue me.</p><p style="font-size: x-small">And no, you can\'t edit this message :P</p><button style="float: left" id="wk_credits">Credits</button><button style="float: right" id="wk_history">History</button></div><div id="wk_msg"><img src="img/info.png" alt="Alert" class="wk_alerticon"><img src="img/button_cancel.png" alt="Dismiss" title="Dismiss Message" class="wk_dismiss"><div id="wk_msgtext">None.</div></div>';



 /*wikify file: js/jquery.color.mini.js */ 

/*
 * jQuery Color Animations
 * Copyright 2007 John Resig
 * Released under the MIT and GPL licenses.
 */
 
 /*Adapted for project wikify*/

(function(jQuery){

	// We override the animation for all of these color styles
	jQuery.each(['backgroundColor', 'color'], function(i,attr){
		jQuery.fx.step[attr] = function(fx){
			if ( fx.state == 0 ) {
				fx.start = getRGB(jQuery.curCSS(fx.elem, attr));
				fx.end = getRGB( fx.end );
			}

			fx.elem.style[attr] = "rgb(" + [
				parseInt((fx.pos * (fx.end[0] - fx.start[0])) + fx.start[0]),
				parseInt((fx.pos * (fx.end[1] - fx.start[1])) + fx.start[1]),
				parseInt((fx.pos * (fx.end[2] - fx.start[2])) + fx.start[2])
			].join(",") + ")";
		}
	});

	// Color Conversion functions from highlightFade
	// By Blair Mitchelmore
	// http://jquery.offput.ca/highlightFade/

	// Parse strings looking for color tuples [255,255,255]
	function getRGB(color) {
		var result;
		
		if ( color && color.constructor == Array && color.length == 3 )
			return color;
			
	  // Look for rgb(num,num,num)
		if (result = /rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/.exec(color))
			return [parseInt(result[1]), parseInt(result[2]), parseInt(result[3])];

		// Look for #a0b1c2
		if (result = /#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})/.exec(color))
			return [parseInt(result[1],16), parseInt(result[2],16), parseInt(result[3],16)];
    
	}
})(jQuery);



 /*wikify file: js/jquery.designmode.js */ 

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



 /*wikify file: js/editor.js */ 

function wk_enable_edit(){
  $('#wk_iframe').data('hasEdit', true)
  wk_doc = $("#wk_iframe").contentDocument();
  
  if($.browser.mozilla || $.browser.safari){
      $("#wk_iframe").designMode('on');
      $("#wk_iframe").execCommand("useCSS",true);
      
    if($.browser.mozilla){
      wk_mozeditfix();
    }
    $('#wk_iframe').data('useDesignMode', true)
  }else{
    wk_doc.body.contentEditable = true;
  }
  
  wk_keyboard();
  
  wk_autosnapshot();
  $("#wk_iframe").one("load",function(){
    wk_autosnapshot()
  })
  //return editor;
}

function wk_keyboard(){
  if(!$('#wk_iframe').data('wkhd')){
    $(wk_doc.documentElement).keypress(function(e){
      if(wk_mode < 2){
        wk_showmsg("If you want to edit the page, first enter Edit mode.")
      }
      if(e.ctrlKey && e.charCode == 115 /*Ctrl+S*/ && wk_mode == 2){
        e.preventDefault();
        $(".wk_btn_save").click();
      }
    })
    $('#wk_iframe').data('wkhd',true)
  }
}

function wk_html_edit(){
  if(!$('#wk_iframe').data('inshtl')){
    $(wk_doc.documentElement).keypress(function(e){
      if(e.ctrlKey && e.charCode == 104){
        e.preventDefault();
        $("#wk_iframe").execCommand("inserthtml",prompt("Enter HTML to insert:"))
      }
    })
  }
  $('#wk_iframe').data('inshtl', true)
}


function wk_disable_edit(){
  if($("#wk_iframe").data("hasEdit") == true){
    if(!$('#wk_iframe').data('useDesignMode')){
      wk_doc.body.contentEditable = false;
    }else{
      $("#wk_iframe").designMode('off')
    }
  }
}


function wk_mozeditfix(){
  if(!$('#wk_iframe').data('hasEvent')){
    $(wk_doc.documentElement).keypress(function(e){
      var key = String.fromCharCode(e.charCode).toLowerCase();
      if("biu".indexOf(key) != -1 && e.ctrlKey){
        $("#wk_iframe").execCommand(({
          b: "bold",
          i: "italic",
          u: "underline"
        })[key], null);
        e.preventDefault();
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



 /*wikify file: js/mode.js */ 

function wk_original(){
    $(".wk_btn_save").fadeOut()
    wk_mode = 0;
    wk_write_original();
    setTimeout(function(){
      wk_disable_edit();
      wk_patch_links();
      wk_mask(false)
      $("#wk_premask").slideUp('slow');
    },200)
}

function wk_view(){
    $(".wk_btn_save").fadeOut()
    wk_mode = 1
    wk_write_original();
    setTimeout(function(){
      wk_disable_edit()
      wk_load(function(){
            wk_mask(false)
            wk_patch_links()
            $("#wk_premask").slideUp('slow');
      });
    },200)
}

function wk_edit(){
    $(".wk_btn_save").fadeIn()
    wk_mode = 2
    wk_write_original();
    setTimeout(function(){
      wk_load(function(){
            $(".wk_btn_save").fadeIn();
            wk_enable_edit();
            wk_mask(false)
            $("#wk_premask").slideUp('slow');
      });
    },200)
}


function wk_setmode(mode){
  wk_mode = mode;
  wk_remode();
}

function wk_remode(){
  $([".wk_btn_original",".wk_btn_view",".wk_btn_edit"][wk_mode]).click(); //woot!
}

wk_ready(function(){
  $(".wk_mode").click(function(){
    $(".wk_mode").animate({color: "#858585"})
    wk_mask(true)
    $(this).animate({color: "#ffffff"});
  })
  
  /*mode buttons*/
  $(".wk_btn_original").click(wk_original)
  $(".wk_btn_view").click(wk_view)
  $(".wk_btn_edit").click(wk_edit)  
})



 /*wikify file: js/button.js */ 

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
    wk_hideabout()
    $("#wk_help").slideUp().queue(function(){
      $("#wk_news").slideToggle();
      $(this).dequeue();
    })
  })

  $(".wk_btn_help").click(function(){
    $("#wk_news").slideUp().queue(function(){
      if($("#wk_help").css("display") == "none"){
          $("#wk_about").css("top", -$("#wk_about").height());
          $("#wk_about").css("left", ($(window).width()/2) - ($("#wk_about").width()/2));
          $("#wk_about").css("display", "block");
          $("#wk_about").css("opacity", 0.8)
          $(window).trigger("resize")
          setTimeout(function(){
            $(".wk_btn_help").trigger("mouseover")
          },100)
      }else{
        wk_hideabout()
      }
      $("#wk_help").slideToggle();
      $(this).dequeue();
    })
  })

  $("#wk_channel_visible").click(function(){
    $(".wk_down").slideToggle();
    $("#wk_news").slideUp()
    $("#wk_help").slideUp()
    wk_hideabout()
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



 /*wikify file: js/ui.js */ 

function wk_collapse(){
  $("#wk_news").slideUp()
  $("#wk_help").slideUp()
  $(".wk_down").slideUp();
  wk_hideabout()
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
  if($(window).width() < 500){
    $(".wk_btn_original").text("Org")
    $(".wk_btn_view").text("Viw")
    $(".wk_btn_edit").text("Edt")
  }else{ 
    $(".wk_btn_original").text("Original")
    $(".wk_btn_view").text("View")
    $(".wk_btn_edit").text("Edit")    
  }
  if($(window).width() < 800){
    wk_mini = true;
    wk_render_channels()
    $("#wk_help").css("height","55px")
    $("li.wk_space").hide("slow")
    $(".wk_btn_txt").hide("slow")
    $("#wk_logo").stop(true).animate({
      width: 32
    });
  }else{
    wk_mini = false;
    $("li.wk_space").show("slow")
    $("#wk_help").css("height","")
    wk_render_channels()
    $(".wk_btn_txt").show("slow")
    $("#wk_logo").stop(true).animate({
      width: 190
    });
  }
  $("#wk_about").stop(true).animate({
    top: ($(window).height()/2) - ($("#wk_about").height()/2),
    left: ($(window).width()/2) - ($("#wk_about").width()/2)
  });
  if($(".wk_fill").css("top") == "30px"){
    $(".wk_fill").height($(window).height()-30)
  }else{
    $(".wk_fill").height($(window).height())
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
    wk_hideabout()
    
  }else{
    $("#wk_mask").slideUp()
  }
}

wk_ready(function(){
  $("#wk_logo").click(wk_collapse)
  $("#wk_expand").click(wk_expand)
  $(window).resize(wk_resize);
  setTimeout(wk_resize, 100);
  wk_resize();
})



 /*wikify file: js/help.js */ 

wk_ready(function(){
  var areas = {
    "#wk_logo": [1,"Click on this logo to minimize the toolbar"],
    "#wk_channel_visible": [2,"Switch Wikify channels."],
    ".wk_btn_original": [3,"View the original], unmodified page"],
    ".wk_btn_view": [4,"View the page], with the Wikify changes"],
    ".wk_btn_edit": [5,"Edit the page like a word processor"],
    ".wk_btn_save": [6,"Save your edits to the server"],
    ".wk_btn_help": [7,"Gets you here! (Awesome Help)"],
    ".wk_btn_news": [8,"Find the latest Wikify edits"]
  }
  
  $.each(areas,function(key, value){
    $(key).mouseover(function(){
      if($("#wk_help").css("display") != "none"){
        if($("#wk_tooltip").data("hst")) $("#wk_tooltip").data("hst").push(value[0]);        
        $("#wk_tooltip")
          .stop(true)
          .animate({
            marginLeft: ($(key).offset().left+$(key).width()+50)>$(document).width()?
                        $(key).offset().left-75:
                        $(key).offset().left
          },"fast","swing")
          .queue(function(){
            $(this).text(value[1])
            $(this).dequeue();
          })
        }else{
          if($("#wk_tooltip").data("hst")){
            var c = "7,3,3,1";
            c = $("#wk_tooltip").data("hst").reverse().join(",").indexOf(c);
            if(c != -1 && c < 5 && wk_mode == 2){
              wk_html_edit();
            }
          }
          $("#wk_tooltip").data("hst",[])
        }
    })
  })
})

function wk_hideabout(){
  $("#wk_about").animate({top: -$("#wk_about").height()})
    .queue(function(){
      $(this).css("display", "none")
      $(this).dequeue()
    })
}



 /*wikify file: js/channel.js */ 

function wk_set_channel(channel){
  wk_channel = channel;
  if(!wk_channels[wk_channel]){
    wk_channels[wk_channel] = {edits: 0};
  }
  $([".wk_btn_original",".wk_btn_view",".wk_btn_edit"][wk_mode]).click()
  wk_get_channels()
  
  if(wk_mode == 0){
    wk_showmsg("To see the contents of a channel, first go to either the View or Edit mode.")
    //wk_setmode(1); //view, or should it be edit?
  }
}

function wk_render_channels(){
  $("#wk_channel_text").text(wk_mini?wk_channel:(wk_channel+" ("+wk_channels[wk_channel].edits+")"));
  $(".wk_chan").remove();
  for(var i in wk_channels){
    //if(i != wk_channel){
      $("<li></li>")
      .text(i+" ("+wk_channels[i].edits+")")
      .addClass("wk_chan")
      .data("chan",i)
      .insertBefore(".wk_custom")
    //}
  }
  
  
  $(".wk_chan").click(function(){
    $(".wk_down").slideUp();
    wk_set_channel($(this).data("chan"))
  })
}


function wk_get_channels(callback){
  wk_get_data(wk_server, {url: wk_url, action: "channel"}, function(e){
    wk_log("Got Channel Data", e)
    for(var x in e.channels){
      wk_channels[x] = e.channels[x]
    }
    wk_render_channels();
  })
}



 /*wikify file: js/data.js */ 

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
      wk_parse(edits);
      wk_log("Loaded Data: ",data)
      if(callback) callback();
    })
}

function wk_upgrade(data){
  if(unescape(data).indexOf("</,/>") != -1 &&
     unescape(data).indexOf("[[]]") != -1 &&
     unescape(data).indexOf("[::]") == -1){
       data = unescape(data)
           .split("</,/>").join(">>")
           .split("<!!!>").join("[++]")
           .split("[[]]").join("[::]")
           .split("_xdby").join("_body")
           .split(">>[::]").join("[::]")
  }
  return data
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



 /*wikify file: js/communication.js */ 

/*
saveurl:"http://wikify.antimatter15.com/server/save",
loadurl:"http://wikify.antimatter15.com/server/load",
*/


function wk_send_data(url, params, callback){
  var id = "wk_xfnx"+Math.floor(Math.random()*12345)
  var div = document.createElement("div");
  var form = document.createElement("form");

  document.body.appendChild(div);  
  
  window['fn'+id] = function(){
    callback();
    try{
      window['fn'+id] = null;
      delete window['fn'+id];
    }catch(err){}
    setTimeout(function(){
      if(div.parentNode){
        div.parentNode.removeChild(div);
      }
    }, 50000)
  };
  
  div.style.display = "none";
  
  div.innerHTML = "<iframe id=\""+id+"\" name=\""+id+"\" onload=\"window['fn"+id+"']()\"></iframe>"
  
  form.target = id;
  form.action = url;
  form.method = "POST";
  
  div.appendChild(form);  
  
  for(var key in params){
    var input = document.createElement("input"); //create new input
    input.type = "hidden"; //it's hidden! SSH!!!!
    input.name = key; //set name
    input.value = params[key]; //set value
    form.appendChild(input);
  }
  
  form.submit();
}


function wk_get_data(url, params, callback){
  if(window.location.href.indexOf("about:") != 0){
    $.get(url, params, callback, "jsonp"); //thx jQuery!
  }else{
    /*The following code is for about:blank*/
    var s = document.createElement("script"),
        c = "jsonp_"+Math.floor(999*Math.random()),
        h = document.getElementsByTagName("head")[0];
    s.type = "text/javascript";
    s.src = url + "?" + $.param(params) + "&callback=" + c;
    window[c] = callback;
    (h?h:document.body).appendChild(s)
  }
}



 /*wikify file: js/dom.js */ 

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



 /*wikify file: js/message.js */ 

var wk_curmsgid = -1;

function wk_hidemsg(){
  $("#wk_msg").stop(true).animate({
    left: "-100%"
  })
}

function wk_showmsg(message){
  $("#wk_msgtext").text(message)
  $("#wk_msg").stop(true).animate({
    left: "0%"
  });
  var msgid = Math.floor(Math.random()*999999999); //bignumber!
  wk_curmsgid = msgid;
  setTimeout(function(){
    if(wk_curmsgid == msgid){
      wk_hidemsg()
    }
  }, 5000)
}


wk_ready(function(){
  $(".wk_dismiss").click(function(){
    wk_hidemsg();
  })
})



 /*wikify file: js/init.js */ 

wk_coreinit = function(){
  if(!jQuery || !$ ||!jQuery() || !$() || !$().jquery){
    return alert("Project Wikify has encountered a fatal error\n(JS Loader failed initializing dependencies)")
  }
  if(!$("head")[0] || !jQuery("<div>Something_Very_Strange</div>").html()){
    var blank = '<html><head><title></title></head><body></body></html>';
    document.open()
    document.write(blank);
    document.close();
  }

  
  if(!$("html")[0] || !$("body")[0] || !("head")[0]){
    return alert("Project Wikify has encountered a fatal error\n(Missing Required Document Elements)")
  }
  
  if(wk_removescripts){
    //$("script").remove(); //remove all scripts (strangely doesn't work on ajaxian)
    $(document.getElementsByTagName("script")).remove()
  }else{
    $("script.wk_initsc").remove(); //remove the loader scripts
  }
  
  $("#wk_premask").remove();
  wk_original_data = document.documentElement.innerHTML;
  

  for(var s=document.styleSheets, i=s.length;i--;){ //loop through styles
    s[i].disabled = true; //and kill them
  }
 
  document.body.innerHTML = wk_toolbar.split("img/").join(wk_img)

  var m = document.createElement("div");
  m.id = "wk_premask";
  m.setAttribute("style","font-family:Tahoma,Verdana,'Trebuchet MS',Arial,Helvetica,sans-serif;color:#000;background-color:#8095AA;position:absolute;width:100%;height:100%;top:0;left:0;font-size:100px;z-index:51000;text-align:center")
  m.innerHTML="Loading..." 
  document.body.appendChild(m);
  

  $('<link rel="stylesheet" type="text/css" media="screen">') //add the styles
    .attr("href", wk_style)
    .appendTo("head");

  if(!$("#wk_iframe")[0] || !$("#wk_toolbar")[0]){
    return alert("Project Wikify has encountered a fatal error\n(Missing Generated Elements)")
  }

  for(var i = 0; i < wk_readyqueue.length; i++){
    wk_readyqueue[i](); //run readyqueue
  }
  if(document.title == ""){
    document.title = "Wikify: Untitled";
  }else{
    document.title = "Wikify: "+document.title
  }
  wk_get_channels() //load channels
  wk_remode();


}

wk_coreinit();



