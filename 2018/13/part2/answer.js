const fs = require("fs");
let start = Date.now();
const input = fs.readFileSync("./input.txt").toString();
let carts = [];
const directions = [([x, y]) => [x, y - 1], ([x, y]) => [x - 1, y], ([x, y]) => [x, y + 1], ([x, y]) => [x + 1, y]];
const map = input.split(/\r?\n/).map((line, y) =>
    line.split("").map((s, x) => {
        const direction = ["^", "<", "v", ">"].findIndex((d) => d === s);
        if (direction >= 0) {
            carts.push({ x, y, direction, change: 0 });
            if (s === "^" || s === "v") return "|";
            return "-";
        }
        return s;
    })
);

const turns = { "\\": [1, 0, 3, 2], "/": [3, 2, 1, 0] };

function move(cart) {
    const char = map[cart.y][cart.x];
    if (char === "+") {
        cart.direction = (cart.direction + 5 - cart.change) % 4;
        cart.change = (cart.change + 1) % 3;
    }
    if (char === "\\" || char === "/") {
        cart.direction = turns[char][cart.direction];
    }
    [cart.x, cart.y] = directions[cart.direction]([cart.x, cart.y]);
}

while (carts.length > 1) {
    carts = carts.sort((c1, c2) => (c1.y === c2.y ? c1.x - c2.x : c1.y - c2.y));
    for (const cart of carts) {
        let crash = false;
        move(cart);
        for (let cart2 of carts) {
            if (cart !== cart2 && cart.x === cart2.x && cart.y === cart2.y) {
                crash = true;
            }
        }
        if (crash) carts = carts.filter((c) => c.x !== cart.x || c.y !== cart.y);
    }
}

console.log(`Answer: ${carts[0].x},${carts[0].y}`);
console.log(`Run time: ${Date.now() - start} ms`);
