console.time("Run time");
const fs = require("fs");
const input = fs.readFileSync("./input.txt").toString();
const rules = [];
let tickets = [];
input.split(/\r?\n/).forEach((line) => {
    if (/or/.test(line)) {
        const [_, name, min1, max1, min2, max2] = line.match(/([a-z ]+): (\d+)-(\d+) or (\d+)-(\d+)/);
        rules.push({ name, min1: +min1, max1: +max1, min2: +min2, max2: +max2 });
    } else if (/,/.test(line)) {
        tickets.push(line.split(",").map(Number));
    }
});

function getError(ticket) {
    for (const number of ticket) {
        const valid = rules.some((rule) => isValid(number, rule));
        if (!valid) return number;
    }
    return -1;
}

function isValid(number, rule) {
    const { min1, max1, min2, max2 } = rule;
    return (number >= min1 && number <= max1) || (number >= min2 && number <= max2);
}

function solve(tickets) {
    tickets = tickets.filter((ticket) => getError(ticket) === -1);
    const guesses = [];
    for (let i = 0; i < rules.length; i++) {
        guesses[i] = rules;
    }
    const found = [];
    for (const ticket of tickets) {
        for (let i = 0; i < ticket.length; i++) {
            guesses[i] = guesses[i].filter((rule) => isValid(ticket[i], rule));
            if (guesses[i].length === 1 && !found.includes(guesses[i][0])) {
                const guess = guesses[i][0];
                for (let j = 0; j < guesses.length; j++) {
                    if (i !== j) guesses[j] = guesses[j].filter((rule) => rule.name !== guess.name);
                }
                found.push(guess);
            }
        }
    }
    let result = 1;
    for (let i = 0; i < guesses.length; i++) {
        if (guesses[i][0].name.startsWith("departure")) {
            result *= tickets[0][i];
        }
    }
    return result
}

console.log(`Answer: ${solve(tickets)}`);
console.timeEnd("Run time");
