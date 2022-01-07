const fs = require("fs");
let start = Date.now();
const input = fs.readFileSync("./input.txt").toString();
const blocks = input.split("\t").map((s) => parseInt(s));
const map = new Map();
let step = 0;
while (!map.has(blocks.join(","))) {
    map.set(blocks.join(","), 1);
    const max = Math.max(...blocks);
    const index = blocks.findIndex((block) => block === max);
    blocks[index] = 0;
    for (let i = 1; i <= max; i++) {
        blocks[(index + i) % blocks.length]++;
    }
    step++;
}

console.log(`Answer: ${step}`);
console.log(`Run time: ${Date.now() - start} ms`);
