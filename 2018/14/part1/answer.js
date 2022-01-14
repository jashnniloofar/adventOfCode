const fs = require("fs");
let start = Date.now();
// const input = parseInt(fs.readFileSync("./sample.txt").toString());
const input = 20173663

const recipes = [3, 7];
const elves = [0, 1];

while (recipes.length < 10 + input) {
    const sum = recipes[elves[0]] + recipes[elves[1]];
    if (sum >= 10) recipes.push(1);
    recipes.push(sum % 10);
    elves[0] = (recipes[elves[0]] + 1 + elves[0]) % recipes.length;
    elves[1] = (recipes[elves[1]] + 1 + elves[1]) % recipes.length;
}
console.log(recipes.slice(input, input + 10).join(""));



console.log(`Answer: ${input}`);
console.log(`Run time: ${Date.now() - start} ms`);
