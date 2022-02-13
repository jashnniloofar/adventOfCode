const fs = require("fs");
let start = Date.now();
const input = fs.readFileSync("./input.txt").toString();
const steps = input.split(/\r?\n/);
const cardsLength = 119315717514047;
let cards = [];
for (let i = 0; i < cardsLength; i++) {
    cards[i] = i;
}

function cutN(cards, num) {
    num = (num + cardsLength) % cardsLength;
    return cards.slice(num).concat(cards.slice(0, num));
}

function dealWithIncrement(cards, num) {
    let out = [];
    for (let i = 0; i < cards.length; i++) {
        out[(i * num) % cardsLength] = cards[i];
    }
    return out;
}

function shuffle(cards, steps) {
    for (const step of steps) {
        if (step === "deal into new stack") cards = cards.reverse();
        else if (step.startsWith("cut")) cards = cutN(cards, +step.match(/\-?[\d]+/));
        else cards = dealWithIncrement(cards, +step.match(/\-?[\d]+/));
    }
    console.log(cards);
    return cards;
}


cards = shuffle(cards, steps);

console.log(`Answer: ${cards.findIndex((card) => card === 2019)}`);
console.log(`Run time: ${Date.now() - start} ms`);
