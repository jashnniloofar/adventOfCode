const fs = require("fs");
let start = Date.now();
const input = fs.readFileSync("./input.txt").toString();
const lines = input.split(/\r?\n/).map((line) => line.split(": ").map((s) => parseInt(s)));

function isCaughtScanner(range, time) {
    return time % ((range - 1) * 2) === 0;
}

function isCaught(delay) {
    for (const line of lines) {
        const [layer, range] = line;
        if (isCaughtScanner(range, layer + delay)) return true;
    }
    return false;
}

let delay = 0;
while (isCaught(delay)) {
    delay++;
}

console.log(`Answer: ${delay}`);
console.log(`Run time: ${Date.now() - start} ms`);
