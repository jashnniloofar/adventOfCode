console.time("Run time");
const fs = require("fs");
const input = fs.readFileSync("./input.txt").toString();

let yesAnswers = {};
let sum = 0;
input.split(/\r?\n/).forEach((line) => {
    if (line.length > 0) {
        line.split("").forEach((answer) => {
            yesAnswers[answer] = (yesAnswers[answer] || 0) + 1;
        });
    } else {
        sum += Object.keys(yesAnswers).length;
        yesAnswers = {};
    }
});
sum += Object.keys(yesAnswers).length;

console.log(`Answer: ${sum}`);
console.timeEnd("Run time");
