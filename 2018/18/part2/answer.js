const fs = require("fs");
let start = Date.now();
const emptyLine = "..........";
const input = emptyLine + "\n" + fs.readFileSync("./input.txt").toString() + "\n" + emptyLine;
let map = input.split(/\r?\n/).map((line) => ("." + line + ".").split(""));

const size = 50;
function getAdj(x, y) {
    return [map[x - 1][y - 1], map[x - 1][y], map[x - 1][y + 1], map[x][y - 1], map[x][y + 1], map[x + 1][y - 1], map[x + 1][y], map[x + 1][y + 1]];
}

function draw(map) {
    for (const line of map) {
        console.log(line.join(""));
    }
}

function next(map) {
    const next = [];
    for (let x = 0; x < size + 2; x++) {
        next[x] = [];
        for (let y = 0; y < size + 2; y++) {
            if (x === 0 || y === 0 || x === size + 1 || y === size + 1) next[x][y] = ".";
            else {
                const adjacents = getAdj(x, y);

                if (map[x][y] === ".") {
                    if (adjacents.filter((a) => a === "|").length > 2) next[x][y] = "|";
                    else next[x][y] = ".";
                } else if (map[x][y] === "|") {
                    if (adjacents.filter((a) => a === "#").length > 2) next[x][y] = "#";
                    else next[x][y] = "|";
                } else {
                    if (adjacents.filter((a) => a === "#").length > 0 && adjacents.filter((a) => a === "|").length > 0) next[x][y] = "#";
                    else next[x][y] = ".";
                }
            }
        }
    }
    return next;
}

function value(map) {
    let tree = 0;
    let lumb = 0;
    for (const line of map) {
        const str = line.join("");
        lumb += str.split("#").length - 1;
        tree += str.split("|").length - 1;
    }
    return tree * lumb;
}

function repeat() {
    const values = new Map();
    let out = [];
    let index = 0;
    let foundIndex = -1;
    let diff = 0;
    while (true) {
        index++;
        map = next(map);
        const v = value(map);
        if (foundIndex >= 0) {
            foundIndex++;
            if (!values.has(v) || index - values.get(v) !== diff) foundIndex = -1;
            out[foundIndex % diff] = v;
            if (foundIndex === diff) return [diff, index - diff, out];
        } else if (values.has(v)) {
            foundIndex = 0;
            out = [];
            diff = index - values.get(v);
        }
        values.set(value(map), index);
    }
}

const [dif, index, out] = repeat();

console.log(`Answer: ${out[(1000000000 - index) % dif]}`);
console.log(`Run time: ${Date.now() - start} ms`);
