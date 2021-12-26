const fs = require("fs");

const input = fs.readFileSync("./input.txt").toString();
const lines = input.split(/\r?\n/);

function replaceAdjacentChunks(str) {
    return str.replace(/\{\}/g, "").replace(/\(\)/g, "").replace(/\<\>/g, "").replace(/\[\]/g, "");
}

let scores = [];
lines.forEach((line) => {
    while (line !== replaceAdjacentChunks(line)) {
        line = replaceAdjacentChunks(line);
    }
    if (!line.match(/[\]\}\>\)]/)) {
        let score = 0;
        for (let index = line.length - 1; index >= 0; index--) {
            line.charAt(index);
            score *= 5;
            if (line.charAt(index) === "(") score += 1;
            if (line.charAt(index) === "[") score += 2;
            if (line.charAt(index) === "{") score += 3;
            if (line.charAt(index) === "<") score += 4;
        }
        scores.push(score);
    }
});

scores = scores.sort((a, b) => a - b);

console.log(`Answer: ${scores[Math.floor(scores.length / 2)]}`);
