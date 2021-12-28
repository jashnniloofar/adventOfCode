const fs = require("fs");
let start = Date.now();
const input = fs.readFileSync("./input.txt").toString();
const message = { children: 3, cats: 7, samoyeds: 2, pomeranians: 3, akitas: 0, vizslas: 0, goldfish: 5, trees: 3, cars: 2, perfumes: 1 };
function detectAuntIndex(input) {
    let out;
    input.split(/\r?\n/).forEach((line, index) => {
        const aunt = JSON.parse("{" + line.substring(line.search(": ") + 2).replace(/[a-z]+/g, '"$&"') + "}");
        let matched = true;
        for (const key in message) {
            if (key === "cats" || key === "trees") {
                if (aunt[key] !== undefined && aunt[key] <= message[key]) matched = false;
            } else if (key === "pomeranians" || key === "goldfish") {
                if (aunt[key] !== undefined && aunt[key] >= message[key]) matched = false;
            } else if (aunt[key] !== undefined && aunt[key] !== message[key]) matched = false;
        }
        if (matched) out = index + 1;
    });
    return out;
}

console.log(`Answer: ${detectAuntIndex(input)}`);
console.log(`Run time: ${Date.now() - start} ms`);
