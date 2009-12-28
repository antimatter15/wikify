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



 /*wikify file: js/misc.js */ 

/*I just feel like blaming this whole file on microsoft*/

if(window.jQuery && window.console && !(jQuery.browser.msie && $.browser.version == 6)){
  try{
    console.log();
    console.log("Loading Wikify")
  }catch(err){}
}

function wk_log(){
  if(window.jQuery && window.console && !(jQuery.browser.msie && jQuery.browser.version == 6)){
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


wk_ready(function($){ //dumbie!
  if($.browser.msie){
    $.getScript("http://wikify.googlecode.com/svn-history/r161/trunk/v2/js/jquery.pngFix.js",
      function(){
        $(".wk_arrow img").attr("src",$(".wk_arrow img").attr("src").replace(/\.png/g,".gif"))
         $('#wk_logo').pngFix();
         $('.wk_btn').pngFix();
      })
  }
})





 /*wikify file: js/toolbar.js */ 

var wk_toolbar = '<div id="wk_toolbar"><ul><li class="wk_logo" id="wk_logo"><img src="img/wikify.png" alt="Project Wikify (beta)" title="Collapse Toolbar"></li><li class="wk_space">&nbsp;</li><li id="wk_channel"><ul class="wk_down"><li class="wk_custom">Custom</li></ul><ul id="wk_channel_visible"><li id="wk_channel_text" title="Change Channel">Loading...</li><li class="wk_arrow"><img src="img/down.png" style="padding-top: 5px;"></li></ul></li><li class="wk_space">&nbsp;</li><li class="wk_btn wk_mode wk_btn_original" title="Original">Original</li><li class="wk_btn wk_mode wk_btn_view" title="View">View</li><li class="wk_btn wk_mode wk_btn_edit" title="Edit">Edit</li></ul><ul style="float: right" class="wk_btn wk_btn_news" title="News"><li class="wk_right"><img src="img/package_editors.png"></li><li class="wk_right wk_btn_txt">News</li></ul><ul style="float: right" class="wk_btn wk_btn_help" title="Help"><li class="wk_right"><img src="img/info.png"></li><li class="wk_right wk_btn_txt">Help</li></ul><ul style="float: right" class="wk_btn wk_btn_save" title="Save"><li id="wk_save" class="wk_right"><img src="img/3floppy_unmount.png"></li><li id="wk_saving" class="wk_right" style="display: none"><img src="img/loading.gif"></li><li class="wk_right wk_btn_txt">Save</li></ul></div><div id="wk_expand">&gt;</div><div id="wk_mask"><h1 class="wk_load">Loading...</h1></div><iframe id="wk_iframe" class="wk_fill" border="0"></iframe><div id="wk_news"><div style="float: left; width: 50%"><h3>Page Edits</h3><div id="local" style="overflow: auto; text-align: left;">Loading...</div></div><div style="float: right; width: 50%"><h3>All Edits</h3><div id="global" style="overflow: auto; text-align: left">Loading...</div></div></div><div id="wk_help"><span class="wk_note">Move your mouse cursor over the toolbar items to see what they do.</span><div id="wk_tooltip">&nbsp;</div></div><div id="wk_about"><h3>About Project Wikify</h3><p>&copy; 2008-2009 Antimatter15. Please don\'t sue me.</p><p style="font-size: x-small">And no, you can\'t edit this message :P</p><button id="wk_credits">Credits</button><button id="wk_history">History</button></div><div id="wk_msg"><img src="img/info.png" alt="Alert" class="wk_alerticon"><img src="img/button_cancel.png" alt="Dismiss" title="Dismiss Message" class="wk_dismiss"><div id="wk_msgtext">None.</div></div>';



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
 * Example: jQuery('#foo').contentDocument();
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
 * Example: jQuery('#foo').designMode('on');
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
		var frame = jQuery(this);
		var doc = frame.contentDocument();
		if (doc && doc.designMode != mode) {
		
			doc.designMode = mode;
			// Some browsers are kinda slow, so you'll have to wait for the window to load
			// commented, causes IE to give me a seizure!
			/*
			frame.load(function() {
				jQuery(this).contentDocument().designMode = mode;
			});
			*/
		}
	});
	return this;
}

/**
 * Cross-browser function to execute designMode commands
 * Example: jQuery('#foo').execCommand('formatblock', '<p>');
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
		var doc = jQuery(this).contentDocument();
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



 /*wikify file: js/diff_match_patch.js */ 

function diff_match_patch(){this.Diff_Timeout=1;this.Diff_EditCost=4;this.Diff_DualThreshold=32;this.Match_Balance=0.5;this.Match_Threshold=0.5;this.Match_MinLength=100;this.Match_MaxLength=1000;this.Patch_Margin=4;function A(){var D=0;var B=1;var C=2;while(B!=C){D++;B=C;C=C<<1}return D}this.Match_MaxBits=A()}var DIFF_DELETE=-1;var DIFF_INSERT=1;var DIFF_EQUAL=0;diff_match_patch.prototype.diff_main=function(G,F,D){if(G==F){return[[DIFF_EQUAL,G]]}if(typeof D=="undefined"){D=true}var E=D;var A=this.diff_commonPrefix(G,F);var B=G.substring(0,A);G=G.substring(A);F=F.substring(A);A=this.diff_commonSuffix(G,F);var C=G.substring(G.length-A);G=G.substring(0,G.length-A);F=F.substring(0,F.length-A);var H=this.diff_compute(G,F,E);if(B){H.unshift([DIFF_EQUAL,B])}if(C){H.push([DIFF_EQUAL,C])}this.diff_cleanupMerge(H);return H};diff_match_patch.prototype.diff_compute=function(K,I,G){var A;if(!K){return[[DIFF_INSERT,I]]}if(!I){return[[DIFF_DELETE,K]]}var H=K.length>I.length?K:I;var O=K.length>I.length?I:K;var R=H.indexOf(O);if(R!=-1){A=[[DIFF_INSERT,H.substring(0,R)],[DIFF_EQUAL,O],[DIFF_INSERT,H.substring(R+O.length)]];if(K.length>I.length){A[0][0]=A[2][0]=DIFF_DELETE}return A}H=O=null;var C=this.diff_halfMatch(K,I);if(C){var N=C[0];var M=C[1];var E=C[2];var B=C[3];var W=C[4];var V=this.diff_main(N,E,G);var T=this.diff_main(M,B,G);return V.concat([[DIFF_EQUAL,W]],T)}if(G&&(K.length<100||I.length<100)){G=false}var J;if(G){var U=this.diff_linesToChars(K,I);K=U[0];I=U[1];J=U[2]}A=this.diff_map(K,I);if(!A){A=[[DIFF_DELETE,K],[DIFF_INSERT,I]]}if(G){this.diff_charsToLines(A,J);this.diff_cleanupSemantic(A);A.push([DIFF_EQUAL,""]);var P=0;var F=0;var L=0;var S="";var D="";while(P<A.length){switch(A[P][0]){case DIFF_INSERT:L++;D+=A[P][1];break;case DIFF_DELETE:F++;S+=A[P][1];break;case DIFF_EQUAL:if(F>=1&&L>=1){var U=this.diff_main(S,D,false);A.splice(P-F-L,F+L);P=P-F-L;for(var Q=U.length-1;Q>=0;Q--){A.splice(P,0,U[Q])}P=P+U.length}L=0;F=0;S="";D="";break}P++}A.pop()}return A};diff_match_patch.prototype.diff_linesToChars=function(G,F){var E=[];var A={};E[0]="";function B(M){var K="";var I=0;var L=-1;var J=E.length;while(L<M.length-1){L=M.indexOf("\n",I);if(L==-1){L=M.length-1}var H=M.substring(I,L+1);I=L+1;if(A.hasOwnProperty?A.hasOwnProperty(H):(A[H]!==undefined)){K+=String.fromCharCode(A[H])}else{K+=String.fromCharCode(J);A[H]=J;E[J++]=H}}return K}var D=B(G);var C=B(F);return[D,C,E]};diff_match_patch.prototype.diff_charsToLines=function(E,B){for(var A=0;A<E.length;A++){var C=E[A][1];var D=[];for(var F=0;F<C.length;F++){D[F]=B[C.charCodeAt(F)]}E[A][1]=D.join("")}};diff_match_patch.prototype.diff_map=function(J,H){var N=(new Date()).getTime()+this.Diff_Timeout*1000;var E=J.length+H.length-1;var M=this.Diff_DualThreshold*2<E;var C=[];var A=[];var D={};var B={};D[1]=0;B[1]=0;var I,G;var P;var Q={};var L=false;var K=!!(Q.hasOwnProperty);var F=(J.length+H.length)%2;for(var R=0;R<E;R++){if(this.Diff_Timeout>0&&(new Date()).getTime()>N){return null}C[R]={};for(var O=-R;O<=R;O+=2){if(O==-R||O!=R&&D[O-1]<D[O+1]){I=D[O+1]}else{I=D[O-1]+1}G=I-O;if(M){P=I+","+G;if(F&&(K?Q.hasOwnProperty(P):(Q[P]!==undefined))){L=true}if(!F){Q[P]=R}}while(!L&&I<J.length&&G<H.length&&J.charAt(I)==H.charAt(G)){I++;G++;if(M){P=I+","+G;if(F&&(K?Q.hasOwnProperty(P):(Q[P]!==undefined))){L=true}if(!F){Q[P]=R}}}D[O]=I;C[R][I+","+G]=true;if(I==J.length&&G==H.length){return this.diff_path1(C,J,H)}else{if(L){A=A.slice(0,Q[P]+1);var S=this.diff_path1(C,J.substring(0,I),H.substring(0,G));return S.concat(this.diff_path2(A,J.substring(I),H.substring(G)))}}}if(M){A[R]={};for(var O=-R;O<=R;O+=2){if(O==-R||O!=R&&B[O-1]<B[O+1]){I=B[O+1]}else{I=B[O-1]+1}G=I-O;P=(J.length-I)+","+(H.length-G);if(!F&&(K?Q.hasOwnProperty(P):(Q[P]!==undefined))){L=true}if(F){Q[P]=R}while(!L&&I<J.length&&G<H.length&&J.charAt(J.length-I-1)==H.charAt(H.length-G-1)){I++;G++;P=(J.length-I)+","+(H.length-G);if(!F&&(K?Q.hasOwnProperty(P):(Q[P]!==undefined))){L=true}if(F){Q[P]=R}}B[O]=I;A[R][I+","+G]=true;if(L){C=C.slice(0,Q[P]+1);var S=this.diff_path1(C,J.substring(0,J.length-I),H.substring(0,H.length-G));return S.concat(this.diff_path2(A,J.substring(J.length-I),H.substring(H.length-G)))}}}}return null};diff_match_patch.prototype.diff_path1=function(B,E,D){var F=[];var A=E.length;var H=D.length;var C=null;for(var G=B.length-2;G>=0;G--){while(1){if(B[G].hasOwnProperty?B[G].hasOwnProperty((A-1)+","+H):(B[G][(A-1)+","+H]!==undefined)){A--;if(C===DIFF_DELETE){F[0][1]=E.charAt(A)+F[0][1]}else{F.unshift([DIFF_DELETE,E.charAt(A)])}C=DIFF_DELETE;break}else{if(B[G].hasOwnProperty?B[G].hasOwnProperty(A+","+(H-1)):(B[G][A+","+(H-1)]!==undefined)){H--;if(C===DIFF_INSERT){F[0][1]=D.charAt(H)+F[0][1]}else{F.unshift([DIFF_INSERT,D.charAt(H)])}C=DIFF_INSERT;break}else{A--;H--;if(C===DIFF_EQUAL){F[0][1]=E.charAt(A)+F[0][1]}else{F.unshift([DIFF_EQUAL,E.charAt(A)])}C=DIFF_EQUAL}}}}return F};diff_match_patch.prototype.diff_path2=function(A,D,B){var I=[];var H=0;var G=D.length;var F=B.length;var C=null;for(var E=A.length-2;E>=0;E--){while(1){if(A[E].hasOwnProperty?A[E].hasOwnProperty((G-1)+","+F):(A[E][(G-1)+","+F]!==undefined)){G--;if(C===DIFF_DELETE){I[H-1][1]+=D.charAt(D.length-G-1)}else{I[H++]=[DIFF_DELETE,D.charAt(D.length-G-1)]}C=DIFF_DELETE;break}else{if(A[E].hasOwnProperty?A[E].hasOwnProperty(G+","+(F-1)):(A[E][G+","+(F-1)]!==undefined)){F--;if(C===DIFF_INSERT){I[H-1][1]+=B.charAt(B.length-F-1)}else{I[H++]=[DIFF_INSERT,B.charAt(B.length-F-1)]}C=DIFF_INSERT;break}else{G--;F--;if(C===DIFF_EQUAL){I[H-1][1]+=D.charAt(D.length-G-1)}else{I[H++]=[DIFF_EQUAL,D.charAt(D.length-G-1)]}C=DIFF_EQUAL}}}}return I};diff_match_patch.prototype.diff_commonPrefix=function(E,D){if(!E||!D||E.charCodeAt(0)!==D.charCodeAt(0)){return 0}var B=0;var F=Math.min(E.length,D.length);var A=F;var C=0;while(B<A){if(E.substring(C,A)==D.substring(C,A)){B=A;C=B}else{F=A}A=Math.floor((F-B)/2+B)}return A};diff_match_patch.prototype.diff_commonSuffix=function(D,C){if(!D||!C||D.charCodeAt(D.length-1)!==C.charCodeAt(C.length-1)){return 0}var B=0;var E=Math.min(D.length,C.length);var A=E;var F=0;while(B<A){if(D.substring(D.length-A,D.length-F)==C.substring(C.length-A,C.length-F)){B=A;F=B}else{E=A}A=Math.floor((E-B)/2+B)}return A};diff_match_patch.prototype.diff_halfMatch=function(C,B){var K=C.length>B.length?C:B;var D=C.length>B.length?B:C;if(K.length<10||D.length<1){return null}var N=this;function I(V,O,R){var T=V.substring(R,R+Math.floor(V.length/4));var P=-1;var Z="";var S,Q,Y,X;while((P=O.indexOf(T,P+1))!=-1){var U=N.diff_commonPrefix(V.substring(R),O.substring(P));var W=N.diff_commonSuffix(V.substring(0,R),O.substring(0,P));if(Z.length<W+U){Z=O.substring(P-W,P)+O.substring(P,P+U);S=V.substring(0,R-W);Q=V.substring(R+U);Y=O.substring(0,P-W);X=O.substring(P+U)}}if(Z.length>=V.length/2){return[S,Q,Y,X,Z]}else{return null}}var G=I(K,D,Math.ceil(K.length/4));var F=I(K,D,Math.ceil(K.length/2));var A;if(!G&&!F){return null}else{if(!F){A=G}else{if(!G){A=F}else{A=G[4].length>F[4].length?G:F}}}var J,H,M,L;if(C.length>B.length){J=A[0];H=A[1];M=A[2];L=A[3]}else{M=A[0];L=A[1];J=A[2];H=A[3]}var E=A[4];return[J,H,M,L,E]};diff_match_patch.prototype.diff_cleanupSemantic=function(H){var D=false;var A=[];var F=0;var E=null;var G=0;var C=0;var B=0;while(G<H.length){if(H[G][0]==DIFF_EQUAL){A[F++]=G;C=B;B=0;E=H[G][1]}else{B+=H[G][1].length;if(E!==null&&(E.length<=C)&&(E.length<=B)){H.splice(A[F-1],0,[DIFF_DELETE,E]);H[A[F-1]+1][0]=DIFF_INSERT;F--;F--;G=F>0?A[F-1]:-1;C=0;B=0;E=null;D=true}}G++}if(D){this.diff_cleanupMerge(H)}this.diff_cleanupSemanticLossless(H)};diff_match_patch.prototype.diff_cleanupSemanticLossless=function(B){var E=/[^a-zA-Z0-9]/;var Q=/\s/;var D=/[\r\n]/;var J=/\n\r?\n$/;var A=/^\r?\n\r?\n/;function F(T,S){if(!T||!S){return 5}var U=0;if(T.charAt(T.length-1).match(E)||S.charAt(0).match(E)){U++;if(T.charAt(T.length-1).match(Q)||S.charAt(0).match(Q)){U++;if(T.charAt(T.length-1).match(D)||S.charAt(0).match(D)){U++;if(T.match(J)||S.match(A)){U++}}}}return U}var N=1;while(N<B.length-1){if(B[N-1][0]==DIFF_EQUAL&&B[N+1][0]==DIFF_EQUAL){var H=B[N-1][1];var L=B[N][1];var G=B[N+1][1];var R=this.diff_commonSuffix(H,L);if(R){var C=L.substring(L.length-R);H=H.substring(0,H.length-R);L=C+L.substring(0,L.length-R);G=C+G}var O=H;var K=L;var M=G;var I=F(H,L)+F(L,G);while(L.charAt(0)===G.charAt(0)){H+=L.charAt(0);L=L.substring(1)+G.charAt(0);G=G.substring(1);var P=F(H,L)+F(L,G);if(P>=I){I=P;O=H;K=L;M=G}}if(B[N-1][1]!=O){if(O){B[N-1][1]=O}else{B.splice(N-1,1);N--}B[N][1]=K;if(M){B[N+1][1]=M}else{B.splice(N+1,1);N--}}}N++}};diff_match_patch.prototype.diff_cleanupEfficiency=function(G){var I=false;var F=[];var C=0;var D="";var A=0;var H=false;var J=false;var B=false;var E=false;while(A<G.length){if(G[A][0]==DIFF_EQUAL){if(G[A][1].length<this.Diff_EditCost&&(B||E)){F[C++]=A;H=B;J=E;D=G[A][1]}else{C=0;D=""}B=E=false}else{if(G[A][0]==DIFF_DELETE){E=true}else{B=true}if(D&&((H&&J&&B&&E)||((D.length<this.Diff_EditCost/2)&&(H+J+B+E)==3))){G.splice(F[C-1],0,[DIFF_DELETE,D]);G[F[C-1]+1][0]=DIFF_INSERT;C--;D="";if(H&&J){B=E=true;C=0}else{C--;A=C>0?F[C-1]:-1;B=E=false}I=true}}A++}if(I){this.diff_cleanupMerge(G)}};diff_match_patch.prototype.diff_cleanupMerge=function(H){H.push([DIFF_EQUAL,""]);var G=0;var F=0;var E=0;var C="";var B="";var A;while(G<H.length){switch(H[G][0]){case DIFF_INSERT:E++;B+=H[G][1];G++;break;case DIFF_DELETE:F++;C+=H[G][1];G++;break;case DIFF_EQUAL:if(F!==0||E!==0){if(F!==0&&E!==0){A=this.diff_commonPrefix(B,C);if(A!==0){if((G-F-E)>0&&H[G-F-E-1][0]==DIFF_EQUAL){H[G-F-E-1][1]+=B.substring(0,A)}else{H.splice(0,0,[DIFF_EQUAL,B.substring(0,A)]);G++}B=B.substring(A);C=C.substring(A)}A=this.diff_commonSuffix(B,C);if(A!==0){H[G][1]=B.substring(B.length-A)+H[G][1];B=B.substring(0,B.length-A);C=C.substring(0,C.length-A)}}if(F===0){H.splice(G-F-E,F+E,[DIFF_INSERT,B])}else{if(E===0){H.splice(G-F-E,F+E,[DIFF_DELETE,C])}else{H.splice(G-F-E,F+E,[DIFF_DELETE,C],[DIFF_INSERT,B])}}G=G-F-E+(F?1:0)+(E?1:0)+1}else{if(G!==0&&H[G-1][0]==DIFF_EQUAL){H[G-1][1]+=H[G][1];H.splice(G,1)}else{G++}}E=0;F=0;C="";B="";break}}if(H[H.length-1][1]===""){H.pop()}var D=false;G=1;while(G<H.length-1){if(H[G-1][0]==DIFF_EQUAL&&H[G+1][0]==DIFF_EQUAL){if(H[G][1].substring(H[G][1].length-H[G-1][1].length)==H[G-1][1]){H[G][1]=H[G-1][1]+H[G][1].substring(0,H[G][1].length-H[G-1][1].length);H[G+1][1]=H[G-1][1]+H[G+1][1];H.splice(G-1,1);D=true}else{if(H[G][1].substring(0,H[G+1][1].length)==H[G+1][1]){H[G-1][1]+=H[G+1][1];H[G][1]=H[G][1].substring(H[G+1][1].length)+H[G+1][1];H.splice(G+1,1);D=true}}}G++}if(D){this.diff_cleanupMerge(H)}};diff_match_patch.prototype.diff_xIndex=function(G,F){var D=0;var B=0;var E=0;var C=0;var A;for(A=0;A<G.length;A++){if(G[A][0]!==DIFF_INSERT){D+=G[A][1].length}if(G[A][0]!==DIFF_DELETE){B+=G[A][1].length}if(D>F){break}E=D;C=B}if(G.length!=A&&G[A][0]===DIFF_DELETE){return C}return C+(F-E)};diff_match_patch.prototype.diff_prettyHtml=function(F){var C=[];var B=0;for(var A=0;A<F.length;A++){var G=F[A][0];var D=F[A][1];var E=D.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/\n/g,"&para;<BR>");switch(G){case DIFF_INSERT:C[A]='<INS STYLE="background:#E6FFE6;" TITLE="i='+B+'">'+E+"</INS>";break;case DIFF_DELETE:C[A]='<DEL STYLE="background:#FFE6E6;" TITLE="i='+B+'">'+E+"</DEL>";break;case DIFF_EQUAL:C[A]='<SPAN TITLE="i='+B+'">'+E+"</SPAN>";break}if(G!==DIFF_DELETE){B+=D.length}}return C.join("")};diff_match_patch.prototype.diff_text1=function(C){var B=[];for(var A=0;A<C.length;A++){if(C[A][0]!==DIFF_INSERT){B[A]=C[A][1]}}return B.join("")};diff_match_patch.prototype.diff_text2=function(C){var B=[];for(var A=0;A<C.length;A++){if(C[A][0]!==DIFF_DELETE){B[A]=C[A][1]}}return B.join("")};diff_match_patch.prototype.diff_toDelta=function(C){var B=[];for(var A=0;A<C.length;A++){switch(C[A][0]){case DIFF_INSERT:B[A]="+"+encodeURI(C[A][1]);break;case DIFF_DELETE:B[A]="-"+C[A][1].length;break;case DIFF_EQUAL:B[A]="="+C[A][1].length;break}}return B.join("\t").replace(/\x00/g,"%00").replace(/%20/g," ")};diff_match_patch.prototype.diff_fromDelta=function(B,J){var F=[];var E=0;var A=0;J=J.replace(/%00/g,"\0");var H=J.split(/\t/g);for(var I=0;I<H.length;I++){var D=H[I].substring(1);switch(H[I].charAt(0)){case"+":try{F[E++]=[DIFF_INSERT,decodeURI(D)]}catch(G){throw new Error("Illegal escape in diff_fromDelta: "+D)}break;case"-":case"=":var C=parseInt(D,10);if(isNaN(C)||C<0){throw new Error("Invalid number in diff_fromDelta: "+D)}var K=B.substring(A,A+=C);if(H[I].charAt(0)=="="){F[E++]=[DIFF_EQUAL,K]}else{F[E++]=[DIFF_DELETE,K]}break;default:if(H[I]){throw new Error("Invalid diff operation in diff_fromDelta: "+H[I])}}}if(A!=B.length){throw new Error("Delta length ("+A+") does not equal source text length ("+B.length+").")}return F};diff_match_patch.prototype.match_main=function(C,A,B){B=Math.max(0,Math.min(B,C.length-A.length));if(C==A){return 0}else{if(C.length===0){return null}else{if(C.substring(B,B+A.length)==A){return B}else{return this.match_bitap(C,A,B)}}}};diff_match_patch.prototype.match_bitap=function(J,Q,H){if(Q.length>this.Match_MaxBits){throw new Error("Pattern too long for this browser.")}var K=this.match_alphabet(Q);var T=J.length;T=Math.max(T,this.Match_MinLength);T=Math.min(T,this.Match_MaxLength);var A=this;function B(V,U){var W=Math.abs(H-U);return(V/Q.length/A.Match_Balance)+(W/T/(1-A.Match_Balance))}var M=this.Match_Threshold;var C=J.indexOf(Q,H);if(C!=-1){M=Math.min(B(0,C),M)}C=J.lastIndexOf(Q,H+Q.length);if(C!=-1){M=Math.min(B(0,C),M)}var S=1<<(Q.length-1);C=null;var E,I;var F=Math.max(H+H,J.length);var G;for(var R=0;R<Q.length;R++){var N=Array(J.length);E=H;I=F;while(E<I){if(B(R,I)<M){E=I}else{F=I}I=Math.floor((F-E)/2+E)}F=I;var D=Math.max(0,H-(I-H)-1);var L=Math.min(J.length-1,Q.length+I);if(J.charAt(L)==Q.charAt(Q.length-1)){N[L]=(1<<(R+1))-1}else{N[L]=(1<<R)-1}for(var O=L-1;O>=D;O--){if(R===0){N[O]=((N[O+1]<<1)|1)&K[J.charAt(O)]}else{N[O]=((N[O+1]<<1)|1)&K[J.charAt(O)]|((G[O+1]<<1)|1)|((G[O]<<1)|1)|G[O+1]}if(N[O]&S){var P=B(R,O);if(P<=M){M=P;C=O;if(O>H){D=Math.max(0,H-(O-H))}else{break}}}}if(B(R+1,H)>M){break}G=N}return C};diff_match_patch.prototype.match_alphabet=function(C){var B={};for(var A=0;A<C.length;A++){B[C.charAt(A)]=0}for(var A=0;A<C.length;A++){B[C.charAt(A)]|=1<<(C.length-A-1)}return B};diff_match_patch.prototype.patch_addContext=function(F,E){var B=E.substring(F.start2,F.start2+F.length1);var D=0;while(E.indexOf(B)!=E.lastIndexOf(B)&&B.length<this.Match_MaxBits-this.Patch_Margin-this.Patch_Margin){D+=this.Patch_Margin;B=E.substring(F.start2-D,F.start2+F.length1+D)}D+=this.Patch_Margin;var A=E.substring(F.start2-D,F.start2);if(A!==""){F.diffs.unshift([DIFF_EQUAL,A])}var C=E.substring(F.start2+F.length1,F.start2+F.length1+D);if(C!==""){F.diffs.push([DIFF_EQUAL,C])}F.start1-=A.length;F.start2-=A.length;F.length1+=A.length+C.length;F.length2+=A.length+C.length};diff_match_patch.prototype.patch_make=function(N,B,O){var C,J;if(typeof N=="string"&&typeof B=="string"&&typeof O=="undefined"){C=N;J=this.diff_main(C,B,true);if(J.length>2){this.diff_cleanupSemantic(J);this.diff_cleanupEfficiency(J)}}else{if(typeof N=="object"&&typeof B=="undefined"&&typeof O=="undefined"){J=N;C=this.diff_text1(J)}else{if(typeof N=="string"&&typeof B=="object"&&typeof O=="undefined"){C=N;J=B}else{if(typeof N=="string"&&typeof B=="string"&&typeof O=="object"){C=N;J=O}else{throw new Error("Unknown call format to patch_make.")}}}}if(J.length===0){return[]}var A=[];var D=new patch_obj();var G=0;var I=0;var H=0;var F=C;var L=C;for(var M=0;M<J.length;M++){var E=J[M][0];var K=J[M][1];if(!G&&E!==DIFF_EQUAL){D.start1=I;D.start2=H}switch(E){case DIFF_INSERT:D.diffs[G++]=J[M];D.length2+=K.length;L=L.substring(0,H)+K+L.substring(H);break;case DIFF_DELETE:D.length1+=K.length;D.diffs[G++]=J[M];L=L.substring(0,H)+L.substring(H+K.length);break;case DIFF_EQUAL:if(K.length<=2*this.Patch_Margin&&G&&J.length!=M+1){D.diffs[G++]=J[M];D.length1+=K.length;D.length2+=K.length}else{if(K.length>=2*this.Patch_Margin){if(G){this.patch_addContext(D,F);A.push(D);D=new patch_obj();G=0;F=L}}}break}if(E!==DIFF_INSERT){I+=K.length}if(E!==DIFF_DELETE){H+=K.length}}if(G){this.patch_addContext(D,F);A.push(D)}return A};diff_match_patch.prototype.patch_apply=function(F,K){if(F.length==0){return[K,[]]}var P=[];for(var I=0;I<F.length;I++){var B=F[I];var L=new patch_obj();L.diffs=B.diffs.slice();L.start1=B.start1;L.start2=B.start2;L.length1=B.length1;L.length2=B.length2;P[I]=L}F=P;var R=this.patch_addPadding(F);K=R+K+R;this.patch_splitMax(F);var O=0;var N=[];for(var I=0;I<F.length;I++){var C=F[I].start2+O;var J=this.diff_text1(F[I].diffs);var M=this.match_main(K,J,C);if(M===null){N[I]=false}else{N[I]=true;O=M-C;var H=K.substring(M,M+J.length);if(J==H){K=K.substring(0,M)+this.diff_text2(F[I].diffs)+K.substring(M+J.length)}else{var A=this.diff_main(J,H,false);this.diff_cleanupSemanticLossless(A);var E=0;var D;for(var G=0;G<F[I].diffs.length;G++){var Q=F[I].diffs[G];if(Q[0]!==DIFF_EQUAL){D=this.diff_xIndex(A,E)}if(Q[0]===DIFF_INSERT){K=K.substring(0,M+D)+Q[1]+K.substring(M+D)}else{if(Q[0]===DIFF_DELETE){K=K.substring(0,M+D)+K.substring(M+this.diff_xIndex(A,E+Q[1].length))}}if(Q[0]!==DIFF_DELETE){E+=Q[1].length}}}}}K=K.substring(R.length,K.length-R.length);return[K,N]};diff_match_patch.prototype.patch_addPadding=function(C){var B="";for(var A=0;A<this.Patch_Margin;A++){B+=String.fromCharCode(A)}for(var A=0;A<C.length;A++){C[A].start1+=B.length;C[A].start2+=B.length}var F=C[0];var E=F.diffs;if(E.length==0||E[0][0]!=DIFF_EQUAL){E.unshift([DIFF_EQUAL,B]);F.start1-=B.length;F.start2-=B.length;F.length1+=B.length;F.length2+=B.length}else{if(B.length>E[0][1].length){var D=B.length-E[0][1].length;E[0][1]=B.substring(E[0][1].length)+E[0][1];F.start1-=D;F.start2-=D;F.length1+=D;F.length2+=D}}F=C[C.length-1];E=F.diffs;if(E.length==0||E[E.length-1][0]!=DIFF_EQUAL){E.push([DIFF_EQUAL,B]);F.length1+=B.length;F.length2+=B.length}else{if(B.length>E[E.length-1][1].length){var D=B.length-E[E.length-1][1].length;E[E.length-1][1]+=B.substring(0,D);F.length1+=D;F.length2+=D}}return B};diff_match_patch.prototype.patch_splitMax=function(A){for(var L=0;L<A.length;L++){if(A[L].length1>this.Match_MaxBits){var F=A[L];A.splice(L--,1);var I=this.Match_MaxBits;var C=F.start1;var B=F.start2;var G="";while(F.diffs.length!==0){var E=new patch_obj();var J=true;E.start1=C-G.length;E.start2=B-G.length;if(G!==""){E.length1=E.length2=G.length;E.diffs.push([DIFF_EQUAL,G])}while(F.diffs.length!==0&&E.length1<I-this.Patch_Margin){var H=F.diffs[0][0];var K=F.diffs[0][1];if(H===DIFF_INSERT){E.length2+=K.length;B+=K.length;E.diffs.push(F.diffs.shift());J=false}else{K=K.substring(0,I-E.length1-this.Patch_Margin);E.length1+=K.length;C+=K.length;if(H===DIFF_EQUAL){E.length2+=K.length;B+=K.length}else{J=false}E.diffs.push([H,K]);if(K==F.diffs[0][1]){F.diffs.shift()}else{F.diffs[0][1]=F.diffs[0][1].substring(K.length)}}}G=this.diff_text2(E.diffs);G=G.substring(G.length-this.Patch_Margin);var D=this.diff_text1(F.diffs).substring(0,this.Patch_Margin);if(D!==""){E.length1+=D.length;E.length2+=D.length;if(E.diffs.length!==0&&E.diffs[E.diffs.length-1][0]===DIFF_EQUAL){E.diffs[E.diffs.length-1][1]+=D}else{E.diffs.push([DIFF_EQUAL,D])}}if(!J){A.splice(++L,0,E)}}}}};diff_match_patch.prototype.patch_toText=function(B){var C=[];for(var A=0;A<B.length;A++){C[A]=B[A]}return C.join("")};diff_match_patch.prototype.patch_fromText=function(F){var A=[];if(!F){return A}F=F.replace(/%00/g,"\0");var G=F.split("\n");var H=0;while(H<G.length){var D=G[H].match(/^@@ -(\d+),?(\d*) \+(\d+),?(\d*) @@$/);if(!D){throw new Error("Invalid patch string: "+G[H])}var B=new patch_obj();A.push(B);B.start1=parseInt(D[1],10);if(D[2]===""){B.start1--;B.length1=1}else{if(D[2]=="0"){B.length1=0}else{B.start1--;B.length1=parseInt(D[2],10)}}B.start2=parseInt(D[3],10);if(D[4]===""){B.start2--;B.length2=1}else{if(D[4]=="0"){B.length2=0}else{B.start2--;B.length2=parseInt(D[4],10)}}H++;while(H<G.length){var C=G[H].charAt(0);try{var I=decodeURI(G[H].substring(1))}catch(E){throw new Error("Illegal escape in patch_fromText: "+I)}if(C=="-"){B.diffs.push([DIFF_DELETE,I])}else{if(C=="+"){B.diffs.push([DIFF_INSERT,I])}else{if(C==" "){B.diffs.push([DIFF_EQUAL,I])}else{if(C=="@"){break}else{if(C===""){}else{throw new Error('Invalid patch mode "'+C+'" in: '+I)}}}}}H++}}return A};function patch_obj(){this.diffs=[];this.start1=null;this.start2=null;this.length1=0;this.length2=0}patch_obj.prototype.toString=function(){var B,E;if(this.length1===0){B=this.start1+",0"}else{if(this.length1==1){B=this.start1+1}else{B=(this.start1+1)+","+this.length1}}if(this.length2===0){E=this.start2+",0"}else{if(this.length2==1){E=this.start2+1}else{E=(this.start2+1)+","+this.length2}}var C=["@@ -"+B+" +"+E+" @@\n"];var D;for(var A=0;A<this.diffs.length;A++){switch(this.diffs[A][0]){case DIFF_INSERT:D="+";break;case DIFF_DELETE:D="-";break;case DIFF_EQUAL:D=" ";break}C[A+1]=D+encodeURI(this.diffs[A][1])+"\n"}return C.join("").replace(/\x00/g,"%00").replace(/%20/g," ")};



 /*wikify file: js/editor.js */ 

function wk_enable_edit(){
  var $ = jQuery;
  
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
  var $ = jQuery;
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
var $ = jQuery;
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
var $ = jQuery;
  if($("#wk_iframe").data("hasEdit") == true){
    if(!$('#wk_iframe').data('useDesignMode')){
      wk_doc.body.contentEditable = false;
    }else{
      $("#wk_iframe").designMode('off')
    }
  }
}


function wk_mozeditfix(){
var $ = jQuery;
  if(!$('#wk_iframe').data('hasEvent')){
    $(wk_doc.documentElement).keypress(function(e){
      var key = String.fromCharCode(e.charCode).toLowerCase();
      if("biu".indexOf(key) != -1 && (e.ctrlKey || e.metaKey || e.altKey)){
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
	
  var $ = jQuery;
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
var $ = jQuery;
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
var $ = jQuery;
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
var $ = jQuery;
  $([".wk_btn_original",".wk_btn_view",".wk_btn_edit"][wk_mode]).click(); //woot!
}

wk_ready(function($){
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

wk_ready(function($){
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
     if($("#wk_news").is(":hidden")){
	
		wk_local()
		wk_global()

		} 
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
var $ = jQuery;
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
var $ = jQuery;
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
var $ = jQuery;
  if($(window).width() < 800){
    if($(window).width() < 500){
      wk_ui = 2;
      wk_render_channels();
      if($(window).width() < 370){
        $(".wk_btn_original").text("O")
        $(".wk_btn_view").text("V")
        $(".wk_btn_edit").text("E")
      }else{
        $(".wk_btn_original").text("Org")
        $(".wk_btn_view").text("Viw")
        $(".wk_btn_edit").text("Edt")
      }
    }else{
      $(".wk_btn_original").text("Original")
      $(".wk_btn_view").text("View")
      $(".wk_btn_edit").text("Edit")    
    }
    wk_ui = 1;
    if($(window).width() < 500){wk_ui = 2}
    if($(window).width() < 340){wk_ui = 3}
    wk_render_channels()
    $("#wk_help").css("height","55px")
    $("li.wk_space").hide("slow")
    $(".wk_btn_txt").hide("slow")
    $("#wk_logo").stop(true).animate({
      width: 32
    });
  }else{
    wk_ui = 0;
    $("li.wk_space").show("slow")
    $("#wk_help").css("height","")
    wk_render_channels()
    $(".wk_btn_txt").show("slow")
    $("#wk_logo").stop(true).animate({
      width: 190
    });
    $(".wk_btn_original").text("Original")
    $(".wk_btn_view").text("View")
    $(".wk_btn_edit").text("Edit")    
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
var $ = jQuery;
  if(mode == true){
    $("#wk_save").hide()
    $("#wk_saving").show();
  }else{
    $("#wk_saving").hide();
    $("#wk_save").show()
  }
}

function wk_mask(mode){
var $ = jQuery;
  if(mode == true){
    $("#wk_mask").slideDown()
    $("#wk_news").slideUp()
    $("#wk_help").slideUp()
    wk_hideabout()
    
  }else{
    $("#wk_mask").slideUp()
  }
}

wk_ready(function($){
  $("#wk_logo").click(wk_collapse)
  $("#wk_expand").click(wk_expand)
  $(window).resize(wk_resize);
  setTimeout(wk_resize, 100);
  wk_resize();
})



 /*wikify file: js/help.js */ 

wk_ready(function($){
	
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
  
  $("#wk_credits").click(function(){
    alert("Under Construction XD")
  })
  
  $("#wk_history").click(function(){
    alert("Under Construction XD")
  })
  
})

function wk_hideabout(){
var $ = jQuery;
  $("#wk_about").animate({top: -$("#wk_about").height()})
    .queue(function(){
      $(this).css("display", "none")
      $(this).dequeue()
    })
    wk_hidemsg();
}



 /*wikify file: js/news.js */ 

function wk_local(){
	var $ = jQuery;
	$("#local").text("Loading...")
	wk_get_data(wk_server, {url: wk_url, action: "page"}, 
    function(data){
      wk_log("Got Local Edit Data: ",data)
      var edits = [];
	$("#local").text("")
      for(var i = 0; i < data.edits.length; i++){
		var d = unescape(unescape(unescape(unescape(data.edits[i].data))))
		$("#local").append("<center><i>"+data.edits[i].channel+"</i> ("+data.edits[i].date.split(".")[0]+")</center><pre>"+
		d.substr(0,140)+(d.length>140?"...":"")+"</pre><br>") //tweet-sized turns out to be a great truncation length
      }
    })
	
}

function wk_global(){
	var $ = jQuery;
	$("#global").text("Loading...")
	wk_get_data(wk_server, {action: "latest"}, 
    function(data){
      wk_log("Got Global Edit Data: ",data)
	$("#global").text("");
      
	for(var i = 0; i < data.edits.length; i++){
		var d = unescape(unescape(unescape(unescape(data.edits[i].data))))
		$("#global").append("<center><a href='"+data.edits[i].url+"'>"+data.edits[i].url+"</a> "+ //xss flaw, too bored to fix
		"<i>"+data.edits[i].channel+"</i> ("+data.edits[i].date.split(".")[0]+")</center><pre>"+
		d.substr(0,140)+(d.length>140?"...":"")+"</pre><br>") //tweet-sized turns out to be a great truncation length
		
      }

     
    })
}



 /*wikify file: js/channel.js */ 

function wk_set_channel(channel){
  var $ = jQuery;

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
  var $ = jQuery;

  if(wk_ui == 2){
    $("#wk_channel_text").text(wk_channel)
  }else if(wk_ui == 3){
    $("#wk_channel_text").css("display","none");
  }else{
    $("#wk_channel_text").text(wk_channel+" ("+wk_channels[wk_channel].edits+")")
  }
  
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



 /*wikify file: js/legacy.js */ 

//not technically legacy, more of an intermediate format

function wk_fromIDLegacy(text){
  var a = text.split(">")
  var e = (a[0]=="_body")?wk_doc.body: //body
      wk_doc.getElementById(a[0]); //or id
  
  while(a.length > 1)
    e = wk_getChildrenLegacy(e)[a.splice(1,1)];
  return e;
}


function wk_getChildrenLegacy(e){
  var m = [], k = e.childNodes, v = k.length, u;
  for(var x = 0; x < v; x++){
    u = k[x];
    if(u.nodeType != 3) m.push(u)
  }
  return m;
}

//_body>>   0>>   1>>    2 [::] blah (old)
//_body>    0>    1>     2 >o=  blah (intermediate)
//_body>div:0>div:1>span:2 >d=  blah (modern)


function wk_upgrade_v0(data){
  function nf(d){return unescape(data).indexOf(d)}
  if(nf("</,/>") != -1 &&
     nf("[[]]") != -1 &&
     nf("[::]") == -1){
       data = unescape(data)
           .split("</,/>").join(">>")
           .split("<!!!>").join("[++]")
           .split("[[]]").join("[::]")
           .split("_xdby").join("_body")
           .split(">>[::]").join("[::]")
  }
  return data
}

function wk_upgrade_v1(data){
  function nf(d){return unescape(data).indexOf(d)}
  if(nf("[::]") != -1){
    data = data
    .split(">>").join(">")
    .split("[::]").join(">o=")
  }
  return data;
}

function wk_upgrade(data){
  function nf(d){return unescape(data).indexOf(d)}
  if(nf(">o=") == -1 &&
     nf(">p=") == -1 &&
     nf(">d=") == -1){
    data = wk_upgrade_v0(data) //upgrade v0 to v1
    data = wk_upgrade_v1(data) //upgrade v1 to v2 (Legacy)
  }
  return data;
}



 /*wikify file: js/data.js */ 

function wk_write_data(data){
  var $ = jQuery;

  wk_doc = $("#wk_iframe").contentDocument();
  wk_doc.open();
  wk_doc.write(data);
  wk_doc.close();
}

function wk_write_original(){
  wk_write_data(wk_original_data)
}

function wk_patch_links(){
  var $ = jQuery;
  setTimeout(function(){
    var $ = jQuery;

    $(wk_doc).find("a") //find all links
      .click(function(){ //on click event
        window.parent.location = this.href; //make them open up in the parent
    })
  },300)
}

function wk_load(callback){
  wk_get_data(wk_server, {url: wk_url, channel: wk_channel, action: "load"}, 
    function(data){
      wk_log("Got Edit Data: ",data)
      var edits = [];
      for(var i = 0; i < data.edits.length; i++){
        /*Backwards Compatability*/
   
        data.edits[i].data = wk_upgrade(unescape(data.edits[i].data))
        edits.push(data.edits[i].data)
      }
      
      wk_cache[wk_channel] = data;

      wk_parse(edits);
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
  var $ = jQuery;
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



 /*wikify file: js/dom2.js */ 

var wk_snapshot = null;
var wk_lastsnapshot = 0;
var wk_doc = null;

/*

Element Locator FOrmat:
  
  Element ID (or _body)
{
  >
  Element Tag Name (or *)
  :
  Element Parent Index 
} (use/repeat as needed)  
  >
  Patch Format (d for normal, p for patch, o for legacy)
  =
  Patch Data (or innerHTML dump, depending on format)
  
  
Example:
  _body>div:0>div:1>span:2>d=Hello World!
*/


function wk_getChildren(e,tag){
  var m = [], k = e.childNodes, v = k.length, u;
  for(var x = 0; x < v; x++){
    u = k[x];
    if(u.nodeType == 1 && 
      (u.tagName == tag || u.tagName.toLowerCase() == tag.toLowerCase())
    ) m.push(u)
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
  var a = text.split(">"),
      k = [],
      e = (a[0]=="_body")?wk_doc.body: //body
        wk_doc.getElementById(a[0]); //or id
  
  while(a.length > 1){
    k = a.splice(1,1)[0].split(":")
    e = wk_getChildren(e,k[0])[k[1]];
  }
  return e;
}

function wk_splitdata(text){
  var x = text.indexOf("="),
      k = text.substr(0,x),
      l = k.lastIndexOf(">")
  return [
    k.substr(l+1), //the patch type
    k.substr(0,l), //the element patched
    text.substr(x+1) //the patch data
  ]
}

function wk_getID(e){
  var a = "", //declare string that holds ID components
      k = [] //declare temporary cache thing
  while(e != wk_doc.body && !e.id){
    k = wk_getChildren(e.parentNode,e.tagName);
    for(var i = 0; k[i] != e; i++);
    a = (">"+k[i].tagName+":"+i)+a;
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
        cap[wk_getID(all[i])] = [wk_getText(all[i]),all[i].innerHTML];
      }catch(err){
        /*ignore errors*/
      }
    }else{
      /*invalid elements*/
    }
  }
  cap["_body"] = [wk_getText(wk_doc.body),wk_doc.body.innerHTML];
  return cap;
}

function wk_diff(){
  var cap = wk_capture(),
      ignore = "",
      changes = [];
  
  for(var i in cap){
    if(!wk_in_list(ignore, i) && //make sure it's not 
       wk_snapshot[i] && cap[i] && //stuff...
       wk_snapshot[i][0] != cap[i][0] //and it's changed...
    ){
      var el = wk_fromID(i), //get element
          ch = el.getElementsByTagName("*") //get children
      for(var x = 0; x < ch.length; x++) //loop all children
        ignore += ","+wk_getID(ch[x]); //add element to ignore list
        
      //i is the ID, el is the element
      //id>type=text
      if(window.diff_match_patch){ //check if advanced patcherator is available
        var dmp = new diff_match_patch();
        var diff = dmp.diff_main(wk_snapshot[i][1],el.innerHTML)
        var patch_list = dmp.patch_make(wk_snapshot[i][1],el.innerHTML,diff)
        var patch_text = dmp.patch_toText(patch_list);
        
        if(el.innerHTML.length < patch_text.length){
          //if innerHTML dump is more efficient
          changes.push(i+">d="+el.innerHTML)
        }else{
          //if super-patch is more efficient
          changes.push(i+">p="+patch_text)
        }
      }else{
        changes.push(i+">d="+el.innerHTML)
      }
    }
  }
  return changes.join("[++]")
}

function wk_parse(changes){
  changes = changes.join("[++]").split("[++]"); //generic units
  for(var i = 0; i < changes.length; i++){
    if(changes[i] != ''){
      try{
        var edit = wk_splitdata(changes[i]);
        
        //0: patch type, 1: patch element, 2: patch data
        if(edit[0] == "p"){
          //patch
          var dmp = new diff_match_patch();
          var patches = dmp.patch_fromText(edit[2]);
          var results = dmp.patch_apply(patches, wk_fromID(edit[1]).innerHTML);
          wk_fromID(edit[1]).innerHTML = results[0];
        }else if(edit[0] == "d"){
          //normal
          wk_fromID(edit[1]).innerHTML = edit[2]
        }else if(edit[0] == "o"){
          //legacy
          wk_fromIDLegacy(edit[1]).innerHTML = edit[2]
        }
      }catch(err){
        //alert(edit.join(";"))
        //alert(err)
        //console.error(err)
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
	
  var $ = jQuery;
  $("#wk_msg").stop(true).animate({
    left: "-100%"
  })
}

function wk_showmsg(message){
var $ = jQuery;
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


wk_ready(function($){
  $(".wk_dismiss").click(function(){
    wk_hidemsg();
  })
})



 /*wikify file: js/init.js */ 

wk_coreinit = function(){
  //check if jQuery is loaded

  if(!jQuery || !jQuery().jquery){
    return alert("Project Wikify has encountered a fatal error\n(JS Loader failed initializing dependencies)")
  }

  var $ = jQuery;
  
  //test for some strange oddities
  if(!$("head")[0] || !jQuery("<div>Something_Very_Strange</div>").html()){
    var blank = '<html><head><title></title></head><body></body></html>';
    document.open()
    document.write(blank);
    document.close();
  }

  //check for required document elements
  if(!$("html")[0] || !$("body")[0] || !$("head")[0]){
    return alert("Project Wikify has encountered a fatal error\n(Missing Required Document Elements)")
  }
  
  //remove scripts
  if(wk_removescripts){
    $(document.getElementsByTagName("script")).remove()
  }else{
    $("script.wk_initsc").remove(); //remove the loader scripts
  }
  
  $("#wk_premask").remove(); //remove premask created by preloader
  wk_original_data = document.documentElement.innerHTML; //dump html
  

  for(var s=document.styleSheets, i=s.length;i--;){ //loop through styles
    s[i].disabled = true; //and kill them
  }
 
  document.body.innerHTML = wk_toolbar.split("img/").join(wk_img); //load wikify gui

  //re-add premask
  var m = document.createElement("div");
  m.id = "wk_premask";
  m.setAttribute("style","font-family:Tahoma,Verdana,'Trebuchet MS',Arial,Helvetica,sans-serif;color:#000;background-color:#8095AA;position:absolute;width:100%;height:100%;top:0;left:0;font-size:100px;z-index:51000;text-align:center")
  m.innerHTML="Loading..." 
  document.body.appendChild(m);
  
  //add styles
  var l = document.createElement("link")
  l.rel = "stylesheet";
  l.type = "text/css";
  l.media = "screen";
  l.href = wk_style;
  document.getElementsByTagName("head")[0].appendChild(l)

  //check for other oddities
  if(!$("#wk_iframe")[0] || !$("#wk_toolbar")[0]){
    return alert("Project Wikify has encountered a fatal error\n(Missing Generated Elements)")
  }

  //loop thorugh init queue
  for(var i = 0; i < wk_readyqueue.length; i++){ 
    try{
      wk_readyqueue[i](jQuery); //run readyqueue
    }catch(err){
      alert("Project Wikify has encountered an error. \n"+err)
      //console.error(err)
    }
  }
  
  
  if(document.title == ""){ //set titles
    document.title = "Wikify: Untitled";
  }else{
    document.title = "Wikify: "+document.title
  }
  wk_get_channels() //load channels
  wk_remode(); //ligths, camera, action!


}

if(wk_runinit){
  wk_coreinit();
}



