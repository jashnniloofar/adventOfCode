const fs = require("fs");

const input = fs.readFileSync("./input.txt").toString();
const players = input.match(/\: [0-9]+/g).map((line) => {
    return { pos: parseInt(line.substring(2)), point: 0 };
});
function move(current, move) {
    return (current + move) % 10 === 0 ? 10 : (current + move) % 10;
}
let turn = 0;
while (players[0].point < 1000 && players[1].point < 1000) {
    players[0].pos = move(players[0].pos, turn * 3 + 6);
    players[0].point = players[0].point + players[0].pos;
    turn += 3;

    if (players[0].point < 1000) {
        players[1].pos = move(players[1].pos, turn * 3 + 6);
        players[1].point = players[1].point + players[1].pos;
        turn += 3;
    }
}

console.log(`Answer: ${Math.min(...players.map(player=>player.point))* turn}`);
