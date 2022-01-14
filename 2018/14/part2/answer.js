const fs = require("fs");
let start = Date.now();
const input = fs.readFileSync("./input.txt").toString();
const len = input.length + 1;
const recipes = [3, 7];
const elves = [0, 1];

let found = false;
const regex = new RegExp(input);
do {
    const sum = recipes[elves[0]] + recipes[elves[1]];
    if (sum >= 10) recipes.push(1);
    recipes.push(sum % 10);
    found = regex.test(recipes.slice(-len).join(""));
    elves[0] = (recipes[elves[0]] + 1 + elves[0]) % recipes.length;
    elves[1] = (recipes[elves[1]] + 1 + elves[1]) % recipes.length;
} while (!found);

console.log(`Answer: ${recipes.length + regex.exec(recipes.slice(-len).join("")).index - 7}`);
console.log(`Run time: ${Date.now() - start} ms`);
