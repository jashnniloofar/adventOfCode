console.time("Run time");
const fs = require("fs");
const input = fs.readFileSync("./input.txt").toString();

let yesAnswers = {};
let sum = 0;
let groupCount = 0;
input.split(/\r?\n/).forEach((line) => {
    if (line.length > 0) {
        groupCount++;
        line.split("").forEach((answer) => {
            yesAnswers[answer] = (yesAnswers[answer] || 0) + 1;
        });
    } else {
        sum += Object.values(yesAnswers).filter((v) => v === groupCount).length;
        groupCount = 0;
        yesAnswers = {};
    }
});
sum += Object.values(yesAnswers).filter((v) => v === groupCount).length;

console.log(`Answer: ${sum}`);
console.timeEnd("Run time");
