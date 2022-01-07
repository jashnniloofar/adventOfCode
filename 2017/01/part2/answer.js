const fs = require("fs");
let start = Date.now();
const input = fs.readFileSync("./input.txt").toString();
let sum = 0;
for (let i = 0; i < input.length; i++) {
    if (input[i] === input[(i + input.length / 2) % input.length]) sum += parseInt(input[i]);
}

console.log(`Answer: ${sum}`);
console.log(`Run time: ${Date.now() - start} ms`);
