const fs = require("fs");
let start = Date.now();
const input = fs.readFileSync("./input.txt").toString();
const lines = input.split(/\r?\n/).map((line) => line.split(": ").map((s) => parseInt(s)));

function isCaughtScanner(range, time) {
    return time % ((range - 1) * 2) === 0;
}

let severity = 0;
for (const line of lines) {
    const [layer, range] = line;
    if (isCaughtScanner(range, layer)) severity += range * layer;
}

console.log(`Answer: ${severity}`);
console.log(`Run time: ${Date.now() - start} ms`);
