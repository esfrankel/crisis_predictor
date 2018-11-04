import requests
import json
from collections import OrderedDict
import csv
import pandas as pd

path = "https://www.blackrock.com/tools/hackathon/search-securities?query=country%20%3A%20%20%22"

def get_data(country, time):
    country_words = country.split(" ")
    new_path = path
    count = 0
    for word in country_words:
        if count == len(country_words) - 1:
            new_path = new_path + word
        else:
            new_path = new_path + word + "%20"

        count = count + 1

    new_path = new_path + "%22%20%2C%20t-"
    new_path = new_path + str(time) + "y%22"
    print(new_path)
    response = requests.get(new_path)
    jsonarray = json.loads(response.content)
    return jsonarray

database = pd.read_csv('database.csv')
countries = database['Country'].tolist()
countries = list(OrderedDict.fromkeys(countries))

with open('stocks.csv', "w") as f:
    textWriter = csv.writer(f, delimiter=",")
    textWriter.writerow(['Country', 'Year', 'AvgDiffScore', 'AvgDiffPe', 'AvgDiffPb'])
    for country in countries:
        scoreAverages, peAverages, pbAverages = [], [], []
        for i in range(36):
            jsonarray = get_data(country, i)
            array = jsonarray.get("resultMap").get("SEARCH_RESULTS")
            array = array[0]
            stocks = array["resultList"]
            scoreCount, peCount, pbCount = 0, 0, 0
            scoreSum, peSum, pbSum = 0, 0, 0

            for stock in stocks:
                if "score" in stock:
                    scoreSum += stock['score']
                    scoreCount += 1
                if "peRatio" in stock:
                    peSum += stock['peRatio']
                    peCount += 1
                if "pbRatio" in stock:
                    pbSum += stock['pbRatio']
                    pbCount += 1
            scoreAverages.append(scoreSum / scoreCount)
            peAverages.append(peSum / peCount)
            pbAverages.append(pbSum / pbCount)
            if (i > 0):
                textWriter.writerow([country, 2018 - i, scoreAverages[i] - scoreAverages[i-1],
                                    peAverages[i] - peAverages[i-1], pbAverages[i] - pbAverages[i-1]])