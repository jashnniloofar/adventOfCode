const fs = require("fs");
let start = Date.now();
const input = fs.readFileSync("./input.txt").toString().split(",").map(Number);

function run(memory, noun, verb) {
    memory[1] = noun;
    memory[2] = verb;

    let index = 0;
    while (memory[index] !== 99) {
        if (memory[index] === 1) memory[memory[index + 3]] = memory[memory[index + 2]] + memory[memory[index + 1]];
        if (memory[index] === 2) memory[memory[index + 3]] = memory[memory[index + 2]] * memory[memory[index + 1]];
        index += 4;
    }
    return memory[0];
}

const dif = 19690720 - run(input, 1, 1);
const noun = Math.floor(dif / 230400) + 1;
const verb = (dif % 230400) + 1;

console.log(`Answer: ${noun * 100 + verb}`);
console.log(`Run time: ${Date.now() - start} ms`);
