const fs = require("fs");
let start = Date.now();
const input = fs.readFileSync("./input.txt").toString();
const lines = input.split(/\r?\n/);
const tests = [];
let index = 0;
while (lines[index].substring("Before")) {
    tests.push({
        input: lines[index].match(/[0-9]+/g).map((s) => +s),
        ins: lines[index + 1].match(/[0-9]+/g).map((s) => +s),
        output: lines[index + 2].match(/[0-9]+/g).map((s) => +s),
    });
    index += 4;
}

const instructions = [
    (a, b, reg) => reg[a] + reg[b],
    (a, b, reg) => reg[a] + b,
    (a, b, reg) => reg[a] * reg[b],
    (a, b, reg) => reg[a] * b,
    (a, b, reg) => reg[a] & reg[b],
    (a, b, reg) => reg[a] & b,
    (a, b, reg) => reg[a] | reg[b],
    (a, b, reg) => reg[a] | b,
    (a, b, reg) => reg[a],
    (a, b, reg) => a,
    (a, b, reg) => (reg[a] > reg[b] ? 1 : 0),
    (a, b, reg) => (reg[a] > b ? 1 : 0),
    (a, b, reg) => (a > reg[b] ? 1 : 0),
    (a, b, reg) => (reg[a] === reg[b] ? 1 : 0),
    (a, b, reg) => (reg[a] === b ? 1 : 0),
    (a, b, reg) => (a === reg[b] ? 1 : 0),
];
function run(ins, input) {
    const [code, a, b, c] = ins;
    const out = input.slice();
    out[c] = instructions[code](a, b, input);
    return out;
}

let result = 0;
for (const test of tests) {
    const out = test.output.join(",");
    let count = 0;
    for (let code = 0; code < 15; code++) {
        test.ins[0] = code;
        count += run(test.ins, test.input).join(",") === out;
    }
    if (count > 2) result++;
}

console.log(`Answer: ${result}`);
console.log(`Run time: ${Date.now() - start} ms`);
