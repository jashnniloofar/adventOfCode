const fs = require("fs");

const input = fs.readFileSync("./input.txt").toString();
const lines = input.split(/\r?\n/);

const vents = [];
for (let index = 0; index < lines.length; index++) {
    const tokens = lines[index].split(" -> ");
    vents[index] = [];
    vents[index].push(tokens[0].split(",").map((p) => parseInt(p)));
    vents[index].push(tokens[1].split(",").map((p) => parseInt(p)));
}

const map = [];
for (let i = 0; i < 1000; i++) {
    map[i] = [];
    for (let j = 0; j < 1000; j++) {
        map[i].push(0);
    }
}

function printMap(map) {
    for (let index = 0; index < map.length; index++) {
        console.log(`${map[index]}`);
    }
    console.log("------------------");
}

let result = 0;
for (let index = 0; index < vents.length; index++) {
    const vent = vents[index];
    const directionX = vent[0][0] === vent[1][0] ? 0 : vent[0][0] > vent[1][0] ? -1 : 1;
    const directionY = vent[0][1] === vent[1][1] ? 0 : vent[0][1] > vent[1][1] ? -1 : 1;
    if (directionX === 0 || directionY === 0) {
        let x = vent[0][0];
        let y = vent[0][1];
        while (x !== vent[1][0] || y !== vent[1][1]) {
            if (map[x][y] === 1) result++;
            map[x][y]++;
            x += directionX;
            y += directionY;
        }
        if (map[x][y] === 1) result++;
        map[x][y]++;
    }
}

console.log(`Answer: ${result}`);
