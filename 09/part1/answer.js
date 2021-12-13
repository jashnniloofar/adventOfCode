const fs = require("fs");

const input = fs.readFileSync("./input.txt").toString();
const lines = input.split(/\r?\n/);
const map = [];
lines.forEach((line) => {
    map.push(line.split(""));
});

let riskSum = 0;

for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map[i].length; j++) {
        let isLow = true;
        if (j > 0 && map[i][j] >= map[i][j - 1]) isLow = false;
        if (j < map[i].length - 1 && map[i][j] >= map[i][j + 1]) isLow = false;
        if (i > 0 && map[i][j] >= map[i - 1][j]) isLow = false;
        if (i < map.length - 1 && map[i][j] >= map[i + 1][j]) isLow = false;
        if (isLow) {
            riskSum += parseInt(map[i][j]) + 1;
        }
    }
}
console.log(`Answer: ${riskSum}`);
