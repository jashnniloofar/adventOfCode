const fs = require("fs");
let start = Date.now();
const turns = fs
.readFileSync("./sample.txt")
.toString()
.split(",")
.map((s) => parseInt(s));

const totalLength = 5;
function rotate(arr, start, len) {
    if (len <= 1) return arr;
    const end = (pos + len - 1) % arr.length;
    for (let i = 0; i < len / 2; i++) {
        const from = (start + i) % arr.length;
        const to = (end - i + arr.length) % arr.length;
        const temp = arr[from];
        arr[from] = arr[to];
        arr[to] = temp;
    }
    return arr;
}
let array = [];
for (let i = 0; i < totalLength; i++) {
    array[i] = i;
}
let skip = 0;
let pos = 0;
for (const turn of turns) {
    array = rotate(array, pos, turn);
    pos = (pos + skip + turn) % totalLength;
    skip++;
}
console.log(skip, pos);

console.log(`Answer: ${array[0] * array[1]}`);
console.log(`Run time: ${Date.now() - start} ms`);
