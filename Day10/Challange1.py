import pandas as pd
csvData = pd.read_csv('.\Day10\data.csv', sep=" ", header=None, dtype = {'com': str, 'num': int})
#print(csvData.head()) # to display the first 5 lines of loaded data

cycle = 0
x = 1
cyclesOfInterest = [20,60,100,140,180,220]
signalSum = 0
# The signal strength is the cycle number multiplied by x
# noop takes 1 cycle and does nothing
# addx takes 2 cycles and adds the given number after these cycles are complete

for index, row in csvData.iterrows():
    com = row[0]
    val = row[1]
    commandCycle = 0
    while((com == 'noop' and commandCycle != 1) or (com == 'addx' and commandCycle != 2)):
        cycle += 1
        commandCycle += 1
        if cycle in cyclesOfInterest:
            signalSum += (cycle * x)
            print("SignalStrength={0} cycle={1} x={2}".format((cycle * x), cycle, x))
        if commandCycle == 2:
            x += val

print(signalSum) 