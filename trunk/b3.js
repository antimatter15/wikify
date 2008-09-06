/* Wikify Bookmarklet
 * (c) Copyright 2008 Antimatter15
 * Prototype 3, Revision 7
 *
 */

(function(){
window.Wikify_Config={
coreurl: "http://localhost/Wikify/c3.js",
saveurl: "http://localhost/Wikify/save2.php",
loadurl: "http://localhost/Wikify/load2.php"
};
if(window.Wikify){ //check if already loaded
Wikify.uisave(); //if so, save page
}else{ //if not, load script
var x = document.createElement("script"); //create script tag
x.src = WikifyConfig.coreurl; //insert absolute HTTP url to script
document.getElementsByTagName("head")[0].appendChild(x); //add to document head
} //end if
})()


//javascript:(function(){window.Wikify_Config={coreurl:"http://localhost/Wikify/c3.js",saveurl:"http://localhost/Wikify/save2.php",loadurl:"http://localhost/Wikify/load2.php"};if(window.Wikify){Wikify.uisave()}else{var A=document.createElement("script");A.src=WikifyConfig.coreurl;document.getElementsByTagName("head")[0].appendChild(A)}})()

