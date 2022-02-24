console.time("Run time");
const fs = require("fs");

const input = fs.readFileSync("./input.txt").toString();
const decks = input.split(/\n\n/).map((player) => player.split("\n").slice(1).map(Number));

function game(player1, player2) {
    const history1 = new Set();
    const history2 = new Set();
    while (player1.length > 0 && player2.length > 0) {
        if (history1.has(player1.join(",")) || history2.has(player2.join(","))) {
            return 0;
        }
        history1.add(player1.join(","));
        history2.add(player2.join(","));
        const card1 = player1.shift();
        const card2 = player2.shift();
        if (player1.length >= card1 && player2.length >= card2) {
            game(player1.slice(0, card1), player2.slice(0, card2)) === 0 ? player1.push(card1, card2) : player2.push(card2, card1);
        } else {
            card1 > card2 ? player1.push(card1, card2) : player2.push(card2, card1);
        }
    }
    return player1.length > 0 ? 0 : 1;
}

const winner = game(decks[0], decks[1]);
const score = decks[winner].reverse().reduce((score, card, index) => (score += card * (index + 1)), 0);

console.log(`Answer: ${score}`);
console.timeEnd("Run time");
