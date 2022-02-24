console.time("Run time");
const fs = require("fs");
const input = fs.readFileSync("./input.txt").toString();
const decks = input.split(/\n\n/).map((player) => player.split("\n").slice(1).map(Number));

function game() {
    while (decks[0].length > 0 && decks[1].length > 0) {
        const player1 = decks[0].shift();
        const player2 = decks[1].shift();
        if (player1 > player2) decks[0].push(player1, player2);
        else decks[1].push(player2, player1);
    }
    const winner = decks[0].length > 0 ? decks[0] : decks[1];
    return winner.reduce((score, card, index) => (score += card * (winner.length - index)), 0);
}

const score = game();

console.log(`Answer: ${score}`);
console.timeEnd("Run time");
