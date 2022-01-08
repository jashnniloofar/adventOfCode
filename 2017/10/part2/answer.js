const fs = require("fs");
let start = Date.now();

const postfix = [17, 31, 73, 47, 23];
const totalLength = 256;
const turns = fs
    .readFileSync("./input.txt")
    .toString()
    .split("")
    .map((s) => s.charCodeAt(0))
    .concat(postfix);

function rotate(arr, start, len) {
    if (len <= 1) return arr;
    const end = (start + len - 1) % arr.length;
    for (let i = 0; i < len / 2; i++) {
        const from = (start + i) % arr.length;
        const to = (end - i + arr.length) % arr.length;
        const temp = arr[from];
        arr[from] = arr[to];
        arr[to] = temp;
    }
    return arr;
}

function sparceHash() {
    let array = [];
    for (let i = 0; i < totalLength; i++) {
        array[i] = i;
    }
    let skip = 0;
    let pos = 0;
    for (let i = 0; i < 64; i++) {
        for (const turn of turns) {
            array = rotate(array, pos, turn);
            pos += skip + turn;
            skip++;
        }
    }
    return array;
}

function denseHash(arr) {
    let out = [];
    for (let i = 0; i < 16; i++) {
        let xor = 0;
        for (let j = 0; j < 16; j++) {
            xor = xor ^ arr[i * 16 + j];
        }
        out[i] = xor;
    }
    return out;
}

console.log(`Answer: ${Buffer.from(denseHash(sparceHash())).toString("hex")}`);
console.log(`Run time: ${Date.now() - start} ms`);
