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

function totalInside(bagName) {
    let sum = 0;
    const queue = [[1, bagName]];
    while (queue.length) {
        const [count, bagName] = queue.shift();

        for (const childName in bags[bagName].children) {
            sum += count * bags[bagName].children[childName];
            queue.push([count * bags[bagName].children[childName], childName]);
        }
    }
    return sum;
}

console.log(`Answer: ${totalInside("shiny gold")}`);
console.timeEnd("Run time");
