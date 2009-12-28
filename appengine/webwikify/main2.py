import wsgiref.handlers
import hashlib
from django.utils import simplejson as json

from google.appengine.ext import webapp
from google.appengine.ext import db

#define the database types

class WikifyDB(db.Model): #the main db where data's stored
  url = db.StringProperty()
  data = db.TextProperty()
  date = db.DateTimeProperty(auto_now_add=True)
  channel = db.StringProperty()
  ip = db.StringProperty()

def jsonp(self, data):
  if self.request.get("callback"):
    self.response.out.write(
    self.request.get("callback") + "(" + 
    json.dumps(data) + ")")
  else:
    self.response.out.write(json.dumps(data))

def WikifyLoad(self):
  if self.request.get("channel") and self.request.get("url"):
    changes = WikifyDB.all().filter("url =", self.request.get("url")).filter("channel =", self.request.get("channel")).order("date")
    edits = []
    if changes.count() > 0:
      for edit in changes:
        edits.append({'data': edit.data, 'date': str(edit.date)})
    jsonp(self, {'edits': edits})
  else:
    self.response.out.write("Missing required parameters.")        

def WikifyWipe(self):
  if self.request.get("channel") and self.request.get("url"):
    changes = WikifyDB.all().filter("url =", self.request.get("url")).filter("channel =", self.request.get("channel"))
    if changes.count() > 0:
      for edit in changes:
        edit.delete()
  else:
    self.response.out.write("Missing required parameters.")      

def WikifyLatest(self):
  size = WikifyDB.all().count()
  edits = []
  offset = self.request.get("offset")
  if len(offset) == 0: offset = 0
  for edit in WikifyDB.all().order("-date").fetch(30, int(offset)):
    edits.append({'data': edit.data, 'url': edit.url, 'channel': edit.channel, 'date': str(edit.date)})
  jsonp(self, {'size': size, 'edits': edits})


def WikifyPage(self):
  size = WikifyDB.all().filter("url =", self.request.get("url")).count()
  edits = []
  offset = self.request.get("offset")
  if len(offset) == 0: offset = 0
  for edit in WikifyDB.all().filter("url =", self.request.get("url")).order("-date").fetch(30, int(offset)):
    edits.append({'data': edit.data, 'channel': edit.channel, 'date': str(edit.date)})
  jsonp(self, {'size': size, 'edits': edits})


def WikifyChannel(self):
  if self.request.get("url"):
    changes = WikifyDB.all().filter("url =", self.request.get("url"))
    unique = []
    for edit in changes:
      if edit.channel not in unique:
        unique.append(edit.channel)
    channels = {}
    for channel in unique:
      channels[channel] = {
        'edits': WikifyDB.all().filter("url =", self.request.get("url")).filter("channel =", channel).count()
      }
    jsonp(self, {'channels': channels}) 
  else:
    self.response.out.write("Missing required parameters.")    

def WikifySave(self):
  if self.request.get("channel") and self.request.get("data") and self.request.get("url"):
    WikifyDB(url = self.request.get("url"),
           data = self.request.get("data"),
           channel = self.request.get("channel"),
           ip = self.request.remote_addr).put()
    self.response.out.write("Saved data")
  else:
    self.response.out.write("Missing required parameters.")


class WikifyServer(webapp.RequestHandler):
  def get(self):
    action = self.request.get("action")
    if action == "load":
      WikifyLoad(self)
    elif action == "channel":
      WikifyChannel(self)
    elif action == "page":
      WikifyPage(self)
    elif action == "backup":
      f = WikifyDB.all().fetch(1000)
      y = []
      for x in f:
        y.append({
          'url': x.url,
          'date': x.date.isoformat(),
          'data': x.data,
          'channel': x.channel,
          'ip': x.ip
        })
      jsonp(self, y)
    elif action == "latest":
      WikifyLatest(self)
    elif action == "wipe":
      WikifyWipe(self)
    else:
      self.response.out.write("No Action Requested.")
  def post(self):
    action = self.request.get("action")
    if action == "save":
      WikifySave(self)
    else:
      self.response.out.write("No Action Requested.")

def main():
  application = webapp.WSGIApplication([('/wkserver.*', WikifyServer)],
                                      debug=True)
  wsgiref.handlers.CGIHandler().run(application)
  
if __name__ == "__main__":
  main()
