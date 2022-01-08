const fs = require("fs");
let start = Date.now();
const input = fs.readFileSync("./input.txt").toString();
const lines = input.split(/\r?\n/).map((line) => line.match(/([a-z]+) (inc|dec) (\-?[0-9]+) if ([a-z]+) (>|>=|==|<|<=|!=) (\-?[0-9]+)/).slice(1));
const state = {};
function get(variable) {
    return state[variable] === undefined ? 0 : state[variable];
}

function evalCondition(condition) {
    const variable = get(condition[0]);
    const operator = condition[1];
    const value = parseInt(condition[2]);
    if (operator === ">") return variable > value;
    if (operator === ">=") return variable >= value;
    if (operator === "<") return variable < value;
    if (operator === "<=") return variable <= value;
    if (operator === "==") return variable == value;
    if (operator === "!=") return variable != value;
}
for (const line of lines) {
    const [variable, operator, value, ...condition] = line;
    if (evalCondition(condition)) {
        if (operator === "inc") {
            state[variable] = get(variable) + parseInt(value);
        } else {
            state[variable] = get(variable) - parseInt(value);
        }
    }
}

console.log(`Answer: ${Math.max(...Object.values(state))}`);
console.log(`Run time: ${Date.now() - start} ms`);
