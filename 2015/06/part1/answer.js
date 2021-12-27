const fs = require("fs");
let start = Date.now();
const input = fs.readFileSync("./input.txt").toString();
const map = [];
for (let i = 0; i < 1000; i++) {
    map[i] = [];
    for (let j = 0; j < 1000; j++) {
        map[i][j] = false;
    }
}
const lines = input.split(/\r?\n/).map((line) => {
    const [x1, y1, x2, y2] = line.match(/[0-9]+/g).map((p) => parseInt(p));
    if (line.startsWith("turn on")) {
        for (let i = x1; i <= x2; i++) {
            for (let j = y1; j <= y2; j++) {
                map[i][j] = true;
            }
        }
    } else if (line.startsWith("turn off")) {
        for (let i = x1; i <= x2; i++) {
            for (let j = y1; j <= y2; j++) {
                map[i][j] = false;
            }
        }
    } else {
        for (let i = x1; i <= x2; i++) {
            for (let j = y1; j <= y2; j++) {
                map[i][j] = !map[i][j];
            }
        }
    }
});
let sum = 0
for (let i = 0; i < 1000; i++) {
    for (let j = 0; j < 1000; j++) {
        if (map[i][j]) sum++
    }
}
console.log(sum);
console.log(`Answer: ${sum}`);
console.log(`Run time: ${Date.now() - start} ms`);
