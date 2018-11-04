import csv
import string


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
            if (no_space[0], int(row[2])) not in conflicts:
                conflicts[(no_space[0], int(row[2]))] = int(row[12])
            else:
                conflicts[(no_space[0], int(row[2]))] = conflicts[(no_space[0], int(row[2]))] + int(row[12])

print conflicts

with open('googlescrape.csv') as csv_file:
    csv_reader = csv.reader(csv_file, delimiter=',')
    for row in csv_reader:
         year_begin = row[1].split("/")
         if len(year_begin) == 1:
             continue

         year_begin = int(year_begin[2])

         country = row[0]
         if country == "Britain":
             country = "United Kingdom"

         elif country == "Russia Federation":
             country = "Russia"

         elif country == "Zaire":
             country = "Congo"


         if (country, year_begin) in conflicts or (country, year_begin + 1) in conflicts or (country, year_begin + 2) in conflicts or (country, year_begin + 3) in conflicts or (country, year_begin + 4) in conflicts:
             words = row[3]
             for c in string.punctuation:
                 words = words.replace(c, "")
             split_words = words.split(" ")
             with open('conflict_words_split.csv', 'a') as write_file:
                 writer = csv.writer(write_file, delimiter=',', quoting=csv.QUOTE_MINIMAL)
                 line = []
                 for word in split_words:
                     if len(word) > 2:
                         line.append(word)

                 writer.writerow(line)

         else:
             words = row[3]
             for c in string.punctuation:
                 words = words.replace(c, "")
             split_words = words.split(" ")
             with open('normal_words_split.csv', 'a') as write_file:
                 writer = csv.writer(write_file, delimiter=',', quoting=csv.QUOTE_MINIMAL)
                 line = []
                 for word in split_words:
                     if len(word) > 2:
                        line.append(word)


                 writer.writerow(line)

