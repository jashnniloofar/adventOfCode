const fs = require("fs");

const input = fs.readFileSync("./input.txt").toString();
const lines = input.split(/\r?\n/);
function depthIncreased(lines, window) {
    let res = 0;
    for (let index = 0; index < lines.length - window; index++) {
        if (parseInt(lines[index + window]) > parseInt(lines[index])) res++;
    }
    return res;
}

console.log(`Answer: ${depthIncreased(lines, 3)}`);


