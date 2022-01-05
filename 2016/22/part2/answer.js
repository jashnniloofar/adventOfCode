const fs = require("fs");
let start = Date.now();
const input = fs.readFileSync("./input.txt").toString();
let empty = [];
let maxX = 0;
let maxY = 0;
const disks = [];
input
    .split(/\r?\n/)
    .slice(2)
    .forEach((disk) => {
        const [x, y, used] = disk
            .match(/.*x([0-9]+)-y([0-9]+) +[0-9]+T +([0-9]+)T +[0-9]+T/)
            .slice(1)
            .map((s) => parseInt(s));
        if (disks[x] === undefined) disks[x] = [];
        if (used === 0) {
            disks[x][y] = 0;
            empty = [x, y];
        } else if (used < 75) disks[x][y] = ".";
        else disks[x][y] = "#";
        if (x === 0 && y === 0) disks[x][y] = "S";
        maxX = Math.max(x, maxX);
        maxY = Math.max(y, maxY);
    });

function shortestPath() {
    const queue = [empty];
    while (queue.length > 0) {
        const [x, y] = queue.shift();
        if (x === 32 && y === 0) return disks[x][y];
        if (x > 0 && disks[x - 1][y] === ".") {
            disks[x - 1][y] = disks[x][y] + 1;
            queue.push([x - 1, y]);
        }
        if (x < maxX && disks[x + 1][y] === ".") {
            disks[x + 1][y] = disks[x][y] + 1;
            queue.push([x + 1, y]);
        }
        if (y > 0 && disks[x][y - 1] === ".") {
            disks[x][y - 1] = disks[x][y] + 1;
            queue.push([x, y - 1]);
        }
        if (y < maxY && disks[x][y + 1] === ".") {
            disks[x][y + 1] = disks[x][y] + 1;
            queue.push([x, y + 1]);
        }
    }
}

console.log(`Answer: ${(maxX - 1) * 5 + shortestPath()}`);
console.log(`Run time: ${Date.now() - start} ms`);
