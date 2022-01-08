const fs = require("fs");
let start = Date.now();
const input = fs
    .readFileSync("./input.txt")
    .toString()
    .replace(/\!./g, "")
    .replace(/<[^>]*>/g, "");

let groupValue = 0;
let sum = 0;
for (let i = 0; i < input.length; i++) {
    if (input[i] === "{") groupValue++;
    if (input[i] === "}") {
        sum += groupValue;
        groupValue--;
    }
}

console.log(`Answer: ${sum}`);
console.log(`Run time: ${Date.now() - start} ms`);
