import pandas as pd
csvData = pd.read_csv('.\Day9\data.csv', sep=" ", header=None, dtype = {'Dir': str, 'Dis': int})

# Plan:
# 1) Function to update the position of the head
# 2) Function to update the position of a knot based on the knot in front
# 3) Each single 1 movement then have a list of current and previous positions of knots

knotOrder = 'H123456789'
#previousKnotStore = {'H': {'x': 0, 'y': 0}, '1': {'x': 0, 'y': 0},'2': {'x': 0, 'y': 0}, '3': {'x': 0, 'y': 0}, '4': {'x': 0, 'y': 0}, '5': {'x': 0, 'y': 0},'6': {'x': 0, 'y': 0}, '7': {'x': 0, 'y': 0}, '8': {'x': 0, 'y': 0}, '9': {'x': 0, 'y': 0}, 's': {'x': 0, 'y': 0}}
currentKnotStore = {'H': {'x': 0, 'y': 0}, '1': {'x': 0, 'y': 0},'2': {'x': 0, 'y': 0}, '3': {'x': 0, 'y': 0}, '4': {'x': 0, 'y': 0}, '5': {'x': 0, 'y': 0},'6': {'x': 0, 'y': 0}, '7': {'x': 0, 'y': 0}, '8': {'x': 0, 'y': 0}, '9': {'x': 0, 'y': 0}}
tailCoordsList = [{'x': 0, 'y': 0}]

def updateKnot(knotInFront, currentKnot):
    #print(knotInFront)
    #print(currentKnot)
    if (knotInFront['x'] == currentKnot['x']):
        # Tail is in same col so needs to go up or down
        if (knotInFront['y'] < (currentKnot['y'] - 1)):
            currentKnot['y'] = currentKnot['y'] - 1
        elif (knotInFront['y'] > (currentKnot['y'] + 1)):
            currentKnot['y'] = currentKnot['y'] + 1
    elif (knotInFront['y'] == currentKnot['y']): 
        # Tail is in same row so needs to go left or right
        if (knotInFront['x'] < (currentKnot['x'] - 1)):
            currentKnot['x'] = currentKnot['x'] - 1
        elif (knotInFront['x'] > (currentKnot['x'] + 1)):
            currentKnot['x'] = currentKnot['x'] + 1
    elif (knotInFront['x'] != currentKnot['x'] and knotInFront['y'] != currentKnot['y']):
        if ((knotInFront['x'] < (currentKnot['x'] - 1) and knotInFront['y'] > currentKnot['y'])
            or (knotInFront['y'] > (currentKnot['y'] + 1) and knotInFront['x'] < currentKnot['x'])):
            # Tail needs to follow header diagonally up and left
            currentKnot['x'] = currentKnot['x'] - 1
            currentKnot['y'] = currentKnot['y'] + 1
        elif ((knotInFront['x'] > (currentKnot['x'] + 1) and knotInFront['y'] > currentKnot['y'])
            or (knotInFront['y'] > (currentKnot['y'] + 1) and knotInFront['x'] > currentKnot['x'])):
            # Tail needs to follow header diagonally up and right
            currentKnot['x'] = currentKnot['x'] + 1
            currentKnot['y'] = currentKnot['y'] + 1
        elif ((knotInFront['y'] < (currentKnot['y'] - 1) and knotInFront['x'] > currentKnot['x']) 
            or (knotInFront['x'] > (currentKnot['x'] + 1) and knotInFront['y'] < currentKnot['y'])):
            # Tail needs to follow header diagonally down and right
            currentKnot['x'] = currentKnot['x'] + 1
            currentKnot['y'] = currentKnot['y'] - 1
        elif ((knotInFront['y'] < (currentKnot['y'] - 1) and knotInFront['x'] < currentKnot['x'])
            or (knotInFront['x'] < (currentKnot['x'] - 1) and knotInFront['y'] < currentKnot['y'])):
            # Tail needs to follow header diagonally down and left
            currentKnot['x'] = currentKnot['x'] - 1
            currentKnot['y'] = currentKnot['y'] - 1
    return currentKnot

def updateHead(dir, currentHeadPosition):
    match dir:
      case 'R':
        currentHeadPosition['x'] = currentHeadPosition['x'] + 1
      case 'L':
        currentHeadPosition['x'] = currentHeadPosition['x'] - 1
      case 'U':
        currentHeadPosition['y'] = currentHeadPosition['y'] + 1
      case 'D':
        currentHeadPosition['y'] = currentHeadPosition['y'] - 1
      case _:
        raise ValueError('Direction not recognised.')
    return currentHeadPosition

def addCoordToList(coord):
    #print(tailCoordsList)
    for c in tailCoordsList:
        if (c['x'] == coord['x'] and c['y'] == coord['y']):
            return
    tailCoordsList.append(coord)

def handleCommand(dir, dis):
    disLeft = dis
    while (disLeft > 0):
        # Update head
        currentKnotStore["H"] = updateHead(dir, currentKnotStore["H"])

        # Update rest of knots
        for i in range(1, len(knotOrder), 1):
            #print('CurrentKnot={} previousknot={}'.format(knotOrder[i], knotOrder[i-1]))
            #print(currentKnotStore)
            currentKnotStore[knotOrder[i]] = updateKnot(currentKnotStore[knotOrder[i-1]], currentKnotStore[knotOrder[i]])

        # Update tail position list
        addCoordToList(dict(currentKnotStore["9"]))

        disLeft -= 1
        #previousKnotStore = currentKnotStore

for index, row in csvData.iterrows():
    dir = row[0]
    dis = row[1]
    handleCommand(dir, dis)

print(len(tailCoordsList))
