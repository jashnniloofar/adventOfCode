const fs = require("fs");
let start = Date.now();
const input = fs.readFileSync("./input.txt").toString();

function isOpposite(a, b) {
    return a !== b && a.toLowerCase() == b.toLowerCase();
}

function reactionLength(input) {
    const stack = [];
    for (const char of input) {
        if (stack.length > 0 && isOpposite(char, stack[stack.length - 1])) {
            stack.pop();
        } else {
            stack.push(char);
        }
    }
    return stack.length;
}

console.log(`Answer: ${reactionLength(input)}`);
console.log(`Run time: ${Date.now() - start} ms`);
