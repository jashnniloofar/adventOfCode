console.time("Run time");
const fs = require("fs");
const input = fs.readFileSync("./input.txt").toString();
const codes = input
    .split(/\r?\n/)
    .map((code) => seatId(code))
    .sort((a, b) => a - b);

function seatId(code) {
    code = code.replace(/[BR]/g, "1").replace(/[FL]/g, "0");
    return parseInt(code, 2);
}

function findSeatId(codes) {
    for (let i = 0; i < codes.length; i++) {
        if (codes[i] !== i + codes[0]) return codes[i] - 1;
    }
}

console.log(`Answer: ${findSeatId(codes)}`);
console.timeEnd("Run time");
