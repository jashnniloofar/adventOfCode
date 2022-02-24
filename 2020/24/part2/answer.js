console.time("Run time");
const fs = require("fs");
const input = fs.readFileSync("./input.txt").toString();
const lines = input.split(/\r?\n/);

const directions = {
    e: ([q, r, s]) => [q + 1, r, s - 1],
    se: ([q, r, s]) => [q, r + 1, s - 1],
    sw: ([q, r, s]) => [q - 1, r + 1, s],
    w: ([q, r, s]) => [q - 1, r, s + 1],
    nw: ([q, r, s]) => [q, r - 1, s + 1],
    ne: ([q, r, s]) => [q + 1, r - 1, s],
};

function findTile(path) {
    const twoLetter = new RegExp("(nw|sw|ne|se)", "g");
    const coordinations = path
        .split(twoLetter)
        .filter(Boolean)
        .map((i) => (i.match(twoLetter) ? i : i.split("")))
        .flat();
    let q = 0;
    let r = 0;
    let s = 0;

    for (const coordination of coordinations) {
        [q, r, s] = directions[coordination]([q, r, s]);
    }
    return [q, r, s];
}

function getBlackTiles() {
    const flip = {};
    lines.forEach((line) => {
        const key = findTile(line).join(",");
        flip[key] = (flip[key] || 0) + 1;
    });
    return Object.keys(flip).filter((k) => flip[k] % 2 === 1);
}

function getNeighbors(tile) {
    let [q, r, s] = tile.split(",").map(Number);
    return ["e", "se", "sw", "w", "nw", "ne"].map((dir) => directions[dir]([q, r, s]).join(","));
}

function nextDay(blackSet, allSet) {
    const nextBlack = new Set();
    const nextAll = new Set();
    allSet.forEach((tile) => {
        const blackNeighbors = getNeighbors(tile).filter((neighbor) => blackSet.has(neighbor)).length;
        if (blackNeighbors === 2 || (blackSet.has(tile) && blackNeighbors === 1)) {
            nextBlack.add(tile);
            getNeighbors(tile).forEach((neighbor) => nextAll.add(neighbor));
        }
    });
    return { blackSet: nextBlack, allSet: nextAll };
}

const blackTiles = getBlackTiles();
let blackSet = new Set(blackTiles);
let allSet = new Set(blackTiles);
blackSet.forEach((tile) => getNeighbors(tile).forEach((neighbor) => allSet.add(neighbor)));

for (let day = 0; day < 100; day++) {
    const result = nextDay(blackSet, allSet);
    allSet = result.allSet;
    blackSet = result.blackSet;
}

console.log(`Answer: ${blackSet.size}`);
console.timeEnd("Run time");
