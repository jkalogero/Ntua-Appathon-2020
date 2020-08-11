from flask import Flask, jsonify, request
from flask import render_template
from flask import redirect, url_for
from flask_cors import CORS
from flask_pymongo import PyMongo
from bson import json_util
import json
from pprint import pprint
from bson.son import SON
import time
# from rest_apis import main

# instantiate the app
app = Flask(__name__)
# setup mongo
app.config["MONGO_URI"] = "mongodb://localhost:27017/MediCom_db"
mongo = PyMongo(app)


# configuration
DEBUG = True
app.config.from_object(__name__)
app.url_map.strict_slashes = False #ignore trailing slashes


# enable CORS
CORS(app, resources={r'/*': {'origins': '*'}})

# app.register_blueprint(main)

@app.route('/TopDrugs')
def getDrugs():
    condition=request.args.get('condition')
    print(condition)
    pipeline = [{"$match":{"condition":condition }},{"$unwind": "$intervention"}, {"$group": {"_id": "$intervention", "count": {"$sum": 1}}}, {"$sort": SON([("count", -1), ("_id", 1)])},{"$limit": 10}]
    sortedResults = list(mongo.db.MediCom.aggregate(pipeline))
    pprint(sortedResults)
    return json.dumps(sortedResults,default=str)

@app.route('/conditions')
def getConditions():
    drug=request.args.get('drug')
    print(drug)
    pipeline = [{"$match":{"intervention":drug }}]
    sortedResults = list(mongo.db.MediCom.aggregate(pipeline))
    pprint(sortedResults)
    return json.dumps(sortedResults,default=str)

@app.route('/statistics')
def getStatistics():
    pipeline = [{"$unwind": "$intervention"}, {"$group": {"_id": "$intervention", "count": {"$sum": 1}}}, {"$sort": SON([("count", -1), ("_id", 1)])},{"$limit": 11}]
    sortedResults = list(mongo.db.MediCom.aggregate(pipeline))
    pprint(sortedResults)
    return json.dumps(sortedResults,default=str)

if __name__ == '__main__':
    app.run()