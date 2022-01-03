let start = Date.now();

function isSafe(code) {
    if (code === "") return true;
    if (!/G/.test(code) || !/M/.test(code)) return true;
    return !/M/.test(code.replace(/(.)G\1M/g, "$1G"));
}

function sort(arr) {
    return arr.sort((a, b) => (a[0] > b[0] || (a[0] === b[0] && a[1] > b[1]) ? 1 : -1));
}

function solve(startState, endState) {
    let steps = -1;
    const nodes = [[startState, 0]];
    const visited = new Map();
    visited.set(startState, 1);

    while (steps === -1 && nodes.length > 0) {
        const [code, step] = nodes.shift();
        const [elevator, ...floors] = code.split(",");
        const id = parseInt(elevator);
        const current = floors[id].match(/[A-Z]{2}/g);
        if (id < 2) {
            const up = floors[id + 1] === "" ? [] : floors[id + 1].match(/[A-Z]{2}/g);
            const permutes = permute(current.length);
            for (const p of permutes) {
                const nextCurrent = current
                    .slice(0, p[0])
                    .concat(current.slice(p[0] + 1, p[1]))
                    .concat(current.slice(p[1] + 1, current.length))
                    .join("");
                const nextUp = p[0] === p[1] ? sort(up.concat([current[p[0]]])).join("") : sort(up.concat([current[p[0]], current[p[1]]])).join("");
                const code = `${id + 1},${floors
                    .slice(0, id)
                    .concat([nextCurrent, nextUp])
                    .concat(floors.slice(id + 2, floors.length))
                    .join(",")}`;
                if (code.startsWith(endState)) steps = step + 1;
                if (isSafe(nextCurrent) && isSafe(nextUp) && !visited.has(code)) {
                    visited.set(code, 1);
                    nodes.push([code, step + 1]);
                }
            }
        }
        if (id > 0) {
            const down = floors[id - 1] === "" ? [] : floors[id - 1].match(/[A-Z]{2}/g);
            const permutes = permute(current.length);
            for (const p of permutes) {
                const nextCurrent = current
                    .slice(0, p[0])
                    .concat(current.slice(p[0] + 1, p[1]))
                    .concat(current.slice(p[1] + 1, current.length))
                    .join("");
                const nextDown =
                    p[0] === p[1] ? sort(down.concat([current[p[0]]])).join("") : sort(down.concat([current[p[0]], current[p[1]]])).join("");
                const code = `${id - 1},${floors
                    .slice(0, id - 1)
                    .concat([nextDown, nextCurrent])
                    .concat(floors.slice(id + 1, floors.length))
                    .join(",")}`;
                if (code.startsWith(endState)) steps = step + 1;
                if (isSafe(nextCurrent) && isSafe(nextDown) && !visited.has(code)) {
                    visited.set(code, 1);
                    nodes.push([code, step + 1]);
                }
            }
        }
    }
    return steps;
}

function permute(count) {
    let out = [];
    for (let i = 0; i < count; i++) {
        for (let j = i; j < count; j++) {
            out.push([i, j]);
        }
    }
    return out;
}

console.log(
    `Answer: ${solve("0,PGPM,CGLGRGUG,CMLMRMUM", "1,,CGLGPGPMRGUG,CMLMRMUM") + solve("0,CGLGPGPMRGUG,CMLMRMUM,", "2,,,CGCMLGLMPGPMRGRMUGUM")}`
);
console.log(`Run time: ${Date.now() - start} ms`);
