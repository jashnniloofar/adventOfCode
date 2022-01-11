const fs = require("fs");
let start = Date.now();
const input = fs.readFileSync("./input.txt").toString();
const instructions = input.split(/\r?\n/).map((line) => line.split(" "));

const state = { a: 0, b: 0, c: 0, d: 0, e: 0, f: 0, g: 0, h: 0 };

function getValue(operand) {
    return /[0-9]+/.test(operand) ? parseInt(operand) : state[operand];
}
function run() {
    let mulCount = 0;
    let index = 0;
    while (index < instructions.length) {
        const [command, ...operands] = instructions[index];
        if (command === "set") state[operands[0]] = getValue(operands[1]);
        if (command === "mul") {
            mulCount++;
            state[operands[0]] = getValue(operands[0]) * getValue(operands[1]);
        }
        if (command === "sub") state[operands[0]] = getValue(operands[0]) - getValue(operands[1]);
        if (command === "jnz" && getValue(operands[0]) !== 0) index += getValue(operands[1]);
        else index++;
    }
    return mulCount
}

console.log(run());
console.log(`Answer: ${instructions.length}`);
console.log(`Run time: ${Date.now() - start} ms`);
