from google.appengine.ext import db
from google.appengine.api import users
import json 


class Ride(db.Model):

#  author = db.UserProperty()
  destination = db.StringProperty()
  source = db.StringProperty()
  when = db.DateTimeProperty(auto_now_add=True)
  contact = db.StringProperty()

  def to_json(self):
  	ride_dict = {
  	"destination":self.destination, 
  	"source":self.source, 
  	"when":str(self.when),
  	"contact":self.contact}
  	return json.dumps(ride_dict)

