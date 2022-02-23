console.time("Run time");
const fs = require("fs");
const input = fs.readFileSync("./input.txt").toString();
const tiles = [];
input.split(/\n\n/).forEach((tile) => {
    const lines = tile.split(/\n/);
    tiles.push({ id: +lines[0].match(/\d+/), rows: lines.slice(1), rotated: 0, flipped: false });
});
const tileWidth = tiles[0].rows[0].length;
const dimension = Math.sqrt(tiles.length);
const EdgeStates = [
    [0, 1, 2, 3, 4, 3, 6, 1], // 0°
    [7, 0, 5, 2, 3, 2, 1, 0], // 90°
    [6, 7, 4, 5, 2, 5, 0, 7], // 180°
    [1, 6, 3, 4, 5, 4, 7, 6], // 270°
];
const sides = { N: 0, E: 1, S: 2, W: 3 };
const sidesCount = 4;
function getEdge(tile, direction) {
    const index = tile.flipped ? sides[direction] + sidesCount : sides[direction];
    return tile.edges[EdgeStates[tile.rotated][index]];
}
function rotate(tile) {
    tile.rotated = (tile.rotated + 1) % sidesCount;
}
function flip(tile) {
    tile.flipped = !tile.flipped;
}
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
        tile.rows = tile.rows.slice(1, -1);
        for (let i = 0; i < tile.rows.length; i++) {
            tile.rows[i] = tile.rows[i].slice(1, -1);
        }
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
        tile1.neighbors = tiles.filter((tile2) => isAdjacent(tile1, tile2));
    }
}

function arrange(tile, direction, edge) {
    for (let index = 0; index < 8; index++) {
        if (getEdge(tile, direction) === edge) return;
        index === 3 ? flip(tile) : rotate(tile);
    }
}

function rotateTile(tile) {
    const size = tile.rows.length;
    let destination = [];
    for (let i = 0; i < size; i++) {
        destination[i] = "";
        for (let j = 0; j < size; j++) {
            destination[i] += tile.rows[size - j - 1][i];
        }
    }
    tile.rows = destination;
}

function flipTile(tile) {
    for (let i = 0; i < tile.rows.length; i++) {
        tile.rows[i] = reverse(tile.rows[i]);
    }
}
const image = [];
function placeTile(tile, row, col) {
    if (tile.placed) return;
    tile.placed = true;
    for (let i = 0; i < tile.rotated; i++) {
        rotateTile(tile);
    }
    if (tile.flipped) flipTile(tile);
    if (image[row] === undefined) image[row] = [];
    image[row][col] = tile;
}
function reassemble() {
    setEdges();
    findAdjacent();
    const corners = tiles.filter((tile) => tile.neighbors.length === 2);
    const corner = corners[0];
    const [neighbor1, neighbor2] = corner.neighbors;
    for (let index = 0; index < 8; index++) {
        if (neighbor1.edges.includes(getEdge(corner, "E")) && neighbor2.edges.includes(getEdge(corner, "S"))) {
            break;
        }
        index === 3 ? flip(corner) : rotate(corner);
    }
    assemble(corner, 0, 0);
    const actual = { rows: new Array(dimension * (tileWidth - 2)) };
    for (let row = 0; row < dimension; row++) {
        for (let col = 0; col < dimension; col++) {
            const tile = image[row][col];
            for (let i = 0; i < tile.rows.length; i++) {
                let j = (tileWidth - 2) * row + i;
                actual.rows[j] = (actual.rows[j] || "") + tile.rows[i];
            }
        }
    }
    return actual;
}
function assemble(tile, row, col) {
    if (row >= dimension || col >= dimension) return;
    placeTile(tile, row, col);
    tile.neighbors.forEach((neighbor) => {
        if (!neighbor.placed) {
            if (neighbor.edges.includes(getEdge(tile, "S"))) {
                arrange(neighbor, "N", getEdge(tile, "S"));
                assemble(neighbor, row + 1, col);
            } else if (neighbor.edges.includes(getEdge(tile, "E"))) {
                arrange(neighbor, "W", getEdge(tile, "E"));
                assemble(neighbor, row, col + 1);
            }
        }
    });
}
function countMonsters(tile) {
    const monsterLength = 20;
    const r1 = /..................#./;
    const r2 = /#....##....##....###/g;
    const r3 = /.#..#..#..#..#..#.../;
    let count = 0;
    let index = 0;
    while (count === 0) {
        tile.rows.forEach((row, rowIndex) => {
            let matches;
            while ((matches = r2.exec(row))) {
                if (
                    rowIndex > 0 &&
                    r1.test(tile.rows[rowIndex - 1].slice(matches.index, matches.index + monsterLength)) &&
                    r3.test(tile.rows[rowIndex + 1].slice(matches.index, matches.index + monsterLength))
                )
                    count++;
            }
        });
        if (count === 0) index === 3 ? flipTile(tile) : rotateTile(tile);
        index++;
    }
    return count;
}

const actual = reassemble();
const count = countMonsters(actual);
const total = actual.rows.join("").split("#").length - 1;
result = total - count * (1 + 8 + 6);

console.log(`Answer: ${result}`);
console.timeEnd("Run time");
