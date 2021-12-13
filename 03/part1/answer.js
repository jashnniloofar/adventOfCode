const fs = require("fs");

const input = fs.readFileSync("./input.txt").toString();
const lines = input.split(/\r?\n/);

const count = [];
for (let index = 0; index < 12; index++) {
    count[index] = 0;
}
for (let index = 0; index < lines.length; index++) {
    for (let i = 0; i < lines[i].length; i++) {
        if (lines[index].charAt(i) === "1") count[i]++;
    }
}
let gammaStr = "";
for (let index = 0; index < count.length; index++) {
    if (count[index] > lines.length / 2) gammaStr += "1";
    else gammaStr += "0";
}
const gamma = parseInt(gammaStr, 2);
const epsilon = parseInt("111111111111", 2) - gamma;

console.log(`Answer: ${gamma * epsilon}`);
