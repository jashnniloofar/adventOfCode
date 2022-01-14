const fs = require("fs");
let start = Date.now();
const input = fs.readFileSync("./input.txt").toString();

const alpha = "abcdefghijklmnopqrstuvwxyz";
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
let min = Number.MAX_SAFE_INTEGER;
for (const char of alpha) {
    min = Math.min(min, reactionLength(input.replace(new RegExp(char, "g"), "").replace(new RegExp(char.toUpperCase(), "g"), "")));
}

console.log(`Answer: ${min}`);
console.log(`Run time: ${Date.now() - start} ms`);
