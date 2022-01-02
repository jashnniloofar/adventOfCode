const fs = require("fs");
let start = Date.now();
const input = fs.readFileSync("./input.txt").toString();
const instructions = input.split(/\r?\n/);
const keypad = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
];

let current = [1, 1];
let code = ""
for (const instruction of instructions) {
    for (let i = 0; i < instruction.length; i++) {
        if (instruction[i] === "R" && current[1] < 2) current[1]++;
        if (instruction[i] === "L" && current[1] > 0) current[1]--;
        if (instruction[i] === "D" && current[0] < 2) current[0]++;
        if (instruction[i] === "U" && current[0] > 0) current[0]--;
    }
    code = code + keypad[current[0]] [current[1]];
}

console.log(`Answer: ${code}`);
console.log(`Run time: ${Date.now() - start} ms`);
