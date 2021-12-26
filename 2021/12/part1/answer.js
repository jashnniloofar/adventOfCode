const fs = require("fs");

const input = fs.readFileSync("./input.txt").toString();
const lines = input.split(/\r?\n/);
const connections = [];
lines.forEach((line) => {
    connections.push(line.split("-"));
    connections.push([line.split("-")[1], line.split("-")[0]]);
});
let totalPath = 0;
function findPath(current, start, smallCaveVisited) {
    if (start === "end") {
        totalPath++;
        return;
    }
    connections.forEach((connection) => {
        const source = connection[0];
        const destination = connection[1];
        if (
            source === start &&
            destination !== "start" &&
            (destination.toLowerCase() !== destination || current.search(`${destination},`) === -1 || !smallCaveVisited)
        ) {
            if (destination.toLowerCase() === destination && current.search(`${destination},`) !== -1)
                findPath(current + `,${destination}`, destination, true);
            else findPath(current + `,${destination}`, destination, smallCaveVisited);
        }
    });
}
findPath("start", "start", false);

console.log(`Answer: ${totalPath}`);
