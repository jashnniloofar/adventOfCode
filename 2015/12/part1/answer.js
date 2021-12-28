const fs = require("fs");
let start = Date.now();
const input = fs.readFileSync("./input.txt").toString();
let sum = 0;
input.match(/\-?[0-9]+/g).forEach((s) => (sum += parseInt(s)));

console.log(`Answer: ${sum}`);
console.log(`Run time: ${Date.now() - start} ms`);
