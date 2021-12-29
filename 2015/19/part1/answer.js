const fs = require("fs");
let start = Date.now();
const input = fs.readFileSync("./input.txt").toString();
const lines = input.split(/\r?\n/);
const startMolcule = lines[lines.length - 1];
const allMolcules = new Map()
for (let i = 0; i < lines.length - 2; i++) {
    const [mol, rep] = lines[i].split(" => ");
    const regexp = new RegExp(mol, "g");
    [...startMolcule.matchAll(regexp)].forEach((match) => {
        const str = startMolcule.substring(0, match.index) + rep + startMolcule.substring(match.index + mol.length);
        allMolcules.set(str, 1)
    });
}
// console.log(allMolcules.size);
console.log(`Answer: ${allMolcules.size}`);
console.log(`Run time: ${Date.now() - start} ms`);
