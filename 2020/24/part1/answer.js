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

console.log(`Answer: ${getBlackTiles().length}`);
console.timeEnd("Run time");
