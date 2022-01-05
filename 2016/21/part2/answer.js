const fs = require("fs");
let start = Date.now();
let input = "fbgdceah".split("");
const instructions = fs.readFileSync("./input.txt").toString().split(/\r?\n/);

function swap(arr, i, j) {
    const temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
}
function rotate(arr, steps, direction = "right") {
    let out = [];
    direction = direction === "right" ? 1 : -1;
    for (let i = 0; i < arr.length; i++) {
        out[(i + direction * steps + arr.length) % arr.length] = arr[i];
    }
    return out;
}

function rotateLetter(arr, letter) {
    const index = arr.findIndex((v) => v === letter);
    return rotate(arr, index + 1 + (index > 3 ? 1 : 0), "right");
}

function rotateBackLetter(arr, letter) {
    for (let i = 0; i < arr.length; i++) {
        const rotated = rotateLetter(rotate(arr, i, "left"), letter).join("");
        if (rotated === arr.join("")) return rotate(arr, i, "left");
    }
}

function reverse(arr, i, j) {
    return arr
        .slice(0, i)
        .concat(arr.slice(i, j + 1).reverse())
        .concat(arr.slice(j + 1));
}

function move(arr, i, j) {
    const temp = arr.splice(i, 1);
    return arr.slice(0, j).concat(temp).concat(arr.slice(j));
}
for (let i = instructions.length - 1; i >=0; i--) {
    const instruction = instructions[i];
    const positions = instruction.match(/[0-9]+/g) === null ? null : instruction.match(/[0-9]+/g).map((s) => parseInt(s));
    if (instruction.startsWith("swap position ")) {
        swap(input, positions[0], positions[1]);
    }
    if (instruction.startsWith("swap letter ")) {
        const letters = instruction.match(/swap letter (.) with letter (.)/).slice(1);
        const indexX = input.findIndex((v) => v === letters[0]);
        const indexY = input.findIndex((v) => v === letters[1]);
        swap(input, indexX, indexY);
    }
    if (instruction.startsWith("rotate left ")) {
        input = rotate(input, positions[0], "right");
    }
    if (instruction.startsWith("rotate right ")) {
        input = rotate(input, positions[0], "left");
    }
    if (instruction.startsWith("reverse positions ")) {
        input = reverse(input, positions[0], positions[1]);
    }
    if (instruction.startsWith("move position ")) {
        input = move(input, positions[1], positions[0]);
    }
    if (instruction.startsWith("rotate based on position of letter ")) {
        const letters = instruction.match(/rotate based on position of letter (.)/).slice(1);
        input = rotateBackLetter(input, letters[0]);
    }
}

console.log(`Answer: ${input.join("")}`);
console.log(`Run time: ${Date.now() - start} ms`);
