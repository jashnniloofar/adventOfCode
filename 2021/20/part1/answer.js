const fs = require("fs");

const input = fs.readFileSync("./input.txt").toString();
const lines = input.split(/\r?\n/);

const alg = lines[0].split("").map((p) => (p === "#" ? 1 : 0));
const inputImg = lines.slice(2);

function extendImage(img, char = ".") {
    let extended = [];
    var emptyLine = new Array(img[0].length + 5).join(char);
    extended.push(emptyLine);
    extended.push(emptyLine);
    for (const line of img) {
        extended.push(`${char}${char}${line}${char}${char}`);
    }
    extended.push(emptyLine);
    extended.push(emptyLine);
    return extended;
}
function enhance(img) {
    let output = [];
    for (let i = 1; i < img.length - 1; i++) {
        let line = "";
        for (let j = 1; j < img[i].length - 1; j++) {
            const str = img[i - 1].substring(j - 1, j + 2) + img[i].substring(j - 1, j + 2) + img[i + 1].substring(j - 1, j + 2);
            const index = parseInt(str.replace(/#/g, "1").replace(/\./g, "0"), 2);
            line += alg[index] === 1 ? "#" : ".";
        }
        output.push(line);
    }
    const char = lines[0][img[0][0] === "." ? 0 : 511];
    return extendImage(output, char);
}
function countLit(img) {
    let count = 0;
    for (let i = 0; i < img.length; i++) {
        count += img[i].split("#").length - 1;
    }
    return count;
}
let output = extendImage(inputImg);
for (let i = 0; i < 2; i++) {
    output = enhance(output);
}
console.log(`Answer: ${countLit(output)}`);
