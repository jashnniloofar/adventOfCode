const fs = require("fs");

const input = fs.readFileSync("./input.txt").toString();
const lines = input.split(/\r?\n/);

let x = 0;
let y = 0;
function readCommand(command) {
    const part = command.split(" ");
    return { command: part[0], length: parseInt(part[1]) };
}
for (let index = 0; index < lines.length; index++) {
    const commandParts = lines[index].split(" ");
    const command = commandParts[0];
    const length = parseInt(commandParts[1]);
    if (command === "forward") x = x + length;
    if (command === "down") y = y + length;
    if (command === "up") y = y - length;
}

console.log(`Answer: ${x * y}`);
