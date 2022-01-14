const fs = require("fs");
let start = Date.now();
const input = fs.readFileSync("./input.txt").toString();
let players = [];
const map = input.split(/\r?\n/).map((line, y) =>
    line.split("").map((s, x) => {
        if (s === "G" || s === "E") {
            players.push({ hp: 200, x, y, type: s });
        }
        return s;
    })
);

function copy(map) {
    const out = [];
    for (const line of map) {
        out.push(line.slice());
    }
    return out;
}
function path(x1, y1, x2, y2) {
    const current = copy(map);
    current[y1][x1] = 0;
    const queue = [[y1, x1]];
    while (queue.length > 0) {
        const [y, x] = queue.shift();
        if (x == x2 && y == y2) return current[y][x];
        if (current[y + 1][x] === ".") {
            current[y + 1][x] = current[y][x] + 1;
            queue.push([y + 1, x]);
        }
        if (current[y - 1][x] === ".") {
            current[y - 1][x] = current[y][x] + 1;
            queue.push([y - 1, x]);
        }
        if (current[y][x + 1] === ".") {
            current[y][x + 1] = current[y][x] + 1;
            queue.push([y, x + 1]);
        }
        if (current[y][x - 1] === ".") {
            current[y][x - 1] = current[y][x] + 1;
            queue.push([y, x - 1]);
        }
    }
}

function shortestPath(x, y, target) {
    const current = copy(map);
    const queue = [[y, x, 0]];
    current[y][x] = 0;
    let foundStep = 1000;
    const out = [];
    while (queue.length > 0) {
        const [curY, curX, step] = queue.shift();
        if (step > foundStep) continue;
        if (
            current[curY + 1][curX] === target ||
            current[curY - 1][curX] === target ||
            current[curY][curX + 1] === target ||
            current[curY][curX - 1] === target
        ) {
            foundStep = step;
            out.push([curY, curX, step]);
        }
        if (current[curY + 1][curX] === ".") {
            current[curY + 1][curX] = step + 1;
            queue.push([curY + 1, curX, step + 1]);
        }

        if (current[curY - 1][curX] === ".") {
            current[curY - 1][curX] = step + 1;
            queue.push([curY - 1, curX, step + 1]);
        }
        if (current[curY][curX + 1] === ".") {
            current[curY][curX + 1] = step + 1;
            queue.push([curY, curX + 1, step + 1]);
        }
        if (current[curY][curX - 1] === ".") {
            current[curY][curX - 1] = step + 1;
            queue.push([curY, curX - 1, step + 1]);
        }
    }
    return out;
}

function findtargets(x, y, target) {
    return players.filter(
        (p) =>
            p.type === target &&
            ((p.x === x + 1 && p.y === y) || (p.x === x - 1 && p.y === y) || (p.x === x && p.y === y + 1) || (p.x === x && p.y === y - 1))
    );
}
// function attack(targets) {
//     if (targets.length > 0) {
//         const target = targets.sort((p1, p2) => (p1.hp === p2.hp ? (p1.y === p2.y ? p1.x - p2.x : p1.y - p2.y) : p1.hp - p2.hp))[0];
//         target.hp -= 3;
//         if (target.hp < 0) {
//             map[target.y][target.x] = ".";
//             const index = players.findIndex((p) => p.x === target.x && p.y === target.y);
//             players.splice(index, 1);
//             return index;
//         }
//     }
//     return 1000;
// }

// function move(player) {}

function draw(map) {
    console.log();
    for (const line of map) {
        console.log(line.join(""));
    }
}

function match(hp) {
    let turn = 0;
    while (true) {
        players = players.sort((p1, p2) => (p1.y === p2.y ? p1.x - p2.x : p1.y - p2.y));
        for (let i = 0; i < players.length; i++) {
            const player = players[i];
            const targetChar = player.type === "G" ? "E" : "G";
            if (players.filter((p) => p.type === targetChar).length === 0) return turn * players.reduce((sum, p) => sum + p.hp, 0);
            let targets = findtargets(player.x, player.y, targetChar);
            if (targets.length === 0) {
                const shortReachables = shortestPath(player.x, player.y, targetChar);
                if (shortReachables.length > 0) {
                    const [y, x, step] = shortReachables.sort((a, b) => (a[0] === b[0] ? a[1] - b[1] : a[0] - b[0]))[0];
                    map[player.y][player.x] = ".";
                    if (map[player.y - 1][player.x] === "." && path(player.x, player.y - 1, x, y) === step - 1) player.y--;
                    else if (map[player.y][player.x - 1] === "." && path(player.x - 1, player.y, x, y) === step - 1) player.x--;
                    else if (map[player.y][player.x + 1] === "." && path(player.x + 1, player.y, x, y) === step - 1) player.x++;
                    else if (map[player.y + 1][player.x] === "." && path(player.x, player.y + 1, x, y) === step - 1) player.y++;
                    map[player.y][player.x] = player.type;
                }
                targets = findtargets(player.x, player.y, targetChar);
            }
            if (targets.length > 0) {
                const target = targets.sort((p1, p2) => (p1.hp === p2.hp ? (p1.y === p2.y ? p1.x - p2.x : p1.y - p2.y) : p1.hp - p2.hp))[0];
                if (target.type === "E") target.hp -= 3;
                else target.hp -= hp;
                if (target.hp < 0) {
                    map[target.y][target.x] = ".";
                    const index = players.findIndex((p) => p.x === target.x && p.y === target.y);
                    players.splice(index, 1);
                    if (index < i) i--;
                }
            }
        }
        turn++;
    }
}

console.log(`Answer: ${match(3)}`);
console.log(`Run time: ${Date.now() - start} ms`);
