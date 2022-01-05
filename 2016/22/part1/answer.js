const fs = require("fs");
let start = Date.now();
const input = fs.readFileSync("./input.txt").toString();
const disks = input
    .split(/\r?\n/)
    .slice(2)
    .map((disk) =>
        disk
            .match(/.*[0-9]+T +([0-9]+)T +([0-9]+)T/)
            .slice(1)
            .map((s) => parseInt(s))
    );

let viable = 0;
for (let i = 0; i < disks.length; i++) {
    for (let j = 0; j < disks.length; j++) {
        if (i !== j && disks[i][0] > 0 && disks[i][0] < disks[j][1]) viable++;
    }
}
console.log(`Answer: ${viable}`);
console.log(`Run time: ${Date.now() - start} ms`);
