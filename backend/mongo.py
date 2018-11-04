from pymongo import MongoClient
import csv
import json

connection_params = {
    'user': 'master',
    'password': 'stanford1',
    'host':'ds041167.mlab.com',
    'port':'41167',
    'namespace': 'crisis'
}
client = MongoClient('mongodb://master:stanford1@ds041167.mlab.com:41167/crisis')
db = client.crisis

with open('sentiment.csv') as csv_file:
    csv_reader = csv.reader(csv_file, delimiter=',')
    for row in csv_reader:
        if row[1] == "01/01/2012":
            features = eval(row[3])
            #features = json.loads(n)
            array = features["keywords"]
            sentiment = 0
            count = 0
            for thing in array:
                if "sentiment" not in thing:
                    continue
                sentiment = sentiment + float(thing["sentiment"]["score"])
                count = count + 1
            if (count == 0):
                sentiment = 0
            else:
                sentiment = sentiment/count

            posts = db.posts
            post = {
                'country': row[0],
                'content': 2,
                'data': sentiment
            }

            result = db.sentimment.insert(post)

