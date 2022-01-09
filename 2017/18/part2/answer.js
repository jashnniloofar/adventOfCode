const fs = require("fs");
let start = Date.now();
const input = fs.readFileSync("./input.txt").toString();
const instructions = input.split(/\r?\n/).map((line) => line.split(" "));
const states = [
    { snd: 0, ins: 0, p: 0 },
    { snd: 0, ins: 0, p: 1 },
];
const queues = [[], []];

function getValue(operand, state) {
    return /[0-9]+/.test(operand) ? parseInt(operand) : state[operand] !== undefined ? state[operand] : 0;
}

function run(id) {
    const state = states[id];
    while (state.ins < instructions.length) {
        const [command, ...operands] = instructions[state.ins];
        if (command === "set") state[operands[0]] = getValue(operands[1], state);
        if (command === "mul") state[operands[0]] = getValue(operands[0], state) * getValue(operands[1], state);
        if (command === "add") state[operands[0]] = getValue(operands[0], state) + getValue(operands[1], state);
        if (command === "mod") state[operands[0]] = getValue(operands[0], state) % getValue(operands[1], state);
        if (command === "snd") {
            state.snd++;
            queues[(id + 1) % 2].push(getValue(operands[0], state));
        }
        if (command === "rcv") {
            if (queues[id].length === 0) return;
            else state[operands[0]] = queues[id].shift();
        }
        if (command === "jgz" && getValue(operands[0], state) > 0) state.ins += getValue(operands[1], state);
        else state.ins++;
    }
}

do {
    run(0);
    run(1);
} while (queues[0].length > 0 || queues[0].length > 0);

console.log(`Answer: ${states[1].snd}`);
console.log(`Run time: ${Date.now() - start} ms`);
