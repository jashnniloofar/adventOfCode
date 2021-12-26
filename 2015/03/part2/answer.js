const fs = require("fs");
let start = Date.now();
const input = fs.readFileSync("./input.txt").toString();

const visited = new Map();
visited.set("0,0", 1);
let positions = [
    [0, 0],
    [0, 0],
];
let turn = 0;
for (let index = 0; index < input.length; index++) {
    if (input[index] === ">") positions[turn][0]++;
    else if (input[index] === "<") positions[turn][0]--;
    else if (input[index] === "^") positions[turn][1]++;
    else if (input[index] === "v") positions[turn][1]--;
    visited.set(`${positions[turn][0]},${positions[turn][1]}`, 1);
    turn = (turn + 1) % 2;
}
console.log(`Answer: ${visited.size}`);
console.log(`Run time: ${Date.now() - start} ms`);
