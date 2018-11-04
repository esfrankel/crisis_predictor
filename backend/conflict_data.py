import csv
import sklearn.neural_network as net
import sklearn.ensemble as ens
from sklearn.externals import joblib
import sklearn.naive_bayes as bayes
from sklearn.neighbors import KNeighborsClassifier
from sklearn.linear_model import LogisticRegression
from sklearn.svm import SVC
import numpy
from sklearn.utils import shuffle

conflicts= {}
with open('ucdp-brd-conf-181.csv') as csv_file:
    csv_reader = csv.reader(csv_file, delimiter=',')
    count = 0
    for row in csv_reader:
        if count == 0:
            count = 1
            continue
        countries = row[16].split(', ')
        for country in countries:
            no_space = country.split(' (')
            if (no_space[0], row[2]) not in conflicts:
                conflicts[(no_space[0], row[2])] = int(row[12])
            else:
                conflicts[(no_space[0], row[2])] = conflicts[(no_space[0], row[2])] + int(row[12])

print conflicts
deaths = []
data = []

with open('CIRI Data 1981_2011 2014.04.14.csv') as csv_file:
    csv_reader = csv.reader(csv_file, delimiter=',')
    count = 0
    for row in csv_reader:
        features = []
        if count == 0:
            count = 1
            continue
        if (row[8] == ''):
            continue

        for x in range(8, 28):
            if row[x] == '' or int(row[x]) < 0:
                features.append(0)
            else:
                features.append(int(row[x]))

        if (row[0], row[1]) in conflicts:
            count = count + 1
            #deaths.append(conflicts[(row[0], row[1])])
            #if conflicts[(row[0], row[1])] > 10000:
                #deaths.append(4)
                #deaths.append(4)
            #elif conflicts[(row[0], row[1])] > 1000:
                #deaths.append(3)
                #deaths.append(3)
            #elif conflicts[(row[0], row[1])] > 100:
                #deaths.append(2)
                #deaths.append(2)
            if conflicts[(row[0], row[1])] > 0:
                #deaths.append(1)
                deaths.append(1)

            #data.append(features)




        else:

            deaths.append(0)

        data.append(features)

data, deaths = shuffle(data, deaths, random_state=0)
training_data = []
print count
training_deaths = []
testing_data = []
testing_deaths = []
for x in range(0, int(0.95*len(data))):
    training_data.append(data[x])
    training_deaths.append(deaths[x])

for x in range(int(0.95*len(data)), len(data)):
    testing_data.append(data[x])
    testing_deaths.append(deaths[x])

neural_net = net.MLPClassifier()
neural_net.max_iter = 5000000
neural_net.fit(training_data, training_deaths)
result = neural_net.score(testing_data, testing_deaths)
fs = neural_net.predict_proba(testing_data)
print fs
print "Neural Network Accuracy is " + str(result)

forest = ens.RandomForestClassifier()
forest.n_estimators = 100
forest.fit(training_data, training_deaths)
result = forest.score(testing_data, testing_deaths)
print "Random Forest Accuracy is " + str(result)

# clf3 = SVC(gamma='scale', kernel='rbf', probability=True)
# clf3.fit(training_data, training_deaths)
# result = clf3.score(testing_data, testing_deaths)
# print "SVM accuracy is " + str(result)
#
# clf4 = KNeighborsClassifier(n_neighbors=7)
# clf4.fit(training_data, training_deaths)
# result = clf4.score(testing_data, testing_deaths)
# print "KNN accuracy is " + str(result)
#
# clf5 = bayes.MultinomialNB()
# clf5.fit(training_data, training_deaths)
# result = clf5.score(testing_data, testing_deaths)
# print "Bayes accuracy is " + str(result)
#
# clf6 = LogisticRegression()
# clf6.fit(training_data, training_deaths)
# result = clf6.score(testing_data, testing_deaths)
# print "Logistic Regression accuracy is " + str(result)

vote = ens.VotingClassifier(estimators=[('mlp', neural_net), ('rfc', forest)], voting='soft', weights=[1,1])
vote.fit(training_data, training_deaths)
print vote.score(testing_data, testing_deaths)


joblib.dump(neural_net, 'Soft_Voting_Classifier.joblib')