const fs = require("fs");
let start = Date.now();
const input = fs.readFileSync("./input.txt").toString();
const lines = input.split(/\r?\n/);
const rowSize = 6;
const colSize = 50;
let map = [];
for (let i = 0; i < rowSize; i++) {
    map[i] = [];
    for (let j = 0; j < colSize; j++) {
        map[i][j] = ".";
    }
}
function copy(arr) {
    let out = [];
    for (let i = 0; i < arr.length; i++) {
        out[i] = [...arr[i]];
    }
    return out;
}
for (const line of lines) {
    const nextMap = copy(map);
    const nums = line.match(/-?[0-9]+/g).map((p) => parseInt(p));

    if (line.startsWith("rect")) {
        for (let i = 0; i < nums[1]; i++) {
            for (let j = 0; j < nums[0]; j++) {
                nextMap[i][j] = "#";
            }
        }
    }
    if (line.startsWith("rotate column")) {
        const [x, shift] = nums;
        for (let i = 0; i < rowSize; i++) {
            // console.log(`${map}`);
            nextMap[(i + shift) % rowSize][x] = map[i][x];
        }
    }
    if (line.startsWith("rotate row")) {
        const [y, shift] = nums;
        for (let i = 0; i < colSize; i++) {
            nextMap[y][(i + shift) % colSize] = map[y][i];
        }
    }
    map = copy(nextMap);
}

for (let i = 0; i < rowSize; i++) {
    console.log(map[i].join(" "));
}

console.log(`Run time: ${Date.now() - start} ms`);
