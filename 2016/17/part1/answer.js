const crypto = require("crypto");
const fs = require("fs");
let start = Date.now();
const input = fs.readFileSync("./input.txt").toString();

function md5(input) {
    let md5sum = crypto.createHash("md5");
    md5sum.update(input);
    return md5sum.digest().toString("hex");
}

function solve(targetRow, targetCol) {
    const queue = [[0, 0, ""]];
    while (queue.length > 0) {
        const [row, col, code] = queue.shift();
        if (row === targetRow && col === targetCol) return code;
        const hash = md5(input + code);
        if (row > 0 && ["b", "c", "d", "e", "f"].includes(hash[0])) queue.push([row - 1, col, code + "U"]);
        if (row < 3 && ["b", "c", "d", "e", "f"].includes(hash[1])) queue.push([row + 1, col, code + "D"]);
        if (col > 0 && ["b", "c", "d", "e", "f"].includes(hash[2])) queue.push([row, col - 1, code + "L"]);
        if (col < 3 && ["b", "c", "d", "e", "f"].includes(hash[3])) queue.push([row, col + 1, code + "R"]);
    }
}

console.log(`Answer: ${solve(3, 3)}`);
console.log(`Run time: ${Date.now() - start} ms`);
