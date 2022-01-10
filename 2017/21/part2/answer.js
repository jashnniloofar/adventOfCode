const fs = require("fs");
let start = Date.now();
const rules = {};
fs.readFileSync("./input.txt")
    .toString()
    .split(/\r?\n/)
    .forEach((line) => {
        const rule = line.split(" => ");
        let rec = rule[0].split("/").map((a) => a.split(""));
        const result = rule[1].split("/");
        for (let i = 0; i < 4; i++) {
            rules[toSrt(rec)] = result;
            rules[toSrt(flipRL(rec))] = result;
            rules[toSrt(flipUD(rec))] = result;
            rec = rotate90(rec);
        }
    });

function toSrt(arr) {
    return arr.map((r) => r.join("")).join("/");
}
function rotate90(arr) {
    if (arr.length === 2)
        return [
            [arr[1][0], arr[0][0]],
            [arr[1][1], arr[0][1]],
        ];
    if (arr.length === 3)
        return [
            [arr[2][0], arr[1][0], arr[0][0]],
            [arr[2][1], arr[1][1], arr[0][1]],
            [arr[2][2], arr[1][2], arr[0][2]],
        ];
}
function flipUD(arr) {
    if (arr.length === 2) return [arr[1], arr[0]];
    if (arr.length === 3) return [arr[2], arr[1], arr[0]];
}
function flipRL(arr) {
    if (arr.length === 2)
        return [
            [arr[0][1], arr[0][0]],
            [arr[1][1], arr[1][0]],
        ];
    if (arr.length === 3)
        return [
            [arr[0][2], arr[0][1], arr[0][0]],
            [arr[1][2], arr[1][1], arr[1][0]],
            [arr[2][2], arr[2][1], arr[2][0]],
        ];
}

function run(map) {
    let out = [];
    const step = map.length % 2 === 0 ? 2 : 3;
    for (let i = 0; i < map.length / step; i++) {
        const rows = map.slice(i * step, i * step + step);
        const rowOut = [];
        for (let j = 0; j < map.length / step; j++) {
            const from = rows.map((r) => r.substr(j * step, step)).join("/");
            rules[from].forEach((v, i) => (rowOut[i] = (rowOut[i] || "") + v));
        }
        out = out.concat(rowOut);
    }
    return out;
}
const input = ".#./..#/###"
let map = input.split("/");

for (let i = 0; i < 18; i++) {
    map = run(map);
}

console.log(`Answer: ${map.join("").split("#").length - 1}`);
console.log(`Run time: ${Date.now() - start} ms`);
