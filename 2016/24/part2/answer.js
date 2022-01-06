const fs = require("fs");
let start = Date.now();
const input = fs.readFileSync("./input.txt").toString();
const map = input.split(/\r?\n/).map((line) => line.split(""));
function copy(map) {
    let out = [];
    for (let i = 0; i < map.length; i++) {
        out[i] = map[i].slice();
    }
    return out;
}
function isNotBlocked(str) {
    return typeof str === "string" && str !== "#";
}
const pos = [];
for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map[i].length; j++) {
        if (map[i][j] !== "#" && map[i][j] !== ".") {
            pos[parseInt(map[i][j])] = [i, j];
        }
    }
}

function shotestPath(from, to) {
    let current = copy(map);
    const queue = [pos[from]];
    current[pos[from][0]][pos[from][1]] = 0;
    while (queue.length > 0) {
        const [x, y] = queue.shift();
        if (x === pos[to][0] && y === pos[to][1]) return current[x][y];
        if (isNotBlocked(current[x - 1][y])) {
            current[x - 1][y] = current[x][y] + 1;
            queue.push([x - 1, y]);
        }
        if (isNotBlocked(current[x + 1][y])) {
            current[x + 1][y] = current[x][y] + 1;
            queue.push([x + 1, y]);
        }
        if (isNotBlocked(current[x][y - 1])) {
            current[x][y - 1] = current[x][y] + 1;
            queue.push([x, y - 1]);
        }
        if (isNotBlocked(current[x][y + 1])) {
            current[x][y + 1] = current[x][y] + 1;
            queue.push([x, y + 1]);
        }
    }
}
const path = [];
for (let i = 0; i < pos.length; i++) {
    path[i] = [];
    for (let j = 0; j < pos.length; j++) {
        path[i][j] = 0;
    }
}
for (let i = 0; i < pos.length; i++) {
    for (let j = i + 1; j < pos.length; j++) {
        path[i][j] = shotestPath(i, j);
        path[j][i] = path[i][j];
    }
}

const remains = [];
for (let i = 1; i < pos.length; i++) {
    remains.push(i);
}
function shortestRoute(currentPath, start, nodes) {
    let min = Number.MAX_SAFE_INTEGER;
    if (nodes.length === 0) return currentPath + path[start][0];
    for (let i = 0; i < nodes.length; i++) {
        const node = nodes.shift();
        const nodePath = shortestRoute(currentPath + path[start][node], node, nodes);
        if (nodePath < min) {
            min = nodePath;
        }
        nodes.push(node);
    }
    return min;
}

console.log(`Answer: ${shortestRoute(0, 0, remains)}`);
console.log(`Run time: ${Date.now() - start} ms`);
