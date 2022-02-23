console.time("Run time");
const fs = require("fs");
const input = fs.readFileSync("./input.txt").toString().split(",").map(Number);

function spoken(input, targetTurn) {
    let turn = 1;
    const history = new Array(targetTurn);
    for (const number of input.slice(0, input.length - 1)) {
        history[number] = turn++;
    }
    turn = input.length;
    let previous = input[input.length - 1];
    let current = 0;
    for (; turn < targetTurn; turn++) {
        if (history[previous]) {
            current = turn - history[previous];
        } else {
            current = 0;
        }
        history[previous] = turn;
        previous = current;
    }
    return current;
}

console.log(`Answer: ${spoken(input, 30000000)}`);
console.timeEnd("Run time");
