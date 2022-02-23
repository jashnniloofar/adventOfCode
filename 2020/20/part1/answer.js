console.time("Run time");
const fs = require("fs");
const input = fs.readFileSync("./input.txt").toString();
const tiles = [];
input.split(/\n\n/).forEach((tile) => {
    const lines = tile.split(/\n/);
    tiles.push({ id: +lines[0].match(/\d+/), rows: lines.slice(1) });
});
const tileWidth = tiles[0].rows[0].length;

function setEdges() {
    for (const tile of tiles) {
        let firstColumn = "";
        let lastColumn = "";
        const edges = [];
        for (let i = 0; i < tile.rows.length; i++) {
            firstColumn += tile.rows[i][0];
            lastColumn += tile.rows[i][tileWidth - 1];
        }
        edges.push(tile.rows[0]);
        edges.push(lastColumn);
        edges.push(tile.rows[tileWidth - 1]);
        edges.push(firstColumn);
        edges.push(reverse(tile.rows[0]));
        edges.push(reverse(lastColumn));
        edges.push(reverse(tile.rows[tileWidth - 1]));
        edges.push(reverse(firstColumn));
        tile.edges = edges;
    }
}

function reverse(str) {
    return str.split("").reverse().join("");
}

function isAdjacent(tile1, tile2) {
    if (tile1.id === tile2.id) return false;
    for (const edge of tile1.edges) {
        if (tile2.edges.includes(edge)) return true;
    }
}

function findAdjacent() {
    for (const tile1 of tiles) {
        tile1.adj = tiles.filter((tile2) => isAdjacent(tile1, tile2)).map((t) => t.id);
    }
}

setEdges();
findAdjacent();
const corners = tiles.filter((tile) => tile.adj.length === 2);

console.log(`Answer: ${corners.reduce((mul, c) => mul * c.id, 1)}`);
console.timeEnd("Run time");
