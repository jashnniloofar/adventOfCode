const fs = require("fs");
let start = Date.now();
const input = fs.readFileSync("./input.txt").toString();
let count = parseInt(input);

let num = "1";
while (count > 1) {
    num = (count % 2) + num;
    count = Math.floor(count / 2);
}

console.log(`Answer: ${parseInt(num, 2)}`);
console.log(`Run time: ${Date.now() - start} ms`);
