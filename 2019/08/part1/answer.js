const fs = require("fs");
let start = Date.now();
const input = fs.readFileSync("./input.txt").toString();

function lessZero(input) {
    let index = 0;
    let min = Infinity;
    let result;
    while (index < input.length) {
        const layer = input.slice(index, index + 150);
        const count0 = layer.split("0").length;
        if (count0 < min) {
            min = count0;
            result = layer;
        }
        index += 150;
    }
    return result;
}

const layer = lessZero(input);

console.log(`Answer: ${(layer.split("1").length - 1) * (layer.split("2").length - 1)}`);
console.log(`Run time: ${Date.now() - start} ms`);
