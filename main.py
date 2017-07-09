
import webapp2
import os
from google.appengine.ext.webapp import template
import json 

from models import Ride as RideModel

from datetime import *
from dateutil import parser


class MainPage(webapp2.RequestHandler):
    def get(self):
        path = os.path.join(os.path.dirname(__file__), 'index.html')
        self.response.out.write(template.render(path, {}))


class Ride(webapp2.RequestHandler):
	def post(self):
		jsonstring = self.request.body
		jsonobject = json.loads(jsonstring)
		print jsonobject
		ride = RideModel()
		# for key in jsonobject:
		# 	ride[key] = jsonobject[key]
		ride.destination = jsonobject["to"]
		ride.source = jsonobject["from"]
		ride.when = parser.parse(jsonobject["when"])
		ride.contact = jsonobject["contact"]
		print ride
		ride.put()

	def get(self):
		rides = RideModel.all().filter("when >=",date.today()).run()
		# rides = RideModel.all().fetch()
		rides_json = [ride.to_json() for ride in rides]

		self.response.headers['Content-Type'] = 'application/json'
		self.response.out.write(json.dumps(rides_json))

app = webapp2.WSGIApplication([
    ('/', MainPage),
    ('/ride', Ride)
], debug=True)
