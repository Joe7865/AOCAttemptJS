import pandas as pd
csvData = pd.read_csv('.\Day10\data.csv', sep=" ", header=None, dtype = {'com': str, 'num': int})

cycle = 0
x = 1

# The signal strength is the cycle number multiplied by x
# noop takes 1 cycle and does nothing
# addx takes 2 cycles and adds the given number after these cycles are complete
monitor = []
currentMonitorLine = ""
currentLineIndex = 0
for index, row in csvData.iterrows():
    com = row[0]
    val = row[1]
    commandCycle = 0
    while((com == 'noop' and commandCycle != 1) or (com == 'addx' and commandCycle != 2)):
        cycle += 1
        commandCycle += 1
        currentLineIndex += 1
        if cycle % 40 == 0:
            monitor.append(currentMonitorLine)
            currentMonitorLine = ""
            currentLineIndex = 0
        if commandCycle == 2:
            x += val
        if currentLineIndex >= (x - 1) and currentLineIndex <= (x + 1):
            currentMonitorLine += "#"
        else:
            currentMonitorLine += "."

firstLine = True
for line in monitor:
    print(('#' + line) if firstLine else line)
    firstLine = False