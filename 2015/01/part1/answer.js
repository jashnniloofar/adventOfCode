const fs = require("fs");
let start = Date.now();
const input = fs.readFileSync("./input.txt").toString();

console.log(`Answer: ${input.split("(").length - input.split(")").length}`);
console.log(`Run time: ${Date.now() - start} ms`);