const fs = require("fs");
let start = Date.now();
const input = fs.readFileSync("./input.txt").toString();
const commands = new Map();
input.split(/\r?\n/).forEach((line) => {
    commands.set(line.split(" -> ")[1], line.split(" -> ")[0].split(" "));
});

let values = new Map();

function normalize(a) {
    return (a + 65536) % 65536;
}
function compute(command) {
    if (command.length === 1) {
        if (/[0-9]+/.test(command[0])) return parseInt(command[0]);
        if (values.has(command[0])) return values.get(command[0]);
        values.set(command[0], compute(commands.get(command[0])));
        return values.get(command[0]);
    }
    if (command[0] === "NOT") return normalize(~compute([command[1]]));
    if (command[1] === "AND") return normalize(compute([command[0]]) & compute([command[2]]));
    if (command[1] === "OR") return normalize(compute([command[0]]) | compute([command[2]]));
    if (command[1] === "RSHIFT") return normalize(compute([command[0]]) >> compute([command[2]]));
    if (command[1] === "LSHIFT") return normalize(compute([command[0]]) << compute([command[2]]));
}
commands.set("b", [compute(commands.get("a"))]);
values = new Map()
console.log(`Answer: ${compute(commands.get("a"))}`);
console.log(`Run time: ${Date.now() - start} ms`);
