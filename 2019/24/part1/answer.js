const fs = require("fs");

function tick(pattern) {
    let out = [];
    for (let y = 0; y < pattern.length; y++) {
        out[y] = "";
        for (let x = 0; x < pattern.length; x++) {
            const adj =
                (pattern[y][x - 1] === "#") +
                (pattern[y][x + 1] === "#") +
                (pattern[y - 1] != undefined && pattern[y - 1][x] === "#") +
                (pattern[y + 1] != undefined && pattern[y + 1][x] === "#");
            if (pattern[y][x] === ".") {
                if (adj === 1 || adj === 2) out[y] += "#";
                else out[y] += ".";
            } else {
                if (adj === 1) out[y] += "#";
                else out[y] += ".";
            }
        }
    }
    return out;
}

function getValue(pattern) {
    return parseInt(pattern.join("").split("").reverse().join("").replace(/#/g, "1").replace(/\./g, "0"), 2);
}

function solve() {
    let input = fs.readFileSync("./input.txt").toString().split(/\r?\n/);
    const visited = new Set();
    while (!visited.has(input.join(""))) {
        visited.add(input.join(""));
        input = tick(input);
    }
    return getValue(input);
}

console.time("Run time");
console.log(`Answer: ${solve()}`);
console.timeEnd("Run time");