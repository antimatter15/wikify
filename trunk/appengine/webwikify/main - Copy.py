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
      channel = self.request.get("channel")
      if len(channel) == 0:
        channel = "main"
      WikifyDB(url = self.request.get("url"),
               data = self.request.get("dat"),
               channel = channel.lower(),
               ip = self.request.remote_addr).put()
      self.response.out.write("SAVED DATA (IFRAME) "+self.request.get("url"))
    else:
      self.response.out.write("INVALID DATA (IFRAME) "+self.request.get("url"))
    self.response.out.write(" DONE") 


class Load(webapp.RequestHandler):
  def get(self):
    self.response.headers["Content-Type"] = "text/javascript"
    self.response.out.write("Wikify.loadhistory([")
    channel = self.request.get("channel")
    if len(channel) == 0:
      channel = "main"
    changes = WikifyDB.gql("WHERE url=:url AND channel=:channel ORDER BY date ASC",
                           url=self.request.get("url"),
                           channel=channel.lower())
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
    q = unescape(q); //unescape data
    var w = q.split("<!!!>"); //split changes
    for(var i = 0;i < w.length; i++){ //loop through changes
    try{ //ignore errors
    var f = w[i].split("[[]]"), //split contnet
    u = f[0].split("</,/>"); //decrypt ID
    (function(a,b){ //get element from identifier
    var e = (b=="_xdby")?document.body:document.getElementById(b); //get origin
    if((a[0]=="" && a.length == 1) || !a){return e}
    while(a.length>0) //loop while a (from id) is not empty
    e = (function(e){ //element
    var m = [], k = e.childNodes, v = k.length, u;
    for(var x = 0; x < v; x++){
    u = k[x];
    if(u.nodeType != 3){
    m.push(u)
    }
    }
    return m;
    })(e)[a.splice(0,1)]; //set e to child of itself
    //end while loop
    return e; //return element
    })(u.slice(1),u[0]).innerHTML = f[1]; //set element contents
    }catch(err){
    }; //ignore errors
    } //end loop
    };""");
    channel = self.request.get("channel")
    if len(channel) == 0:
      channel = "main"
    changes = WikifyDB.gql("WHERE url=:url AND channel=:channel ORDER BY date ASC", 
                              url=self.request.get("url"), 
                              channel=channel.lower())
    if changes.count() > 0:
      for edit in changes:
        self.response.out.write("\ng('"+edit.data+"');\n")
    else:
      self.response.out.write("\n/*NO DATA ON URL*/\n")
    self.response.out.write("\n})();\n")
    
class Export(webapp.RequestHandler):
  def get(self):
    self.response.out.write("not yet!")

class Latest(webapp.RequestHandler):
  def get(self):
    self.response.out.write("""
    Wikify's Size: """+str(WikifyDB.all().count())+"""
    <hr>
    <script type="text/javascript">
    /*PARSERENGINE1*/
    var _=_?_:{}
    _.H=function(s){var d=document,t=d.createElement('div');t.appendChild(d.createTextNode(s));return t.innerHTML}
    function load(data,url,channel,ip){
    var fdata = unescape(data).split("<!!!>").map(function(x){return _.H(x.split("[[]]")[1])}).join("<br>");
    document.write("<b>"+url+"</b> <i>"+channel+"</i> ("+ip+")<br>"+fdata+"<br><br>")
    }
    """)
    offset = self.request.get("offset")
    if len(offset) == 0:
      offset = 0
    for edit in WikifyDB.all().order("-date").fetch(30,int(offset)):
      self.response.out.write("load('"+edit.data+"','"+edit.url+"','"+edit.channel+"','"+edit.ip+"');\n")
    self.response.out.write("</script>")

class Proxy(webapp.RequestHandler):
  def get(self):
    from google.appengine.api import urlfetch
    self.response.out.write('<base href="'+self.request.query_string+'" />'+
        urlfetch.fetch(self.request.query_string).content+
        """<script type="text/javascript">
        (function(){
        var A=document.createElement("script");
        A.src="http://wikify.antimatter15.com/server/rwk?url="""+self.request.query_string+"""";
        document.getElementsByTagName("head")[0].appendChild(A);
        for(var i = 0; i < document.links.length; i++){
          document.links[i].href = 'http://wikify.antimatter15.com/server/proxy/?'+document.links[i].href
        }
        
        window.WKLocat = '"""+self.request.query_string+"""';
        
        })()
        </script>""")

def main():
  application = webapp.WSGIApplication(
                                      [('/server/save',Save),
                                       ('/server/load',Load),
                                       ('/server/rwk',RWK),
                                       ('/server/latest',Latest),
                                       ('/server/proxy.*',Proxy)],
                                      debug=True)
  wsgiref.handlers.CGIHandler().run(application)
  
if __name__ == "__main__":
  main()
