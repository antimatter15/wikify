CmdUtils.CreateCommand({
  name: "wikify",
  homepage: "http://wikify.antimatter15.com/",
  author: { name: "Antimatter15", email: "antimatter15@gmail.com"},
  contributors: ["Antimatter15"],
  license: "GPL",
  description: "Runs Wikify.",
  help: "Will do equivalent of running the wikify bookmarklet",
  execute: function(){
    var WKConf = {
    coreurl:"http://wikify.antimatter15.com/static2/core.js",
    saveurl:"http://wikify.antimatter15.com/server/save",
    loadurl:"http://wikify.antimatter15.com/server/load",
    channel:"Main"};
    CmdUtils.getWindowInsecure().WKConf = WKConf;
    var e=CmdUtils.getDocumentInsecure().createElement("script");
    e.src=WKConf.coreurl;
//    CmdUtils.getDocumentInsecure().getElementsByTagName("head")[0].appendChild(e)
  }
})


function cmd_save() {
//  CmdUtils.getWindowInsecure().Wikify.uisave()
}
cmd_save.description = "Saves Wikified Stuff.";