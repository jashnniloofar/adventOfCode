const fs = require("fs");
let start = Date.now();
const memory = fs.readFileSync("./input.txt").toString().split(",").map(Number);

function getParam(memory, mode, position, relativeBase) {
    const pos = mode === 0 ? memory[position] : mode === 1 ? position : memory[position] + relativeBase;
    return { pos, value: memory[pos] || 0 };
}

const directions = [([x, y]) => [x, y - 1], ([x, y]) => [x, y + 1], ([x, y]) => [x - 1, y], ([x, y]) => [x + 1, y]];
const reverse = [1, 0, 3, 2];

let minX = Infinity;
let maxX = -Infinity;
let minY = Infinity;
let maxY = -Infinity;
function sendOutput(map, x, y, val) {
    minX = Math.min(minX, x);
    maxX = Math.max(maxX, x);
    minY = Math.min(minY, y);
    maxY = Math.max(maxY, y);
    map.set(`${x},${y}`, val);
}

function knownAdj(map, x, y) {
    return map.has(`${x + 1},${y}`) && map.has(`${x - 1},${y}`) && map.has(`${x},${y + 1}`) && map.has(`${x},${y - 1}`);
}

function RunIntcode(memory) {
    let current = [0, 0];
    let oxygen = [];
    // let next = { x: 0, y: 0 };
    const returnPath = [];
    const map = new Map();
    let ip = 0;
    let direction;
    let relativeBase = 0;
    while (memory[ip] !== 99 && (!knownAdj(map, current.x, current.y) || returnPath.length > 0)) {
        const opcode = memory[ip] % 100;
        const mode1 = Math.floor(memory[ip] / 100) % 10;
        const mode2 = Math.floor(memory[ip] / 1000) % 10;
        const mode3 = Math.floor(memory[ip] / 10000) % 10;
        const param1 = getParam(memory, mode1, ip + 1, relativeBase);
        const param2 = getParam(memory, mode2, ip + 2, relativeBase);
        const param3 = getParam(memory, mode3, ip + 3, relativeBase);
        switch (opcode) {
            case 1:
                memory[param3.pos] = param1.value + param2.value;
                ip += 4;
                break;
            case 2:
                memory[param3.pos] = param1.value * param2.value;
                ip += 4;
                break;
            case 3:
                direction = -1;
                const [x, y] = current;
                if (!map.has(`${x},${y - 1}`)) {
                    direction = 0;
                } else if (!map.has(`${x},${y + 1}`)) {
                    direction = 1;
                } else if (!map.has(`${x - 1},${y}`)) {
                    direction = 2;
                } else if (!map.has(`${x + 1},${y}`)) {
                    direction = 3;
                }
                if (direction < 0) direction = returnPath.pop();
                memory[param1.pos] = direction + 1;
                ip += 2;
                break;
            case 4:
                const [nextX, nextY] = directions[direction](current);
                if (param1.value) {
                    current = [nextX, nextY];
                    if (!map.has(`${nextX},${nextY}`)) returnPath.push(reverse[direction]);
                }
                if (param1.value === 2) {
                    oxygen = [nextX, nextY];
                }
                sendOutput(map, nextX, nextY, param1.value);
                ip += 2;
                break;
            case 5:
                ip = param1.value !== 0 ? param2.value : ip + 3;
                break;
            case 6:
                ip = param1.value === 0 ? param2.value : ip + 3;
                break;
            case 7:
                memory[param3.pos] = param1.value < param2.value ? 1 : 0;
                ip += 4;
                break;
            case 8:
                memory[param3.pos] = param1.value === param2.value ? 1 : 0;
                ip += 4;
                break;
            case 9:
                relativeBase += param1.value;
                ip += 2;
                break;
            default:
                break;
        }
    }
    return { map, oxygen };
}

function draw(map) {
    for (let y = minY; y <= maxY; y++) {
        let out = "";
        for (let x = minX; x <= maxX; x++) {
            let color = -1;
            if (map.has(`${x},${y}`)) color = map.get(`${x},${y}`);
            if (x == 0 && y == 0) color = 3;
            switch (color) {
                case 0:
                    out += "#";
                    break;
                case 1:
                    out += ".";
                    break;
                case 2:
                    out += "O";
                    break;
                case 3:
                    out += "X";
                    break;
                case -1:
                    out += " ";
                    break;
                default:
                    break;
            }
        }
        console.log(out);
    }
}

function maxShortestPath(map, start) {
    const queue = [[...start, 0]];
    const path = new Map();
    let max = 0;
    while (queue.length > 0) {
        const [x, y, d] = queue.shift();
        if (map.get(`${x},${y}`) === 0 || path.has(`${x},${y}`)) continue;
        path.set(`${x},${y}`, d);
        if (d > max) max = d;
        queue.push([x - 1, y, d + 1]);
        queue.push([x + 1, y, d + 1]);
        queue.push([x, y - 1, d + 1]);
        queue.push([x, y + 1, d + 1]);
    }
    return max;
}

const { map, oxygen } = RunIntcode(memory);

console.log(`Answer: ${maxShortestPath(map, oxygen)}`);
console.log(`Run time: ${Date.now() - start} ms`);
