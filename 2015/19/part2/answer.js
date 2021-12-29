const fs = require("fs");
let start = Date.now();
const input = fs.readFileSync("./input.txt").toString();
const lines = input.split(/\r?\n/);
const formula = lines[lines.length - 1];

let target = formula;
let steps = 0;
while (target != "e") {
    for (let i = 0; i < lines.length - 2; i++) {
        const [element, rep] = lines[i].split(" => ");
        if (target.search(rep) >= 0) {
            target = target.replace(rep, element);
            steps = steps + 1;
        }
    }
}

console.log(`Answer: ${steps}`);
console.log(`Run time: ${Date.now() - start} ms`);
