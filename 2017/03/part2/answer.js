const fs = require("fs");
let start = Date.now();
const input = parseInt(fs.readFileSync("./input.txt").toString());
const directions = [([i, j]) => [i, j - 1], ([i, j]) => [i - 1, j], ([i, j]) => [i, j + 1], ([i, j]) => [i + 1, j]];
let directionIndex = 0,
    num = 1,
    row = 0,
    col = 0;
const map = new Map();
map.set("0,0", 1);
function writeSuere(map, row, col) {
    let sum = 0;
    for (let i = -1; i < 2; i++) {
        for (let j = -1; j < 2; j++) {
            sum += map.has(`${row + i},${col + j}`) ? map.get(`${row + i},${col + j}`) : 0;
        }
    }
    map.set(`${row},${col}`, sum);
    return sum;
}
do{
    if (row === col && row >= 0) {
        col++;
        directionIndex = 0;
    } else {
        [col, row] = directions[directionIndex]([col, row]);
        if (Math.abs(col) === Math.abs(row)) directionIndex++;
    }
    num=writeSuere(map, row, col)

}while(num < input)


console.log(`Answer: ${num}`);
console.log(`Run time: ${Date.now() - start} ms`);
