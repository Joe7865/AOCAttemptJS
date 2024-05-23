import csv
import json

with open('Day5/data.csv', newline='') as csvfile:
    spamreader = csv.reader(csvfile, delimiter=' ', quotechar='|')
    isInitialStack = True
    # Have to update below manually (stack state needs to be top to bottom (although I;ve reversed it here due to a mistake)) (solution choose first letter from each stack)
    stackState = {"1": ["Q", "S", "W", "C", "Z", "V", "F", "T"], "2": ["Q", "R", "B"], "3": ["B", "Z", "T", "Q", "P", "M", "S"], "4": ["D", "V", "F", "R", "Q", "H"], "5": ["J", "G", "L", "D", "B", "S", "T", "P"], "6": ["W", "R", "T", "Z"], "7": ["H", "Q", "M", "N", "S", "F", "R", "J"], "8": ["R", "N", "F", "H", "W"], "9": ["J", "Z", "T", "Q", "P", "R", "B"]}
    for i in range(1, 9, 1):
        stackState[str(i)] = stackState[str(i)][::-1]

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
            intermediateStore = []

            for i in range(int(noToMove)):
                charToMove = stackState[stackFrom].pop(0)
                intermediateStore.append(charToMove)

            intermediateStore.reverse()
            for c in intermediateStore:
                stackState[stackTo].insert(0,c)

    
    print(json.dumps(stackState))
