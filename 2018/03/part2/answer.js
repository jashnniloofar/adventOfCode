const fs = require("fs");
let start = Date.now();
const input = fs.readFileSync("./input.txt").toString();
const lines = input.split(/\r?\n/).map((line) =>
    line
        .match(/([0-9]+),([0-9]+): ([0-9]+)x([0-9]+)/)
        .slice(1)
        .map((s) => parseInt(s))
);

function notOverlap() {
    for (let i = 0; i < lines.length; i++) {
        const [c, r, w, h] = lines[i];
        let overlap = false;
        let j = 0;
        while (j < lines.length && !overlap) {
            if (j !== i) {
                const [nextC, nextR, nextW, nextH] = lines[j];
                if (!(c >= nextC + nextW || nextC >= c + w || nextR >= r + h || r >= nextR + nextH)) overlap = true;
            }
            j++;
        }
        if (!overlap) return i + 1;
    }
}

console.log(`Answer: ${notOverlap()}`);
console.log(`Run time: ${Date.now() - start} ms`);
