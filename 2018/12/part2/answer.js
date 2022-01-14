const fs = require("fs");
let start = Date.now();
const input = fs.readFileSync("./input.txt").toString();
const lines = input.split(/\r?\n/);
const initialState = lines[0].match(/[#\.]+/) + "";
const rules = {};
for (let i = 2; i < lines.length; i++) {
    const pair = lines[i].split(" => ");
    rules[pair[0]] = pair[1];
}

function nextGen(current) {
    let start = 0;
    while (!current.startsWith("....")) {
        current = "." + current;
        start++;
    }
    while (!current.endsWith("....")) {
        current = current + ".";
    }
    let next = "";
    for (let i = 0; i < current.length - 4; i++) {
        next += rules[current.substr(i, 5)];
    }
    return [next, start - 2];
}

function sumGen(current, count) {
    let index = 0;
    for (let i = 0; i < count; i++) {
        const [next, start] = nextGen(current);
        current = next;
        index += start;
    }
    return current.split("").reduce((sum, v, i) => sum + (v === "#" ? i - index : 0), 0);
}

let current = initialState;
let next = initialState;
let i = 0;
do {
    current = next;
    next = nextGen(current)[0];
    i++;
} while (next !== current);

const sum = (sumGen(initialState, i + 1) - sumGen(initialState, i)) * (50000000000 - i) + sumGen(initialState, i);

console.log(`Answer: ${sum}`);
console.log(`Run time: ${Date.now() - start} ms`);
