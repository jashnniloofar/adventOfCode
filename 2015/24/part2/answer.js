const fs = require("fs");
let start = Date.now();
const input = fs.readFileSync("./input.txt").toString();
const packages = input.split(/\r?\n/).map((p) => parseInt(p));

const balancedWeight = sum(packages) / 4;

function sum(array) {
    return array.reduce((a, b) => a + b, 0);
}
function QE(array) {
    let out = 1;
    array.forEach((element) => {
        out *= element;
    });
    return out;
}

let minQE = Number.MAX_SAFE_INTEGER;
let minCount = Number.MAX_SAFE_INTEGER;

function balance(group1, index) {
    let currentSum = sum(group1);
    if (currentSum === balancedWeight) {
        if (group1.length < minCount || (group1.length === minCount && QE(group1) < minQE)) {
            minCount = group1.length;
            minQE = QE(group1);
        }
    }
    if (group1.length > minCount || index >= packages.length || currentSum >= balancedWeight) return;
    balance([...group1, packages[index]], index + 1);
    balance(group1, index + 1);
}
balance([], 0);

console.log(`Answer: ${minQE}`);
console.log(`Run time: ${Date.now() - start} ms`);
