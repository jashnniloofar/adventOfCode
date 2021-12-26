const fs = require("fs");

const input = fs.readFileSync("./input.txt").toString();
const lines = input.split(/\r?\n/);
const dots = new Map();
const folds = [];

lines.forEach((line) => {
    if (line.startsWith("fold along")) {
        const fold = { direction: "x", position: parseInt(line.split("=")[1]) };
        if (line.startsWith("fold along y")) {
            fold.direction = "y";
        }
        folds.push(fold);
    } else {
        if (line.length > 0) {
            dots.set(line, 1);
        }
    }
});

function foldPaper(dots, fold) {
    dots.forEach((val, key) => {
        const dot = { x: parseInt(key.split(",")[0]), y: parseInt(key.split(",")[1]) };
        if (fold.direction === "x" && dot.x > fold.position && dot.x <= fold.position * 2) {
            dots.delete(key);
            dots.set(`${fold.position * 2 - dot.x},${dot.y}`, 1);
        }
        if (fold.direction === "y" && dot.y > fold.position && dot.y <= fold.position * 2) {
            dots.delete(key);
            dots.set(`${dot.x},${fold.position * 2 - dot.y}`, 1);
        }
    });
}

folds.forEach((fold) => {
    foldPaper(dots, fold);
});

const map = [];

dots.forEach((val, key) => {
    const dot = { x: parseInt(key.split(",")[0]), y: parseInt(key.split(",")[1]) };
    if (!map[dot.y]) {
        map[dot.y] = ". . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . ";
    }
    map[dot.y] = map[dot.y].substring(0, 2 * dot.x) + " #" + map[dot.y].substring(2 * dot.x + 2);
});
console.log(map);
