const fs = require("fs");
let start = Date.now();
let sum = 0;
fs.readFileSync("./input.txt")
    .toString()
    .replace(/\!./g, "")
    .match(/<[^>]*>/g)
    .forEach((str) => (sum += str.length - 2));

console.log(`Answer: ${sum}`);
console.log(`Run time: ${Date.now() - start} ms`);
