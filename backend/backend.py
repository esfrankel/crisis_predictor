from flask import Flask, request
from pymongo import MongoClient
from sklearn.externals import joblib
import csv
import json
app = Flask(__name__)

wordDict = {}

with open('conflict_words.csv') as csv_file:
    csv_reader = csv.reader(csv_file, delimiter=',')
    for row in csv_reader:
        if len(row) == 0:
            continue
        word = row[0]
        if word not in wordDict:
            wordDict[word] = 1
        else:
            wordDict[word] = wordDict[word] + 1

wordDict["XXXXX"] = 4
# keys = wordDict.keys()
# for key in keys:
for key in list(wordDict):
    if wordDict[key] < 4:
        wordDict["XXXXX"] = wordDict["XXXXX"] + wordDict[key]
        del wordDict[key]

structural_classifier = joblib.load('Soft_Voting_Classifier.joblib')
economic_classifier = joblib.load('Logistic_Regression.joblib')
article_classifier = joblib.load('Naive_Bayes.joblib')

@app.route("/")
def hello():
    print("hello world")

@app.route("/loc")
def get_data():
    country = request.args.get('country')
    client = MongoClient('mongodb://master:stanford1@ds041167.mlab.com:41167/crisis')
    database = client.crisis
    structural = database.structural.find_one({'country': country})
    economic = database.economical.find_one({'country': country})
    if country == "United Kingdom":
        country = "Britain"
    if country == "Russia":
        country = "Russian Federation"
    if country == "Syria":
        country = "Syrian Arab Republic"
    current = database.current.find({'country': country})
    sentiment = database.sentimment.find({'country': country})
    tot_sentiment = 0
    count = 0
    for x in range(0, sentiment.count()):
        count = count + 1
        tot_sentiment = sentiment[x]["data"]
    if count == 0:
        tot_sentiment = 0
    else:
        tot_sentiment = tot_sentiment/count
    articles = []
    for x in range(0, current.count()):
        articles.append(current[x])

    structural_data = structural["data"]
    economic_data = economic["data"]
    struc_prob = structural_classifier.predict_proba([structural_data])
    econ_prob = economic_classifier.predict_proba([economic_data])

    normalWordDict = {}
    for key in wordDict.keys():
        normalWordDict[key] = 0

    normalWordDict["XXXXX"] = 4
    count = 0
    for article in articles:
        rowDict = normalWordDict
        words = article["data"]
        row = words.split(" ")
        for word in row:
            if word in rowDict:
                rowDict[word] = rowDict[word] + 1
            else:
                rowDict["XXXXX"] = rowDict["XXXXX"] + 1

        vals = list(rowDict.values())
        prediction = article_classifier.predict([vals])
        if (prediction == 1):
            count = count + 1

    overall = max(0, ((struc_prob[0][1] + econ_prob[0][1] + float(count)/10 + -1*tot_sentiment)/4))
    normal = overall*12/3
    final_values = []
    final_values.append(overall)
    final_values.append(min(struc_prob[0][1]/normal,struc_prob[0][1]) )
    final_values.append(min(econ_prob[0][1]/normal, econ_prob[0][1]))
    final_values.append(min((float(count)/10)/normal, float(count)/10))
    final_values.append(max(0, min(-1*tot_sentiment/normal, -1*tot_sentiment)))
    return json.dumps(final_values)
# print(get_data("Nigeria"))
