import wsgiref.handlers

from google.appengine.ext import webapp
from google.appengine.ext import db


class WikifyDB(db.Model):
  url = db.StringProperty()
  data = db.TextProperty()
  date = db.DateTimeProperty(auto_now_add=True)
  ip = db.StringProperty()

class Save(webapp.RequestHandler):
  def get(self):
    self.response.headers["Content-Type"] = "text/javascript"
    if self.request.get("url") and self.request.get("dat"):
      WikifyDB(url = self.request.get("url"),
               data = self.request.get("dat"),
               ip = self.request.remote_addr).put()
      self.response.out.write("/*SAVED DATA*/\n")
    else:
      self.response.out.write("/*INVALID DATA*/\n")
    
  def post(self):
    if self.request.get("url") and self.request.get("dat"):
      WikifyDB(url = self.request.get("url"),
               data = self.request.get("dat"),
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
    
class Import(webapp.RequestHandler):
  def get(self):
    self.response.out.write("""<form>
    <input type='text' name='url' style="width: 100%"><br>
    <textarea style="width: 100%; height: 500px" name='data'></textarea><br>
    <input type='submit' value='Import Page'>
    </form>""")
  def post(self):
    for x in self.request.get("data").split("<<(X)>>"):
      WikifyDB(url = self.request.get("url"),
           data = x,
           ip = "NOT AVAILABLE").put()

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
    while(a.length>0) e=e.childNodes[a.splice(0,1)];
    }
    e.innerHTML = f[1]
    }catch(err){}}};""");
    changes = WikifyDB.gql("WHERE url=:url ORDER BY date ASC", url=self.request.get("url"))
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
                                       ('/server/import',Import),
                                       ('/server/rwk',RWK)],
                                      debug=True)
  wsgiref.handlers.CGIHandler().run(application)
  
if __name__ == "__main__":
  main()
