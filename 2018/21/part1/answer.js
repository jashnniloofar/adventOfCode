const fs = require("fs");
let start = Date.now();
const input = fs.readFileSync("./input.txt").toString();
let ip = 0;
const instructions = [];
input.split(/\r?\n/).forEach((line) => {
    if (line.startsWith("#ip")) ip = +line[4];
    else {
        instructions.push(line.split(" ").map((a, i) => (i > 0 ? +a : a)));
    }
});

const cpu = {
    addr: (a, b, reg) => reg[a] + reg[b],
    addi: (a, b, reg) => reg[a] + b,
    mulr: (a, b, reg) => reg[a] * reg[b],
    muli: (a, b, reg) => reg[a] * b,
    banr: (a, b, reg) => reg[a] & reg[b],
    bani: (a, b, reg) => reg[a] & b,
    borr: (a, b, reg) => reg[a] | reg[b],
    bori: (a, b, reg) => reg[a] | b,
    setr: (a, b, reg) => reg[a],
    seti: (a, b, reg) => a,
    gtir: (a, b, reg) => (a > reg[b] ? 1 : 0),
    gtri: (a, b, reg) => (reg[a] > b ? 1 : 0),
    gtrr: (a, b, reg) => (reg[a] > reg[b] ? 1 : 0),
    eqir: (a, b, reg) => (a === reg[b] ? 1 : 0),
    eqri: (a, b, reg) => (reg[a] === b ? 1 : 0),
    eqrr: (a, b, reg) => (reg[a] === reg[b] ? 1 : 0),
};
function run(reg) {
    let index = 0;
    while (index < instructions.length) {
        const [code, a, b, c] = instructions[index];
        reg[ip] = index;
        reg[c] = cpu[code](a, b, reg);
        index = reg[ip];
        if (index === 28) {
            return reg[a];
        }
        index++;
    }
    return reg;
}

console.log(`Answer: ${run([0, 0, 0, 0, 0, 0])}`);
console.log(`Run time: ${Date.now() - start} ms`);
