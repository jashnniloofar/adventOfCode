const fs = require("fs");
let start = Date.now();
const input = fs.readFileSync("./input.txt").toString();
const points = input.split(/\r?\n/).map((line) => line.split(",").map(Number));

function manhatanDistance(p1, p2) {
    return Math.abs(p1[0] - p2[0]) + Math.abs(p1[1] - p2[1]) + Math.abs(p1[2] - p2[2]) + Math.abs(p1[3] - p2[3]);
}

const adjacents = [];
for (let i = 0; i < points.length; i++) {
    for (let j = 0; j < points.length; j++) {
        if (manhatanDistance(points[i], points[j]) <= 3) {
            if (adjacents[i] === undefined) adjacents[i] = [];
            if (adjacents[j] === undefined) adjacents[j] = [];
            adjacents[i].push(j);
            adjacents[j].push(i);
        }
    }
}

const groups = [];
function firstUngroup() {
    for (let i = 0; i < points.length; i++) {
        if (groups[i] === undefined) return i;
    }
    return -1;
}
function groupPoints() {
    let groupId = 0;
    let start = firstUngroup();
    while (start >= 0) {
        groupId++;
        const queue = [start];
        groups[start] = groupId;
        while (queue.length > 0) {
            const point = queue.shift();
            for (const adj of adjacents[point]) {
                if (groups[adj] === undefined) {
                    queue.push(adj);
                    groups[adj] = groupId;
                }
            }
        }
        start = firstUngroup();
    }
    return groupId
}

console.log(`Answer: ${groupPoints()}`);
console.log(`Run time: ${Date.now() - start} ms`);
