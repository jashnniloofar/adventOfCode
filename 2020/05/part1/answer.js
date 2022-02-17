console.time("Run time");
const fs = require("fs");
const input = fs.readFileSync("./input.txt").toString();
const codes = input.split(/\r?\n/);

function seatId(code) {
    code = code.replace(/[BR]/g, "1").replace(/[FL]/g, "0");
    return parseInt(code, 2);
}

console.log(`Answer: ${codes.reduce((max, code) => Math.max(max, seatId(code)), 0)}`);
console.timeEnd("Run time");
