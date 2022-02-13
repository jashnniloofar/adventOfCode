const fs = require("fs");

function getAdj(layers, level, x, y) {
    let adj =
        (layers[level][y][x - 1] === "#") +
        (layers[level][y][x + 1] === "#") +
        (layers[level][y - 1] != undefined && layers[level][y - 1][x] === "#") +
        (layers[level][y + 1] != undefined && layers[level][y + 1][x] === "#");
    if (y === 0 && layers[level - 1]) {
        adj += layers[level - 1][1][2] === "#";
    } else if (y === 4 && layers[level - 1]) {
        adj += layers[level - 1][3][2] === "#";
    }
    if (x === 0 && layers[level - 1]) {
        adj += layers[level - 1][2][1] === "#";
    } else if (x === 4 && layers[level - 1]) {
        adj += layers[level - 1][2][3] === "#";
    }
    if (y === 1 && x === 2 && layers[level + 1]) {
        adj +=
            (layers[level + 1][0][0] === "#") +
            (layers[level + 1][0][1] === "#") +
            (layers[level + 1][0][2] === "#") +
            (layers[level + 1][0][3] === "#") +
            (layers[level + 1][0][4] === "#");
    } else if (y === 2 && x === 1 && layers[level + 1]) {
        adj +=
            (layers[level + 1][0][0] === "#") +
            (layers[level + 1][1][0] === "#") +
            (layers[level + 1][2][0] === "#") +
            (layers[level + 1][3][0] === "#") +
            (layers[level + 1][4][0] === "#");
    } else if (y === 3 && x === 2 && layers[level + 1]) {
        adj +=
            (layers[level + 1][4][0] === "#") +
            (layers[level + 1][4][1] === "#") +
            (layers[level + 1][4][2] === "#") +
            (layers[level + 1][4][3] === "#") +
            (layers[level + 1][4][4] === "#");
    } else if (y === 2 && x === 3 && layers[level + 1]) {
        adj +=
            (layers[level + 1][0][4] === "#") +
            (layers[level + 1][1][4] === "#") +
            (layers[level + 1][2][4] === "#") +
            (layers[level + 1][3][4] === "#") +
            (layers[level + 1][4][4] === "#");
    }
    return adj;
}
function tick(data) {
    if (getValue(data.layers[data.min]) !== 0) {
        data.min--;
        data.layers[data.min] = [".....", ".....", ".....", ".....", "....."];
    }
    if (getValue(data.layers[data.max]) !== 0) {
        data.max++;
        data.layers[data.max] = [".....", ".....", ".....", ".....", "....."];
    }
    let output = {};
    for (const key in data.layers) {
        const pattern = data.layers[key];
        output[key] = [];
        for (let y = 0; y < pattern.length; y++) {
            output[key][y] = "";
            for (let x = 0; x < pattern.length; x++) {
                if (x === 2 && y === 2) output[key][y] += "?";
                else {
                    const adj = getAdj(data.layers, Number(key), x, y);
                    if (pattern[y][x] === ".") {
                        if (adj === 1 || adj === 2) output[key][y] += "#";
                        else output[key][y] += ".";
                    } else {
                        if (adj === 1) output[key][y] += "#";
                        else output[key][y] += ".";
                    }
                }
            }
        }
    }
    data.layers = output;
}

function getValue(pattern) {
    return parseInt(pattern.join("").split("").reverse().join("").replace(/#/g, "1").replace(/\./g, "0"), 2);
}

function solve(minutes) {
    let input = fs.readFileSync("./input.txt").toString().split(/\r?\n/);
    let data = { layers: { 0: input }, min: 0, max: 0 };
    for (let i = 0; i < minutes; i++) {
        tick(data);
    }
    return Object.values(data.layers).reduce((sum, layer) => (sum += layer.join("").split("#").length - 1), 0);
}

console.time("Run time");
console.log(`Answer: ${solve(200)}`);
console.timeEnd("Run time");
