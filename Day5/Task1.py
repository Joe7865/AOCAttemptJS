import csv
import json

with open('data.csv', newline='') as csvfile:
    spamreader = csv.reader(csvfile, delimiter=' ', quotechar='|')
    isInitialStack = True
    stackState = {"1": ["F", "G", "V", "R", "J", "L", "D"], "2": ["S", "J", "H", "V", "B", "M", "P", "T"], "3": ["C", "P", "G", "D", "F", "M", "H", "V"], "4": ["Q", "G", "N", "P", "D", "M"], "5": ["F", "N", "H", "L", "J"], "6": ["Z", "T", "G", "D", "Q", "V", "F", "N"], "7": ["L", "B", "D", "F"], "8": ["N", "D", "V", "S", "B", "J", "M"], "9": ["D", "L", "G"]}

    for row in spamreader:
        if (len(row) == 0):
            isInitialStack = False
            continue
        # if (isInitialStack):
        #     for i in range(len(row)):
        #         if (len(row[i]) == 3 and row[i][0] == '[' and i <= 8):
        #             stackState[i + 1].append(row[i][1])
        if (not isInitialStack):
            noToMove = row[1]
            stackFrom = row[3]
            stackTo = row[5]

            for i in range(int(noToMove)):
                charToMove = stackState[stackFrom].pop(0)
                stackState[stackTo].insert(0,charToMove)

    
    print(json.dumps(stackState))
