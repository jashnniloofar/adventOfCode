const fs = require("fs");
let start = Date.now();
const input = fs.readFileSync("./input.txt").toString();
const blacklists = input
    .split(/\r?\n/)
    .map((line) => line.split("-").map((s) => parseInt(s)))
    .sort((a, b) => a[0] - b[0]);

function countValidIp() {
    let count = 0;
    let smallest = 0;
    while (blacklists.length > 0) {
        const [min, max] = blacklists.shift();
        if (min > smallest) count += min - smallest;
        smallest = Math.max(smallest, max + 1);
    }
    count += 4294967296 - smallest;
    return count;
}

console.log(`Answer: ${countValidIp()}`);
console.log(`Run time: ${Date.now() - start} ms`);