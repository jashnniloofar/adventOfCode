const fs = require("fs");
const input = fs.readFileSync("./input.txt").toString();
const lines = input.split(/\r?\n/).map((line) => line.split(": "));

function solve() {
    let validPasswords = 0;
    for (const line of lines) {
        const [rule, password] = line;
        const [range, ch] = rule.split(" ");
        const [i, j] = range.split("-").map(Number);
        if ((password[i - 1] === ch) ^ (password[j - 1] === ch)) validPasswords++;
    }
    return validPasswords;
}

console.time("Run time");
console.log(`Answer: ${solve()}`);
console.timeEnd("Run time");
