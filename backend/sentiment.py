import re
import requests
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.wait import WebDriverWait
import csv
from watson_developer_cloud import NaturalLanguageUnderstandingV1
from watson_developer_cloud.natural_language_understanding_v1 import Features, KeywordsOptions
from bs4 import BeautifulSoup

countries = [
]

natural_language_understanding = NaturalLanguageUnderstandingV1(
    version='2018-03-16',
    iam_apikey='xYGg04TOBBXrPEIkDFIURj4stIYJM1OWEdIL9mQHKatY',
    url='https://gateway.watsonplatform.net/natural-language-understanding/api'
)
url = "https://www.google.com/"
driver = webdriver.Chrome()
with open('crisis.csv', "w") as f:
    textWriter = csv.writer(f, delimiter=",")
    textWriter.writerow(['Country', 'Begin Date', 'End Date', 'Sentiment'])
    for countryTuple in countries:
        country = countryTuple[1]
        wait = WebDriverWait(driver, 10)
        driver.get(url)
        text_input = wait.until(EC.element_to_be_clickable((By.NAME, "q")))
        text_input.send_keys(country)
        text_input.send_keys(Keys.ENTER)
        tools_item = wait.until(EC.element_to_be_clickable((By.ID, "hdtb-tls")))
        tools_item.click()
        time_item = wait.until(EC.element_to_be_clickable((By.XPATH, '//*[@id="hdtbMenus"]/div/div[2]')))
        time_item.send_keys(Keys.RETURN)
        custom_item = wait.until(EC.element_to_be_clickable((By.ID, "cdrlnk")))
        custom_item.click()
        beginDate = "01/01/2012"
        endDate = "12/01/2012"
        from_input = wait.until(EC.element_to_be_clickable((By.XPATH, '//*[@id="cdr_min"]')))
        from_input.send_keys(beginDate)
        to_input = wait.until(EC.element_to_be_clickable((By.XPATH, '//*[@id="cdr_max"]')))
        to_input.send_keys(endDate)
        search_button = wait.until(EC.element_to_be_clickable((By.XPATH, '//*[@id="cdr_frm"]/input[7]')))
        search_button.click()
        elementList = driver.find_elements(By.CLASS_NAME, 'iUh30')
        for webelement in elementList:
            tempurl = webelement.text
            regex = re.compile(
                r'^(?:http|ftp)s?://'  # http:// or https://
                r'(?:(?:[A-Z0-9](?:[A-Z0-9-]{0,61}[A-Z0-9])?\.)+(?:[A-Z]{2,6}\.?|[A-Z0-9-]{2,}\.?)|'  # domain...
                r'localhost|'  # localhost...
                r'\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})'  # ...or ip
                r'(?::\d+)?'  # optional port
                r'(?:/?|[/?]\S+)$', re.IGNORECASE)
            print(tempurl)
            if (re.match(regex, tempurl) is not None):
                htmlHolder = requests.get(tempurl)
                response = natural_language_understanding.analyze(
                    html=BeautifulSoup(htmlHolder.content, "html").prettify(),
                    features=Features(keywords=KeywordsOptions(sentiment=True, emotion=True, limit=2))).get_result()

                textWriter.writerow([country, beginDate, endDate, response])