const fs = require("fs");
let start = Date.now();
const input = fs.readFileSync("./input.txt").toString();
const disks = input.split(/\r?\n/).map((line) =>
    line
        .match(/ ([0-9]+) .* ([0-9]+)\./)
        .splice(1)
        .map((s) => parseInt(s))
);

let diskId = 1;
let counter = 1;
let index = 0;
for (const disk of disks) {
    while ((index + diskId + disk[1]) % disk[0] !== 0) {
        index += counter;
    }
    diskId++;
    counter = counter * disk[0];
}

console.log(`Answer: ${index}`);
console.log(`Run time: ${Date.now() - start} ms`);
