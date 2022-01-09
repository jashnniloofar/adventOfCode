const fs = require("fs");
let start = Date.now();
const input = fs.readFileSync("./input.txt").toString();
const instructions = input.split(/\r?\n/).map((line) => line.split(" "));
const state = {};

function getValue(operand) {
    return /[0-9]+/.test(operand) ? parseInt(operand) : state[operand] !== undefined ? state[operand] : 0;
}
function getSound() {
    let index = 0;
    while (index < instructions.length) {
        const [command, ...operands] = instructions[index];
        if (command === "set") state[operands[0]] = getValue(operands[1]);
        if (command === "mul") state[operands[0]] = getValue(operands[0]) * getValue(operands[1]);
        if (command === "add") state[operands[0]] = getValue(operands[0]) + getValue(operands[1]);
        if (command === "mod") state[operands[0]] = getValue(operands[0]) % getValue(operands[1]);
        if (command === "snd") state.sound = getValue(operands[0]);
        if (command === "rcv" && getValue(operands[0]) !== 0) return state.sound;
        if (command === "jgz" && getValue(operands[0]) > 0) index += getValue(operands[1]);
        else index++;
    }
}

console.log(`Answer: ${getSound()}`);
console.log(`Run time: ${Date.now() - start} ms`);
