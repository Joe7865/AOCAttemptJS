
import math

dataFile = open('.\Day11\data.csv', 'r')
lines = dataFile.readlines()

class monkey:
    def __init__(self, newId, newWorLevs):
        self.id = newId
        self.currentWorryLevs = newWorLevs

    def executeRound(self):
        for lev in self.currentWorryLevs:
            newLev = self.applyOp(lev)
            mThrow = self.monkeyToThrow(newLev)

            # TODO: Add lev to thrown monkeys list
            # TODO: remove lev from current monkeys list



    def applyOp(self, wLev):
        return math.floor((wLev + 1)/3) # TODO: how to do this
    
    def monkeyToThrow(self, wLev):
        if wLev % 17 == 0: # TODO
            return 0 # TODO
        else:
            return 1 # TODO


    
 
count = 0
# Strips the newline character
for line in lines:
    count += 1
    print("Line{}: {}".format(count, line.strip()))

