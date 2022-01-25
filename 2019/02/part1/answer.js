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

console.log(`Answer: ${run(input, 12, 2)}`);
console.log(`Run time: ${Date.now() - start} ms`);
