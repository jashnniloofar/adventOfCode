const fs = require("fs");
let start = Date.now();
const input = fs.readFileSync("./input.txt").toString();
let generators = input.split(/\r?\n/).map((line) => parseInt(line.match(/[0-9]+/)));
let count = 0;
for (let i = 0; i < 40000000; i++) {
    generators = [(generators[0] * 16807) % 2147483647, (generators[1] * 48271) % 2147483647];
    if (generators[0] % 65536 === generators[1] % 65536) count++;
}

console.log(`Answer: ${count}`);
console.log(`Run time: ${Date.now() - start} ms`);
