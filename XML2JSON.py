import os
from pymongo import MongoClient
import xml.etree.ElementTree as ET

dir = "/home/john/ECE/Ntua-Appathon-2020/data"

keys = ['nct_id', 'condition', 'intervention']


def convert(dir, file):

    tree = ET.parse(os.path.join(dir, file))
    root = tree.getroot()

    data = {}
    intervention = []

    for el in root.iter():
        if(el.tag in keys):
            if el.tag == 'intervention':
                if el.find('intervention_type').text == 'Drug':
                    intervention.append(el.find('intervention_name').text)
            else:
                data[el.tag] = el.text
    
                
    data['intervention'] = intervention
    return data

# Making Connection
myclient = MongoClient('localhost', 27017)
# database
db = myclient['MediCom_db']
intervention_collection = db['MediCom']

    
for subdir in os.listdir(dir):
    if subdir.endswith(".xml"):
        continue
    for file in os.listdir(os.path.join(dir, subdir)):
        print(file)
        resutls =convert(dir+'/'+subdir, file)
        intervention_collection.insert_one(resutls)

myclient.close()