const fs = require("fs");
let start = Date.now();
const input = fs.readFileSync("./input.txt").toString();
const instructions = input.split(/\r?\n/);
const keypad = [
    ["0", "0", "0", "0", "0", "0", "0"],
    ["0", "0", "0", "1", "0", "0", "0"],
    ["0", "0", "2", "3", "4", "0", "0"],
    ["0", "5", "6", "7", "8", "9", "0"],
    ["0", "0", "A", "B", "C", "0", "0"],
    ["0", "0", "0", "D", "0", "0", "0"],
    ["0", "0", "0", "0", "0", "0", "0"],
];

let current = [3, 1];
let code = "";
for (const instruction of instructions) {
    for (let i = "0"; i < instruction.length; i++) {
        if (instruction[i] === "R" && keypad[current[0]][current[1] + 1] !== "0") current[1]++;
        if (instruction[i] === "L" && keypad[current[0]][current[1] - 1] !== "0") current[1]--;
        if (instruction[i] === "D" && keypad[current[0] + 1][current[1]] !== "0") current[0]++;
        if (instruction[i] === "U" && keypad[current[0] - 1][current[1]] !== "0") current[0]--;
    }
    code = code + keypad[current[0]][current[1]];
}

console.log(`Answer: ${code}`);
console.log(`Run time: ${Date.now() - start} ms`);
