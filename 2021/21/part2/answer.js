const fs = require("fs");

const input = fs.readFileSync("./input.txt").toString();
const players = input.match(/\: [0-9]+/g).map((line) => {
    return { pos: parseInt(line.substring(2)), point: 0 };
});

const quantumDie = [0, 0, 0, 1, 3, 6, 7, 6, 3, 1];

const finalScore = 21;
function move(current, move) {
    return (current + move) % 10 === 0 ? 10 : (current + move) % 10;
}
function game(point1, point2, pos1, pos2, turn) {
    if (point1 >= finalScore) return [1, 0];
    if (point2 >= finalScore) return [0, 1];
    let totalWins = [0, 0];

    for (let moveCount = 3; moveCount < quantumDie.length; moveCount++) {
        let wins = [0, 0];
        if (turn === 0) {
            const newPos = move(pos1, moveCount);
            wins = game(point1 + newPos, point2, newPos, pos2, 1);
        } else {
            const newPos = move(pos2, moveCount);
            wins = game(point1, point2 + newPos, pos1, newPos, 0);
        }

        totalWins[0] += quantumDie[moveCount] * wins[0];
        totalWins[1] += quantumDie[moveCount] * wins[1];
    }
    return totalWins;
}
let start = Date.now();

const result = game(players[0].point, players[1].point, players[0].pos, players[1].pos, 0);

console.log(`Answer: ${Math.max(...result)}`);
console.log(`Run time: ${Date.now() - start} ms`);
