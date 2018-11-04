import csv
import sklearn.naive_bayes as bayes
from sklearn.externals import joblib
import numpy
from sklearn.utils import shuffle

wordDict = {}

with open('conflict_words.csv') as csv_file:
    csv_reader = csv.reader(csv_file, delimiter=',')
    for row in csv_reader:
        print row
        if len(row) == 0:
            continue
        word = row[0]
        if word not in wordDict:
            wordDict[word] = 1
        else:
            wordDict[word] = wordDict[word] + 1

wordDict["XXXXX"] = 4
keys = wordDict.keys()
for key in keys:
    if wordDict[key] < 4:
        wordDict["XXXXX"] = wordDict["XXXXX"] + wordDict[key]
        del wordDict[key]

print wordDict
print wordDict.values()
normalWordDict = {}
for key in wordDict.keys():
    normalWordDict[key] = 0

normalWordDict["XXXXX"] = 4
output = []
features = []
count = 0
with open('conflict_words_split.csv') as csv_file:
    csv_reader = csv.reader(csv_file, delimiter=',')
    for row in csv_reader:
        rowDict = normalWordDict
        for word in row:
            if word in rowDict:
                rowDict[word] = rowDict[word] + 1
            else:
                rowDict["XXXXX"] = rowDict["XXXXX"] + 1

        output.append(1)
        features.append(rowDict.values())
        count = count + 1
print count

with open('normal_words_split.csv') as csv_file:
    csv_reader = csv.reader(csv_file, delimiter=',')
    for row in csv_reader:
        rowDict = normalWordDict
        for word in row:
            if word in rowDict:
                rowDict[word] = rowDict[word] + 1
            else:
                rowDict["XXXXX"] = rowDict["XXXXX"] + 1

        output.append(0)
        features.append(rowDict.values())

features, output = shuffle(features, output, random_state=0)
training_data = []
training_deaths = []
testing_data = []
testing_deaths = []
for x in range(0, int(0.9*len(features))):
    training_data.append(features[x])
    training_deaths.append(output[x])

for x in range(int(0.9*len(features)), len(features)):
    testing_data.append(features[x])
    testing_deaths.append(output[x])

print len(features)


# with open('normal_words.csv') as csv_file:
#     csv_reader = csv.reader(csv_file, delimiter=',')
#     for row in csv_reader:
#         word = row[0]
#         if word not in wordDict:
#             normalWordDict["XXXXX"] = normalWordDict["XXXXX"] + 1
#         else:
#             if word in normalWordDict:
#                 normalWordDict[word] = normalWordDict[word] + 1
#             else:
#                 normalWordDict[word] = 1

bay = bayes.MultinomialNB()
bay.fit(training_data, training_deaths)
val = bay.predict_proba(testing_data)
joblib.dump(bay, 'Naive_Bayes.joblib')