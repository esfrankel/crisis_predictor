import requests
from requests.exceptions import RequestException
from contextlib import closing
from bs4 import BeautifulSoup
import json

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
    print new_path
    response = requests.get(new_path)
    jsonarray = json.loads(response.content)
    return jsonarray

jsonarray = get_data("Russia", 0)
array = jsonarray.get("resultMap").get("SEARCH_RESULTS")
array = array[0]
stocks = array["resultList"]
for stock in stocks:
    if "score" in stock:
        print stock['score']
