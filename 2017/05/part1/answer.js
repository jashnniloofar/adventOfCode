const fs = require("fs");
let start = Date.now();
const input = fs.readFileSync("./input.txt").toString();
const jumps = input.split(/\r?\n/).map((s) => parseInt(s));

let index = 0,
    step = 0;
while (index < jumps.length) {
    index += jumps[index]++;
    step++;
}

console.log(`Answer: ${step}`);
console.log(`Run time: ${Date.now() - start} ms`);
