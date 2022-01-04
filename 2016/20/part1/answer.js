const fs = require("fs");
let start = Date.now();
const input = fs.readFileSync("./input.txt").toString();
const blacklists = input
    .split(/\r?\n/)
    .map((line) => line.split("-").map((s) => parseInt(s)))
    .sort((a, b) => a[0] - b[0]);

function smallestValidIp() {
    let smallest = 1;
    while (blacklists.length > 0) {
        const [min, max] = blacklists.shift();
        if (min > smallest) return smallest;
        smallest = Math.max(smallest, max + 1);
    }
}

console.log(`Answer: ${smallestValidIp()}`);
console.log(`Run time: ${Date.now() - start} ms`);
