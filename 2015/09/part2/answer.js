const fs = require("fs");
let start = Date.now();
const input = fs.readFileSync("./input.txt").toString();
const cities = new Map();
function getCode(city) {
    if (!cities.has(city)) cities.set(city, cities.size);
    return cities.get(city);
}
const distances = new Map();
input.split(/\r?\n/).map((line) => {
    const parts = line.split(" = ");
    setDistance(
        distances,
        parts[0].split(" to ").map((city) => getCode(city)),
        parseInt(parts[1])
    );
});
function setDistance(map, arr, distance) {
    map.set(`${arr[0]},${arr[1]}`, distance);
    map.set(`${arr[1]},${arr[0]}`, distance);
}
function findLongest(start, nodes) {
    if (nodes.length === 1) return distances.get(`${start},${nodes[0]}`);
    let max = 0;
    for (let i = 0; i < nodes.length; i++) {
        const path = findLongest(nodes[i], nodes.slice(0, i).concat(nodes.slice(i + 1, nodes.length)));
        const distance = distances.has(`${start},${nodes[i]}`) ? distances.get(`${start},${nodes[i]}`) : 0;
        if (distance + path > max) {
            max = path + distance;
        }
    }
    return max;
}
console.log(`Answer: ${findLongest(-1, [...cities.values()])}`);
console.log(`Run time: ${Date.now() - start} ms`);
