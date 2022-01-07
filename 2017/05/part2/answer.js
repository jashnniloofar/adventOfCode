const fs = require("fs");
let start = Date.now();
const input = fs.readFileSync("./input.txt").toString();
const jumps = input.split(/\r?\n/).map((s) => parseInt(s));

let index = 0,
    step = 0;
while (index < jumps.length) {
    const jump = jumps[index]
    if (jumps[index] > 2) jumps[index]--;
    else jumps[index]++;
    index += jump;
    step++;
}

console.log(`Answer: ${step}`);
console.log(`Run time: ${Date.now() - start} ms`);