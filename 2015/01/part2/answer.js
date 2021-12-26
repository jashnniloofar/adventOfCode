const fs = require("fs");
let start = Date.now();
const input = fs.readFileSync("./input.txt").toString();

let floor = 0;
let pos = 0;
for (pos = 0; pos < input.length && floor !== -1; pos++) {
    if (input[pos] === "(") floor++;
    if (input[pos] === ")") floor--;
}
console.log(`Answer: ${pos}`);
console.log(`Run time: ${Date.now() - start} ms`);
