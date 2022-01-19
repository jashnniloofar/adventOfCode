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

const instructions = [];
for (index = index + 2; index < lines.length; index++) {
    instructions.push(lines[index].match(/[0-9]+/g).map((s) => +s));
}

const cpu = [
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
    out[c] = cpu[code](a, b, input);
    return out;
}

function findConvert() {
    const guessList = [];
    for (let i = 0; i < 16; i++) {
        guessList[i] = [];
        for (let j = 0; j < 16; j++) {
            guessList[i][j] = j;
        }
    }

    for (const test of tests) {
        const out = test.output.join(",");
        const correctGuess = [];
        const code = test.ins[0];
        for (const guess of guessList[code]) {
            test.ins[0] = guess;
            if (run(test.ins, test.input).join(",") === out) correctGuess.push(guess);
        }
        guessList[code] = guessList[code].filter((g) => correctGuess.includes(g));
        if (guessList[code].length === 1) {
            for (let i = 0; i < guessList.length; i++) {
                if (i !== code) guessList[i] = guessList[i].filter((g) => g !== guessList[code][0]);
            }
        }
    }
    return guessList.map((g) => g[0]);
}

const convertTable = findConvert();
const registers = [0, 0, 0, 0];
for (const instraction of instructions) {
    const [code, a, b, c] = instraction;
    registers[c] = cpu[convertTable[code]](a, b, registers);
}

console.log(`Answer: ${registers[0]}`);
console.log(`Run time: ${Date.now() - start} ms`);
