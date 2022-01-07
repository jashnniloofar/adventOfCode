const fs = require("fs");
let start = Date.now();
const input = fs.readFileSync("./input.txt").toString();
const nodes = {};
input.split(/\r?\n/).forEach((line) => {
    const [node, weight, ...children] = line.match(/([0-9a-z]+)/g);
    nodes[node] = { ...nodes[node], weight: parseInt(weight), children };
    for (const child of children) {
        if (nodes[child] === undefined) nodes[child] = {};
        nodes[child].parent = node;
    }
});

function root(object) {
    for (const [node, obj] of Object.entries(object)) {
        if (obj.parent === undefined) return nodes[node];
    }
}

function setchildren(node) {
    let newChildren = [];

    if (node.children) {
        for (child of node.children) {
            nodes[child].name = child;
            newChildren.push(nodes[child]);
            setchildren(nodes[child]);
        }
    }

    node.children = newChildren;
}

function actualWeight(node) {
    let sum = 0;
    for (const child of node.children) {
        sum += actualWeight(child);
    }
    node.actual = sum + node.weight;
    return node.actual;
}

function unBanalceChild(node) {
    for (let i = 0; i < node.children.length; i++) {
        const child = node.children.shift();
        if ((node.actual - child.actual - node.weight) / node.children.length === node.children[0].actual) {
            if (child.actual === node.children[0].actual) return null;
            node.children.push(child);
            child.tobe = node.children[0].actual;
            return child;
        }
        node.children.push(child);
    }
}

const rootNode = root(nodes);
setchildren(rootNode);
actualWeight(rootNode);
let unbalanced = rootNode;
while (unBanalceChild(unbalanced) !== null) {
    unbalanced = unBanalceChild(unbalanced);
}

console.log(`Answer: ${unbalanced.weight + unbalanced.tobe - unbalanced.actual}`);
console.log(`Run time: ${Date.now() - start} ms`);
