const fs = require("fs");
let start = Date.now();
const input = fs.readFileSync("./input.txt").toString();
const moves = input.split(",");

function spin(arr, count) {
    return arr.slice(-count).concat(arr.slice(0, arr.length - count));
}

function swap(arr, from, to) {
    const temp = arr[from];
    arr[from] = arr[to];
    arr[to] = temp;
}
function dance(str) {
    str = str.split("");

    for (const move of moves) {
        if (move[0] === "s") str = spin(str, parseInt(move.substr(1)));
        if (move[0] === "x") swap(str, ...move.match(/[0-9]+/g).map((s) => parseInt(s)));
        if (move[0] === "p") {
            const partners = move.match(/p(.)\/(.)/).slice(1);
            const from = str.findIndex((s) => s === partners[0]);
            const to = str.findIndex((s) => s === partners[1]);
            swap(str, from, to);
        }
    }
    return str.join("");
}
let str = "abcdefghijklmnop";
let step = 0;
const steps = {};
while (steps[str] === undefined) {
    const next = dance(str);
    step++;
    steps[str] = [step, next]
    str = next;
}
for (let i = 0; i < 1000000000 % step; i++) {
    str = steps[str][1]
}

console.log(`Answer: ${str}`);
console.log(`Run time: ${Date.now() - start} ms`);
