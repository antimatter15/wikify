import wsgiref.handlers

from google.appengine.ext import webapp
from google.appengine.ext import db


class WikifyDB(db.Model):
  url = db.StringProperty()
  data = db.TextProperty()
  date = db.DateTimeProperty(auto_now_add=True)
  channel = db.StringProperty()
  ip = db.StringProperty()

class Save(webapp.RequestHandler):
  def get(self):
    self.response.out.write("This server only accepts POST.")
  def post(self):
    if self.request.get("url") and self.request.get("dat"):
      WikifyDB(url = self.request.get("url"),
               data = self.request.get("dat"),
               channel = self.request.get("channel"),
               ip = self.request.remote_addr).put()
      self.response.out.write("SAVED DATA (IFRAME) "+self.request.get("url"))
    else:
      self.response.out.write("INVALID DATA (IFRAME) "+self.request.get("url"))
    self.response.out.write("DONE") 


class Load(webapp.RequestHandler):
  def get(self):
    self.response.headers["Content-Type"] = "text/javascript"
    self.response.out.write("Wikify.loadhistory([")
    changes = WikifyDB.gql("WHERE url=:url ORDER BY date ASC", url=self.request.get("url"))
    if changes.count() > 0:
      for edit in changes:
        self.response.out.write("['"+edit.data+"'],\n")
    else:
      self.response.out.write("/*NO DATA ON URL!*/'ENDPARSE', \n")
    self.response.out.write("""
      "ENDPARSE"]);
      
      Wikify.autoparse();
      """)

class RWK(webapp.RequestHandler):
  def get(self):
    self.response.headers["Content-Type"] = "text/javascript"
    self.response.out.write("""
    (function(){
    var g = function(q){ 
    q = unescape(q);
    var w = q.split("<!!!>");
    for(var i = 0;i < w.length; i++){ try{
    var f = w[i].split("[[]]"), 
    u = f[0].split("</,/>")
    var e = (u[0]=="_xdby")?document.body:document.getElementById(u[0]), a=u.slice(1);
    if(!(a[0]=="" && a.length == 1) && a){
    var m = [];
    for(var x = 0; x < e.childNodes.length; x++){
    if(e.childNodes[x].nodeType != 3){
    m.push(e.childNodes[x])}}
    while(a.length>0) e=m.childNodes[a.splice(0,1)];
    }
    e.innerHTML = f[1]
    }catch(err){}}};""");
    changes = WikifyDB.gql("WHERE url=:url AND channel=:channel ORDER BY date ASC", 
                              url=self.request.get("url"), 
                              channel=self.request.get("channel"))
    if changes.count() > 0:
      for edit in changes:
        self.response.out.write("\ng('"+edit.data+"');\n")
    else:
      self.response.out.write("\n/*NO DATA ON URL*/\n")
    self.response.out.write("\n})();\n")

def main():
  application = webapp.WSGIApplication(
                                      [('/server/save',Save),
                                       ('/server/load',Load),
                                       ('/server/rwk',RWK)],
                                      debug=True)
  wsgiref.handlers.CGIHandler().run(application)
  
if __name__ == "__main__":
  main()
