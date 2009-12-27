/* ***** BEGIN LICENSE BLOCK *****
 * Version: MPL 1.1/GPL 2.0/LGPL 2.1
 *
 * The contents of this file are subject to the Mozilla Public License Version
 * 1.1 (the "License"); you may not use this file except in compliance with
 * the License. You may obtain a copy of the License at
 * http://www.mozilla.org/MPL/
 *
 * Software distributed under the License is distributed on an "AS IS" basis,
 * WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License
 * for the specific language governing rights and limitations under the
 * License.
 *
 * The Original Code is Netscape Cross Browser Design Mode code.
 *
 * The Initial Developer of the Original Code is
 * Netscape Communications Corporation.
 * Portions created by the Initial Developer are Copyright (C) 2003
 * the Initial Developer. All Rights Reserved.
 *
 * Contributor(s): Doron Rosenberg <doron@netscape.com> (original author)
 *
 *                 
 *
 * ***** END LICENSE BLOCK ***** */

 
/*
    xbDesignMode
    
    a JavaScript wrapper for browsers that support designMode

*/ 
 
function xbDesignMode(aIFrame){

  this.mEditorDocument = null;
  this.mIFrameElement = null;
  
  // argument is a string, therefore an ID
  if ( (typeof(aIFrame) == "string") && (document.getElementById(aIFrame).tagName.toLowerCase()=="iframe") ){
    this.mIFrameElement = document.getElementById(aIFrame);
  } else if( (typeof(aIFrame)=="object") && (aIFrame.tagName.toLowerCase() == "iframe") ){
    this.mIFrameElement = aIFrame;   
  } else {
    throw "Argument isn't an id of an iframe or an iframe reference";
  }
  
  if (this.mIFrameElement.contentDocument){  
    // Gecko
    this.mEditorDocument = this.mIFrameElement.contentDocument;
    this.mEditorDocument.designMode = "On";    
  } else {
    // IE
    this.mEditorDocument = this.mIFrameElement.contentWindow.document;
    this.mEditorDocument.designMode = "On";   
    // IE needs to reget the document element after designMode was set 
    this.mEditorDocument = this.mIFrameElement.contentWindow.document;
  }    
}


xbDesignMode.prototype.execCommand = function (aCommandName, aParam){
  if (this.mEditorDocument)
    this.mEditorDocument.execCommand(aCommandName, false, aParam);
  else 
    throw "no mEditorDocument found";    
}

xbDesignMode.prototype.setCSSCreation = function (aUseCss){
  if (this.mEditorDocument)
    this.mEditorDocument.execCommand("useCSS", false, aUseCss);
  else 
    throw "no mEditorDocument found";  
    
}
