console.time("Run time");
const fs = require("fs");
const input = fs.readFileSync("./input.txt").toString();

function maskValue(value, mask) {
    const binary = value.toString(2).padStart(mask.length, 0);
    const out = [];
    for (let i = 0; i < mask.length; i++) {
        out[i] = mask[i] !== "X" ? mask[i] : binary[i];
    }
    return parseInt(out.join(""), 2);
}

let mem = {};
let mask = "";
input.split(/\r?\n/).forEach((line) => {
    if (line.indexOf("mask") === 0) {
        mask = line.split(" = ")[1];
    } else if (line.indexOf("mem") === 0) {
        const [address, value] = line.match(/\d+/g).map(Number);
        mem[address] = maskValue(value, mask);
    }
});

let sum = 0;
for (let addr in mem) {
    sum += mem[addr];
}

console.log(`Answer: ${sum}`);
console.timeEnd("Run time");
