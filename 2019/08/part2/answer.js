const fs = require("fs");
let start = Date.now();
const input = fs.readFileSync("./input.txt").toString();

function addLayer(layer1, layer2 = "") {
    if (layer2 === "") return layer1;
    let result = "";
    for (let i = 0; i < layer2.length; i++) {
        if (layer2[i] === "2") result += layer1[i];
        else result += layer2[i];
    }
    return result;
}

function decode(input, size) {
    let index = 0;
    let result = "";
    while (index < input.length) {
        result = addLayer(input.slice(index, index + size), result);
        index += size;
    }
    return result;
}

function draw(image, width, height) {
    image = image.replace(/1/g, "▮").replace(/0/g, " ");
    for (let i = 0; i < height; i++) {
        console.log(image.slice(i * width, i * width + width));
    }
}

const image = decode(input, 150);
draw(image, 25, 6);

console.log(`Run time: ${Date.now() - start} ms`);
