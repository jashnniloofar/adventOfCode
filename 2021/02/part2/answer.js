const fs = require("fs");

const input = fs.readFileSync("./input.txt").toString();
const lines = input.split(/\r?\n/);

let aim = 0;
let depth = 0;
let horizontal = 0;
for (let index = 0; index < lines.length; index++) {
    const commandParts = lines[index].split(" ");
    const command = commandParts[0];
    const length = parseInt(commandParts[1]);
    if (command === "forward") {
        horizontal += length;
        depth += aim * length;
    }
    if (command === "down") {
        aim += length;
    }
    if (command === "up") {
        aim -= length;
    }
}

console.log(`Answer: ${horizontal * depth}`);
