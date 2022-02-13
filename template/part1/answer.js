const fs = require("fs");
const input = fs.readFileSync("./input.txt").toString();
const lines = input.split(/\r?\n/);

console.time("Run time");
console.log(`Answer: ${lines.length}`);
console.timeEnd("Run time");
