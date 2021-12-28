const fs = require("fs");
let start = Date.now();
const input = fs.readFileSync("./input.txt").toString();
const ingredients = input.split(/\r?\n/).map((line) => line.match(/\-?[0-9]+/g).map((s) => parseInt(s)));

function sum(arr) {
    return arr.reduce(function (a, b) {
        return a + b;
    }, 0);
}

function calcCalories(teaspoons) {
    let sum = 0;
    ingredients.forEach((v, index) => {
        sum += v[4] * teaspoons[index];
    });
    return sum;
}

function calcScore(teaspoons) {
    let score = 1;
    if (calcCalories(teaspoons) !== 500) return 0
    for (let i = 0; i < 4; i++) {
        let sum = 0;
        ingredients.forEach((v, index) => {
            sum += v[i] * teaspoons[index];
        });
        sum = sum > 0 ? sum : 0;
        score *= sum;
    }
    return score;
}
function maxScore(teaspoons, remains) {
    if (remains === 1) {
        teaspoons.push(100 - sum(teaspoons));
        return calcScore(teaspoons);
    } else {
        let max = 0;
        for (let i = 1; i <= 101 - remains; i++) {
            let curent = maxScore([...teaspoons, i], remains - 1);
            if (curent > max) max = curent;
        }
        return max;
    }
}

console.log(`Answer: ${maxScore([], ingredients.length)}`);
console.log(`Run time: ${Date.now() - start} ms`);
