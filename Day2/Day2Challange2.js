const fs = require("fs");
const csv = require("csv-parser");

// Accept Opponents letter and the required outcome then calculate score
function calculateScore(OppShape, RequiredOutcome) {
    const scoreOnRequiredOutcome = { 
        'A' : {'X' : 0 + 3, 'Y' : 3 + 1, 'Z' : 6 + 2}, 
        'B' : {'X' : 0 + 1, 'Y' : 3 + 2, 'Z' : 6 + 3},
        'C' : {'X' : 0 + 2, 'Y' : 3 + 3, 'Z' : 6 + 1}
    }
    return scoreOnRequiredOutcome[OppShape][RequiredOutcome]
}

const parsedData = [];  
fs.createReadStream('./Day2/data.csv')
    .pipe(csv({headers : ["Opponent", "Mine"], separator : " "})) // Parsed using the https://www.npmjs.com/package/csv-parser library
    .on('data', (data) => parsedData.push(data))
    .on('end', () => {
        //Parsed data in this format: [{ Opponent: 'A', Mine: 'Y' }, ...]
        let myTotal = 0;
        parsedData.forEach((turn) => myTotal += calculateScore(turn.Opponent, turn.Mine));
        console.log(myTotal);
  });



