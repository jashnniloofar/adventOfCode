const fs = require("fs");
let start = Date.now();
const input = fs.readFileSync("./input.txt").toString();
let valid = 0;
input.split(/\r?\n/).forEach((line) => {
    const sides = line
        .match(/ +[0-9]+/g)
        .map((s) => parseInt(s))
        .sort((a, b) => a - b);
    if (sides[0] + sides[1] > sides[2]) valid++;
});

console.log(`Answer: ${valid}`);
console.log(`Run time: ${Date.now() - start} ms`);
