const fs = require("fs");
let start = Date.now();
const input = fs.readFileSync("./input.txt").toString();
const instructions = input.split(/\r?\n/).map((ins) => ins.split(" "));
const state = { a: 0, b: 0, c: 1, d: 0 };
let index = 0;
while (index < instructions.length) {
    const [command, ...operands] = instructions[index];
    if (command === "cpy") {
        if (["a", "b", "c", "d"].includes(operands[0])) state[operands[1]] = state[operands[0]];
        else state[operands[1]] = parseInt(operands[0]);
    }
    if (command === "inc") state[operands[0]]++;
    if (command === "dec") state[operands[0]]--;
    if (command === "jnz" && state[operands[0]] !== 0) index += parseInt(operands[1]);
    else index++;
}

console.log(`Answer: ${state.a}`);
console.log(`Run time: ${Date.now() - start} ms`);
