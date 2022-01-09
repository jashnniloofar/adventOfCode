const fs = require("fs");
let start = Date.now();
const input = fs.readFileSync("./input.txt").toString();
let generators = input.split(/\r?\n/).map((line) => parseInt(line.match(/[0-9]+/)));
let count = 0;
for (let i = 0; i < 5000000; i++) {
    do {
        generators[0] = (generators[0] * 16807) % 2147483647;
    } while (generators[0] % 4 !== 0);
    do {
        generators[1] = (generators[1] * 48271) % 2147483647;
    } while (generators[1] % 8 !== 0);
    
    if (generators[0] % 65536 === generators[1] % 65536) count++;
}

console.log(`Answer: ${count}`);
console.log(`Run time: ${Date.now() - start} ms`);
