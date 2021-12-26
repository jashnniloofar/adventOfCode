const fs = require("fs");
let start = Date.now();
const input = fs.readFileSync("./input.txt").toString();

const visited = new Map();
visited.set("0,0", 1);
let x = 0;
let y = 0;
for (let index = 0; index < input.length; index++) {
    if (input[index] === ">") x++;
    else if (input[index] === "<") x--;
    else if (input[index] === "^") y++;
    else if (input[index] === "v") y--;
    visited.set(`${x},${y}`, 1);
}
console.log(`Answer: ${visited.size}`);
console.log(`Run time: ${Date.now() - start} ms`);
