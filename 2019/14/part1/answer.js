const fs = require("fs");
let start = Date.now();
const input = fs.readFileSync("./input.txt").toString();
const reactions = {};
input.split(/\r?\n/).forEach((line) => {
    const [inp, out] = line.split(" => ");
    const [pack, name] = out.split(" ");
    const formula = {};
    inp.split(", ").forEach((pair) => {
        const [count, ch] = pair.split(" ");
        formula[ch] = +count;
    });
    reactions[name] = { pack: +pack, inp: 0, formula };
});

Object.values(reactions).forEach((reaction) => {
    for (const ch in reaction.formula) {
        if (reactions[ch] !== undefined) reactions[ch].inp++;
    }
});

function zeroInputElement(chemical) {
    for (const element in chemical) {
        if (reactions[element].inp === 0) return element;
    }
    return null;
}

function calcOre(fuel) {
    const chemical = { FUEL: fuel };
    let oreCount = 0;
    while (Object.keys(chemical).length > 0) {
        const element = zeroInputElement(chemical);
        const packCount = Math.ceil(chemical[element] / reactions[element].pack);
        for (const [ch, count] of Object.entries(reactions[element].formula)) {
            if (ch === "ORE") oreCount += packCount * count;
            else {
                chemical[ch] = (chemical[ch] || 0) + count * packCount;
                reactions[ch].inp--;
            }
        }
        delete chemical[element];
    }
    return oreCount;
}

console.log(`Answer: ${calcOre(1)}`);
console.log(`Run time: ${Date.now() - start} ms`);
