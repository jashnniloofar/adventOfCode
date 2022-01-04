const fs = require("fs");
let start = Date.now();
const input = fs.readFileSync("./input.txt").toString();

function solve(steps) {
    let safeCount = input.split(".").length - 1;
    let current = "." + input + ".";
    for (let row = 1; row < steps; row++) {
        let next = "";
        for (let index = 0; index < input.length; index++) {
            if (["^^.", ".^^", "^..", "..^"].includes(current.substr(index, 3))) next += "^";
            else next += ".";
        }
        safeCount += next.split(".").length - 1;
        current = "." + next + ".";
    }
    return safeCount;
}

console.log(`Answer: ${solve(40)}`);
console.log(`Run time: ${Date.now() - start} ms`);
