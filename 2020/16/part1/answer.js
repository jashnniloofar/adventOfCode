console.time("Run time");
const fs = require("fs");
const input = fs.readFileSync("./input.txt").toString();
const ranges = [];
const tickets = [];
input.split(/\r?\n/).forEach((line) => {
    if (/or/.test(line)) {
        line.match(/\d+-\d+/g).forEach((range) => ranges.push(range.split("-").map(Number)));
    } else if (/,/.test(line)) {
        tickets.push(line.split(",").map(Number));
    }
});

function getError(ticket, ranges) {
    for (const number of ticket) {
        if (!isValid(number, ranges)) return number;
    }
    return 0;
}

function isValid(number, ranges) {
    for (const range of ranges) {
        const [min, max] = range;
        if (number >= min && number <= max) return true;
    }
    return false;
}

let errorRate = 0;
for (const ticket of tickets) {
    errorRate += getError(ticket, ranges);
}

console.log(`Answer: ${errorRate}`);
console.timeEnd("Run time");
