const fs = require("fs");
const input = fs.readFileSync("./input.txt").toString();
const lines = input.split(/\r?\n/).map((line) => line.split(": "));

function solve() {
    let validPasswords = 0;
    for (const line of lines) {
        const [rule, password] = line;
        const [range, ch] = rule.split(" ");
        const [min, max] = range.split("-").map(Number);
        const count = password.split(ch).length - 1;
        if (count >= min && count <= max) validPasswords++;
    }
    return validPasswords;
}

console.time("Run time");
console.log(`Answer: ${solve()}`);
console.timeEnd("Run time");
