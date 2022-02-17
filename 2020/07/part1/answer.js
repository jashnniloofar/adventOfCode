console.time("Run time");
const fs = require("fs");
const input = fs.readFileSync("./input.txt").toString();
const bags = {};
const getBag = (name) => {
    if (!bags[name]) bags[name] = { name, children: {}, parents: {} };
    return bags[name];
};
input.split(/\r?\n/).forEach((line) => {
    const [parentName, contains] = line.split(" bags contain");
    if (contains === " no other bags.") return;

    const parent = getBag(parentName);
    contains.split(",").map((part) => {
        const [_, num, childName] = /(\d)+ (.+) bag/.exec(part);
        const child = getBag(childName);
        parent.children[childName] = +num;
        child.parents[parentName] = parentName;
    });
});

function canContain(bagName) {
    const visited = new Set();
    const queue = [bagName];
    while (queue.length) {
        const bag = queue.shift();
        if (visited.has(bag)) continue;
        visited.add(bag);
        for (const parentName in bags[bag].parents) {
            queue.push(parentName);
        }
    }
    return visited.size - 1;
}

console.log(`Answer: ${canContain("shiny gold")}`);
console.timeEnd("Run time");
