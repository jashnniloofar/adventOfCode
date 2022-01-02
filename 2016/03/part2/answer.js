const fs = require("fs");
let start = Date.now();
const input = fs.readFileSync("./input.txt").toString();

let valid = 0;
const lines = input.split(/\r?\n/).map((line) => line.match(/ +[0-9]+/g).map((s) => parseInt(s)));

function isValid(sides) {
    sides = sides.sort((a, b) => a - b);
    return sides[0] + sides[1] > sides[2];
}

for (let i = 0; i < lines.length; i = i + 3) {
    valid =
        valid +
        isValid([lines[i][0], lines[i + 1][0], lines[i + 2][0]]) +
        isValid([lines[i][1], lines[i + 1][1], lines[i + 2][1]]) +
        isValid([lines[i][2], lines[i + 1][2], lines[i + 2][2]]);
}

console.log(`Answer: ${valid}`);
console.log(`Run time: ${Date.now() - start} ms`);
