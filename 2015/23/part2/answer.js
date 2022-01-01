const fs = require("fs");
let start = Date.now();
const input = fs.readFileSync("./input.txt").toString().replace(/,/g, "");
const instructions = input.split(/\r?\n/).map((line) => line.split(" "));

let index = 0;
const registers = { a: 1, b: 0 };
while (index < instructions.length) {
    const instruction = instructions[index];
    switch (instruction[0]) {
        case "hlf":
            registers[instruction[1]] = Math.floor(registers[instruction[1]] / 2);
            index++;
            break;
        case "tpl":
            registers[instruction[1]] = registers[instruction[1]] * 3;
            index++;
            break;
        case "inc":
            registers[instruction[1]] = registers[instruction[1]] + 1;
            index++;
            break;
        case "jmp":
            index = index + parseInt(instruction[1]);
            break;
        case "jie":
            if (registers[instruction[1]] % 2 === 0) index = index + parseInt(instruction[2]);
            else index++;
            break;
        case "jio":
            if (registers[instruction[1]] === 1) index = index + parseInt(instruction[2]);
            else index++;
            break;  
        default:
            break;
    }
}

console.log(`Answer: ${registers.b}`);
console.log(`Run time: ${Date.now() - start} ms`);
