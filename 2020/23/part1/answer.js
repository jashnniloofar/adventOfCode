console.time("Run time");
const fs = require("fs");
const input = fs.readFileSync("./input.txt").toString();

function move(label) {
    const current = +label[0];
    const pickup = label.slice(1, 4);
    label = label.slice(4);
    let next = current;
    do {
        next = next === 1 ? 9 : next - 1;
        match = label.match(new RegExp(next));
    } while (!match);
    return label.slice(0, match.index + 1) + pickup + label.slice(match.index + 1) + current;
}

function simulate(input, round) {
    for (let index = 0; index < round; index++) {
        input = move(input);
    }
    const match = input.match(/1/);
    return input.slice(match.index + 1) + input.slice(0, match.index);
}

console.log(`Answer: ${simulate(input, 100)}`);
console.timeEnd("Run time");
