const fs = require("fs");
let start = Date.now();
const memory = fs.readFileSync("./input.txt").toString().split(",").map(Number);

function getParam(memory, mode, position, relativeBase) {
    const pos = mode === 0 ? memory[position] : mode === 1 ? position : memory[position] + relativeBase;
    return { pos, value: memory[pos] || 0 };
}

let minX = Infinity;
let maxX = -Infinity;
let minY = Infinity;
let maxY = -Infinity;
function senOutput(panel, out) {
    const [x, y, id] = out;
    minX = Math.min(minX, x);
    maxX = Math.max(maxX, x);
    minY = Math.min(minY, y);
    maxY = Math.max(maxY, y);
    if (x === -1 && y === 0) panel.set("score", id);
    else panel.set(`${x},${y}`, id);
}
function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

async function RunIntcode(memory, drawGame = false) {
    const ball = { x: 0, y: 0 };
    const paddle = { x: 0, y: 0 };
    let score = 0;
    const panel = new Map();
    let ip = 0;
    let out = [];
    let relativeBase = 0;
    while (memory[ip] !== 99) {
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
                const dir = paddle.x > ball.x ? -1 : paddle.x < ball.x ? 1 : 0;
                memory[param1.pos] = dir;
                ip += 2;
                break;
            case 4:
                out.push(param1.value);
                if (out.length === 3) {
                    const [x, y, id] = out;
                    senOutput(panel, out);
                    if (x === -1 && y === 0) score = +id;
                    // console.log();
                    else if (id === 4) {
                        ball.x = x;
                        ball.y = y;
                    } else if (id === 3) {
                        paddle.x = x;
                        paddle.y = y;
                    }
                    out = [];
                }
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
        if (drawGame && opcode === 4 && paddle.y !== 0) {
            await sleep(1);
            draw(panel);
        }
    }
    return { panel, score };
}

function draw(panel) {
    console.clear();
    for (let y = minY; y <= maxY; y++) {
        let out = `${y}`.padEnd(2, " ");
        for (let x = minX; x <= maxX; x++) {
            let color = 0;
            if (panel.has(`${x},${y}`)) color = panel.get(`${x},${y}`);
            switch (color) {
                case 0:
                    out += " ";
                    break;
                case 1:
                    out += "▮";
                    break;
                case 2:
                    out += "#";
                    break;
                case 3:
                    out += "=";
                    break;
                case 4:
                    out += "O";
                    break;
                default:
                    break;
            }
        }
        console.log(out);
    }
    console.log(`Score: `, panel.get("score"));
}

memory[0] = 2;
RunIntcode(memory).then((res) => {
    console.log(`Answer: ${res.score}`);
    console.log(`Run time: ${Date.now() - start} ms`);
});
