const fs = require("fs");
const input = fs.readFileSync("./input.txt").toString();
const expenses = input.split(/\r?\n/).map(Number);

function solve(sum) {
    for (let i = 0; i < expenses.length; i++) {
        for (let j = 0; j < expenses.length; j++) {
            for (let k = 0; k < expenses.length; k++) {
                if (i !== j && j !== k && i !== k && expenses[i] + expenses[j] + expenses[k] === sum) return expenses[i] * expenses[j] * expenses[k];
            }
        }
    }
}

console.time("Run time");
console.log(`Answer: ${solve(2020)}`);
console.timeEnd("Run time");
