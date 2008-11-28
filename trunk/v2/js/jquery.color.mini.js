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
	  // Look for rgb(num,num,num)
		if (result = /rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/.exec(color))
			return [parseInt(result[1]), parseInt(result[2]), parseInt(result[3])];

		// Look for #a0b1c2
		if (result = /#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})/.exec(color))
			return [parseInt(result[1],16), parseInt(result[2],16), parseInt(result[3],16)];
			
	}
})(jQuery);