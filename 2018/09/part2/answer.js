const fs = require("fs");
let start = Date.now();
const input = fs.readFileSync("./input.txt").toString();

const [playerCount, marbleCount] = input.match(/\d+/g).map((s) => +s);
let current = { value: 0 };
current.prev = current;
current.next = current;
const scores = [];

let turn = 0;
for (let i = 1; i <= marbleCount * 100; i++) {
    if (i % 23 === 0) {
        scores[turn] = (scores[turn] || 0) + i;

        let target = current;
        for (let i = 0; i < 7; i++) {
            target = target.prev;
        }

        scores[turn] += target.value;
        target.next.prev = target.prev;
        target.prev.next = target.next;
        current = target.next;
    } else {
        let target = current.next;
        let newMarble = { value: i, prev: target, next: target.next };
        target.next.prev = newMarble;
        target.next = newMarble;
        current = newMarble;
    }
    turn = (turn + 1) % playerCount;
}

console.log(`Answer: ${Math.max(...scores)}`);
console.log(`Run time: ${Date.now() - start} ms`);
