from sklearn.linear_model import LogisticRegression
import csv
from sklearn.utils import shuffle
from sklearn.externals import joblib


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
data = []
deaths = []
with open('stocks.csv') as csv_file:
    csv_reader = csv.reader(csv_file, delimiter=',')
    count = 0
    for row in csv_reader:
        features = []
        if count == 0:
            count = 1
            continue

        country = row[0]
        year = row[1]
        features.append(float(row[2]))
        features.append(float(row[3]))
        features.append(float(row[4]))
        if (country, year) in conflicts:
            deaths.append(1)
        else:
            deaths.append(0)

        data.append(features)

data, deaths = shuffle(data, deaths, random_state=0)
training_data = []
training_deaths = []
testing_data = []
testing_deaths = []
for x in range(0, int(0.9*len(data))):
    training_data.append(data[x])
    training_deaths.append(deaths[x])

for x in range(int(0.9*len(data)), len(data)):
    testing_data.append(data[x])
    testing_deaths.append(deaths[x])


reg = LogisticRegression()
reg.fit(training_data, training_deaths)
print reg.score(testing_data, testing_deaths)
joblib.dump(reg, 'Logistic_Regression.joblib')