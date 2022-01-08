const fs = require("fs");
let start = Date.now();
const input = fs.readFileSync("./input.txt").toString();

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

function sparceHash(turns) {
    let array = [];
    for (let i = 0; i < 256; i++) {
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
function hexToBinary(hex) {
    let out = "";
    for (let i = 0; i < hex.length / 8; i++) {
        out += parseInt(hex.substr(i * 8, 8), 16)
            .toString(2)
            .padStart(32, "0");
    }
    return out;
}
function hash(input) {
    const postfix = [17, 31, 73, 47, 23];
    const turns = input
        .split("")
        .map((s) => s.charCodeAt(0))
        .concat(postfix);
    return hexToBinary(Buffer.from(denseHash(sparceHash(turns))).toString("hex"));
}

const map = [];
function region(row, col, groupId) {
    map[row][col] = groupId;
    const queue = [[row, col]];
    while (queue.length > 0) {
        const [x, y] = queue.shift();
        if (x > 0 && map[x - 1][y] === "1") {
            queue.push([x - 1, y]);
            map[x - 1][y] = groupId;
        }
        if (x < 127 && map[x + 1][y] === "1") {
            queue.push([x + 1, y]);
            map[x + 1][y] = groupId;
        }
        if (y > 0 && map[x][y - 1] === "1") {
            queue.push([x, y - 1]);
            map[x][y - 1] = groupId;
        }
        if (y < 127 && map[x][y + 1] === "1") {
            queue.push([x, y + 1]);
            map[x][y + 1] = groupId;
        }
    }
}

for (let index = 0; index < 128; index++) {
    map.push(hash(`${input}-${index}`).split(""));
}

let count = 0;
for (let i = 0; i < 128; i++) {
    for (let j = 0; j < 128; j++) {
        if (map[i][j] === "1") {
            count++;
            region(i, j, count);
        }
    }
}

console.log(`Answer: ${count}`);
console.log(`Run time: ${Date.now() - start} ms`);
