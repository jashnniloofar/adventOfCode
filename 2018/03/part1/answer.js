const fs = require("fs");
let start = Date.now();
const input = fs.readFileSync("./input.txt").toString();
const lines = input.split(/\r?\n/).map((line) =>
    line
        .match(/([0-9]+),([0-9]+): ([0-9]+)x([0-9]+)/)
        .slice(1)
        .map((s) => parseInt(s))
);

const map = [];
lines.forEach((line) => {
    const [col, row, width, height] = line;
    for (let i = col; i < col + width; i++) {
        if (map[i] === undefined) map[i] = [];
        for (let j = row; j < row + height; j++) {
            map[i][j] = (map[i][j] || 0) + 1;
        }
    }
});

console.log(`Answer: ${map.reduce((sum, arr) => sum + arr.reduce((a, b) => a + (b > 1), 0), 0)}`);
console.log(`Run time: ${Date.now() - start} ms`);
