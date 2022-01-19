const fs = require("fs");
let start = Date.now();
const input = fs.readFileSync("./input.txt").toString();
const map = [[]];
let minY = Number.MAX_SAFE_INTEGER;
let maxY = 0;
let minX = 500;
let maxX = 0;
input.split(/\r?\n/).forEach((line) => {
    let [_, axis, l, from, to] = line.match(/(x|y)=(\d+), [xy]=(\d+)\.\.(\d+)/);
    l = +l;
    from = +from;
    to = +to;
    if (axis === "x") {
        minX = Math.min(minX, l);
        maxX = Math.max(maxX, l);
        minY = Math.min(minY, from);
        maxY = Math.max(maxY, to);
        for (let y = from; y <= to; y++) {
            if (map[y] === undefined) map[y] = [];
            map[y][l] = "#";
        }
    } else {
        minX = Math.min(minX, from);
        maxX = Math.min(maxX, to);
        maxY = Math.max(maxY, l);
        minY = Math.min(minY, l);
        if (map[l] === undefined) map[l] = [];
        for (let x = from; x <= to; x++) {
            map[l][x] = "#";
        }
    }
});

for (let y = 0; y <= maxY; y++) {
    if (map[y] === undefined) map[y] = [];
}

function solve() {
    const stack = [[0, 500]];
    while (stack.length > 0) {
        const [y, x] = stack.pop();
        if (y >= maxY) continue;
        if (map[y + 1][x] === "|") continue;
        if (map[y + 1][x] === undefined) stack.push([y, x]);
        let indexY = y + 1;
        while (indexY <= maxY && map[indexY][x] === undefined) {
            map[indexY][x] = "|";
            stack.push([indexY, x]);
            indexY++;
        }
        if (indexY <= maxY && (map[indexY][x] === "#" || map[indexY][x] === "~")) {
            const queue = [[indexY - 1, x]];
            let indexX = x + 1;
            while (
                (map[indexY][indexX] === "#" || map[indexY][indexX] === "~") &&
                (map[indexY - 1][indexX] === undefined || map[indexY - 1][indexX] === "|")
            ) {
                map[indexY - 1][indexX] = "|";
                queue.push([indexY - 1, indexX]);
                indexX++;
            }
            let rightWall = map[indexY - 1][indexX] === "#";
            if (map[indexY - 1][indexX] === undefined) {
                map[indexY - 1][indexX] = "|";
                stack.push([indexY - 1, indexX]);
            }
            indexX = x - 1;
            while (
                (map[indexY][indexX] === "#" || map[indexY][indexX] === "~") &&
                (map[indexY - 1][indexX] === undefined || map[indexY - 1][indexX] === "|")
            ) {
                map[indexY - 1][indexX] = "|";
                queue.push([indexY - 1, indexX]);
                indexX--;
            }
            let leftWall = map[indexY - 1][indexX] === "#";
            if (map[indexY - 1][indexX] === undefined) {
                map[indexY - 1][indexX] = "|";
                stack.push([indexY - 1, indexX]);
            }
            if (leftWall && rightWall) {
                while (queue.length > 0) {
                    const node = queue.shift();
                    map[node[0]][node[1]] = "~";
                }
            }
        }
    }
}
solve();
function draw() {
    for (let y = 0; y <= 100; y++) {
        for (let x = minX - 1; x <= 600; x++) {
            if (map[y][x] === undefined) map[y][x] = " ";
        }
        console.log(map[y].join(""));
    }
}

let count = 0;
for (let y = minY; y <= maxY; y++) {
    for (let x = 0; x < map[y].length; x++) {
        count += map[y][x] === "~";
    }
}

console.log(`Answer: ${count}`);
console.log(`Run time: ${Date.now() - start} ms`);
