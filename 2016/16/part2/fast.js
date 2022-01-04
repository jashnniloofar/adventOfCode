const fs = require("fs");
let start = Date.now();
const input = fs
    .readFileSync("./input.txt")
    .toString()
    .split("")
    .map((c) => parseInt(c));

function solve(input, len) {
    while (input.length < len) {
        input = input.concat([0]).concat(input.reverse().map((a) => (a === 0 ? 1 : 0)));
    }

    while (len % 2 === 0) {
        for (let i = 0, j = 0; i < len; i += 2, j++) {
            input[j] = input[i] ^ (input[i + 1] === 1) ? 0 : 1;
        }
        len = len / 2;
    }
    return input.join("").substr(0, len);
}

console.log(`Answer: ${solve(input, 272)}`);
console.log(`Answer: ${solve(input, 35651584)}`);
console.log(`Run time: ${Date.now() - start} ms`);
