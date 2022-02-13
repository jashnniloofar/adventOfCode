const fs = require("fs");
let start = Date.now();
const input = fs.readFileSync("./input.txt").toString();
const map = input.split(/\r?\n/).map((line) => line.split(""));
const mid = Math.floor(map.length / 2);
map[mid + 1][mid + 1] = "1";
map[mid + 1][mid - 1] = "2";
map[mid - 1][mid + 1] = "3";
map[mid - 1][mid - 1] = "4";
map[mid][mid] = "#";
map[mid + 1][mid] = "#";
map[mid - 1][mid] = "#";
map[mid][mid + 1] = "#";
map[mid][mid - 1] = "#";

const location = {};
const keys = [];

String.prototype.setCharAt = function (index, ch) {
    return this.substring(0, index) + ch + this.substring(index + 1);
};

function findLocation() {
    for (let y = 0; y < map.length; y++) {
        for (let x = 0; x < map[y].length; x++) {
            if (map[y][x] !== "." && map[y][x] !== "#") {
                location[map[y][x]] = [x, y];
                if ((map[y][x] >= "a") & (map[y][x] <= "z")) keys.push(map[y][x]);
            }
        }
    }
}

function shortestPath() {
    const nodes = new Set(["1234,0"]);
    const dist = new Map();
    const visited = new Set();
    dist.set("1234,0", 0);
    const getDist = (key) => dist.get(key);
    while (nodes.size) {
        const current = [...nodes].reduce((min, v) => (getDist(min) < getDist(v) ? min : v));
        nodes.delete(current);
        visited.add(current);
        const [ch, key] = current.split(",");
        const keyMask = +key;
        if (keyMask === 67108863) return dist.get(current);
        const robots = ch.split("");
        for (let i = 0; i < robots.length; i++) {
            const robot = robots[i];
            const reachable = getReachable(robot, keyMask);
            reachable.forEach((node) => {
                const neighbor = `${ch.setCharAt(i, node.char)},${node.value + keyMask}`;
                if (!visited.has(neighbor) && !nodes.has(neighbor)) {
                    nodes.add(neighbor);
                }
                const alt = node.d + getDist(current);
                if (!dist.has(neighbor) || alt < getDist(neighbor)) {
                    dist.set(neighbor, alt);
                }
            });
        }
    }
}

function getReachable(ch, keyMask) {
    return path[ch].filter((node) => (node.doors & keyMask) === node.doors && (node.value & keyMask) === 0 && (node.keys & keyMask) === node.keys);
}

function getPath(key) {
    const start = location[key];
    const queue = [[...start, 0, 0, 0]];
    const visited = new Set();
    const path = [];
    while (queue.length > 0) {
        let [x, y, d, doors, keys] = queue.shift();
        if (map[y][x] === "#" || visited.has(`${x},${y}`)) continue;
        visited.add(`${x},${y}`);
        if (map[y][x] >= "a" && map[y][x] !== key) {
            path.push({ char: map[y][x], d, doors, keys, value: 1 << (map[y][x].charCodeAt(0) - 97) });
            keys += 1 << (map[y][x].charCodeAt(0) - 97);
        }
        if (map[y][x] >= "A" && map[y][x] <= "Z") doors += 1 << (map[y][x].charCodeAt(0) - 65);
        queue.push([x - 1, y, d + 1, doors, keys]);
        queue.push([x + 1, y, d + 1, doors, keys]);
        queue.push([x, y - 1, d + 1, doors, keys]);
        queue.push([x, y + 1, d + 1, doors, keys]);
    }
    return path;
}

findLocation();
const path = {};
[...keys, "1", "2", "3", "4"].forEach((key) => {
    path[key] = getPath(key);
});

console.log(`Answer: ${shortestPath()}`);
console.log(`Run time: ${Date.now() - start} ms`);
