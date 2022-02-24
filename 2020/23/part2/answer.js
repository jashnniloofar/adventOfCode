console.time("Run time");
const fs = require("fs");
const input = fs.readFileSync("./input.txt").toString();

function range(start, end) {
    return Array(end - start + 1)
        .fill()
        .map((_, idx) => start + idx);
}

function simulate(labels, moves = 100, cupCount = 9) {
    //next will store the next cup, it will also be filled such that next[i] = i+1;
    let next = range(1, cupCount + 1);
    //cups[] stores each cup value
    let cups = labels.split("").map((i) => i * 1);
    next[0] = next[next.length - 1] = cups[0];
    for (let x = 0; x < cups.length - 1; x++) {
        //here the cup value is used as the index, it points to the cup next to the current cup
        next[cups[x]] = cups[x + 1];
    }
    //since our next array is filled with 1->cupCount the last value we care to set is the last
    //cups next value, which will be 1+the max of cups
    next[cups[cups.length - 1]] = Math.max(...cups) + 1;
    let cur = 0;

    for (let c = 0; c <= moves; c++) {
        //this is defined above as the first cup, next[0] = cups[0]
        cur = next[cur];
        let ins = cur !== 1 ? cur - 1 : cupCount;
        const p1 = next[cur];
        const p2 = next[p1];
        const p3 = next[p2];

        while (ins === p1 || ins === p2 || ins === p3) {
            ins -= 1;
        }
        if (ins < 1) {
            ins += cupCount;
        }

        [next[p3], next[ins], next[cur]] = [next[ins], next[cur], next[p3]];
    }
    return next[1] * next[next[1]];
}

console.log(`Answer: ${simulate(input, 10000000, 1000000)}`);
console.timeEnd("Run time");
