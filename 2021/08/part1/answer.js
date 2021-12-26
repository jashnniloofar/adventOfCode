const fs = require("fs");

const input = fs.readFileSync("./input.txt").toString();
const lines = input.split(/\r?\n/);
let count = 0;
lines.forEach((line) => {
    const outputs = line.split(" | ")[1].split(" ");
    outputs.forEach((output) => {
        if (output.length === 2 || output.length === 3 || output.length === 4 || output.length === 7) count++;
    });
});

console.log(`Answer: ${count}`);
