const fs = require("fs");
let start = Date.now();
const input = fs.readFileSync("./input.txt").toString();
const lines = input.split(/\r?\n/);


console.log(`Answer: ${lines.length}`);
console.log(`Run time: ${Date.now() - start} ms`);