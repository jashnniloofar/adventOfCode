const fs = require("fs");
let start = Date.now();
const [favoriteNumber, destX, destY] = fs
    .readFileSync("./input.txt")
    .toString()
    .split(" ")
    .map((s) => parseInt(s));
const map = [];
function getMap(map, x, y) {
    if (map[x] && map[x][y] !== undefined) return map[x][y];
    if (!map[x]) map[x] = [];
    if (x < 0 || y < 0) map[x][y] = 1;
    else map[x][y] = ((x * x + 3 * x + 2 * x * y + y + y * y + favoriteNumber).toString(2).split("1").length - 1) % 2;
    return map[x][y];
}

// dijkstra
function shortestPath(targetX, targetY) {
    const visited = new Map();
    visited.set("1,1", 0);
    const queue = [[1, 1, 0]];
    do {
        const [currentX, currentY, path] = queue.shift();
        if (currentX === targetX && currentY === targetY) {
            return path;
        }
        if (getMap(map, currentX + 1, currentY) === 0 && !visited.has(`${currentX + 1},${currentY}`)) {
            queue.push([currentX + 1, currentY, path + 1]);
            visited.set(`${currentX + 1},${currentY}`, path + 1);
        }
        if (getMap(map, currentX - 1, currentY) === 0 && !visited.has(`${currentX - 1},${currentY}`)) {
            queue.push([currentX - 1, currentY, path + 1]);
            visited.set(`${currentX - 1},${currentY}`, path + 1);
        }
        if (getMap(map, currentX, currentY + 1) === 0 && !visited.has(`${currentX},${currentY + 1}`)) {
            queue.push([currentX, currentY + 1, path + 1]);
            visited.set(`${currentX},${currentY + 1}`, path + 1);
        }
        if (getMap(map, currentX, currentY - 1) === 0 && !visited.has(`${currentX},${currentY - 1}`)) {
            queue.push([currentX, currentY - 1, path + 1]);
            visited.set(`${currentX},${currentY - 1}`, path + 1);
        }
    } while (queue.length > 0);
}

console.log(`Answer: ${shortestPath(destX, destY)}`);
console.log(`Run time: ${Date.now() - start} ms`);
