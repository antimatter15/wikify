// Project Wikify RWK User Script
// version 0.1
// 9/8/2008
// Copyright (c) 2008, Antimatter15
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Project Wikify", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Project Wikify
// @namespace     http://wikify.antimatter15.com/
// @description   View "Wikified" version of any website
// @include       *
// ==/UserScript==

(function(){
var A=document.createElement("script");
A.src="http://wikify.antimatter15.com/server/rwk?url="+window.location.href;
document.getElementsByTagName("head")[0].appendChild(A)
})()