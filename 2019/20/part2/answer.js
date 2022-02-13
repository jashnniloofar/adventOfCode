const fs = require("fs");
let start = Date.now();
const input = fs.readFileSync("./input.txt").toString();
const map = input.split(/\r?\n/).map((line) => line.split(""));
const maxY = map.length - 1;
const maxX = map[0].length - 1;
const directions = [([x, y]) => [x, y - 1], ([x, y]) => [x - 1, y], ([x, y]) => [x, y + 1], ([x, y]) => [x + 1, y]];

function getMap(x, y) {
    if (map[y] === undefined || map[y][x] === undefined) return null;
    return map[y][x];
}

function isChar(x, y) {
    return getMap(x, y) >= "A" && getMap(x, y) <= "Z";
}

function addPortal(portals, name, pos, dir) {
    if (portals[name] === undefined) portals[name] = [];
    const [x, y] = pos;
    let changeLevel = 1;
    if (x === 2 || y === 2 || x === maxX - 2 || y === maxY - 2) changeLevel = -1;
    portals[name].push([...pos, dir, changeLevel]);
}

function getPortals() {
    const portals = {};
    for (let y = 0; y < map.length; y++) {
        for (let x = 0; x < map[y].length; x++) {
            if (isChar(x, y)) {
                if (isChar(x, y + 1) && getMap(x, y + 2) == ".") addPortal(portals, `${map[y][x]}${map[y + 1][x]}`, [x, y + 2], 0);
                if (isChar(x, y - 1) && getMap(x, y - 2) == ".") addPortal(portals, `${map[y - 1][x]}${map[y][x]}`, [x, y - 2], 2);
                if (isChar(x + 1, y) && getMap(x + 2, y) == ".") addPortal(portals, `${map[y][x]}${map[y][x + 1]}`, [x + 2, y], 1);
                if (isChar(x - 1, y) && getMap(x - 2, y) == ".") addPortal(portals, `${map[y][x - 1]}${map[y][x]}`, [x - 2, y], 3);
            }
        }
    }
    return portals;
}

function getPortalAdjacents() {
    const portals = getPortals();
    const start = portals.AA[0].slice(0, 2);
    const end = portals.ZZ[0].slice(0, 2);
    const adj = new Map();
    for (const key in portals) {
        const portal = portals[key];
        if (portal.length > 1) {
            const [[x1, y1, d1, l1], [x2, y2, d2, l2]] = portal;
            adj.set(directions[d1]([x1, y1]).join(","), [x2, y2, l1]);
            adj.set(directions[d2]([x2, y2]).join(","), [x1, y1, l2]);
        }
    }
    return { adj, start, end };
}

function getPath() {
    const { adj, start, end } = getPortalAdjacents();
    const [endX, endY] = end;
    const queue = [[...start, 0, 0]];
    const visited = new Set();
    while (queue.length > 0) {
        let [x, y, d, l] = queue.shift();
        if (x === endX && y === endY && l === 0) return d;
        if (adj.has(`${x},${y}`)) {
            [x, y, change] = adj.get(`${x},${y}`);
            l += change;
        }
        if (l > 30 || l < 0 || map[y][x] !== "." || visited.has(`${x},${y},${l}`)) continue;
        visited.add(`${x},${y},${l}`);
        queue.push([x - 1, y, d + 1, l]);
        queue.push([x + 1, y, d + 1, l]);
        queue.push([x, y - 1, d + 1, l]);
        queue.push([x, y + 1, d + 1, l]);
    }
}

console.log(`Answer: ${getPath()}`);
console.log(`Run time: ${Date.now() - start} ms`);
