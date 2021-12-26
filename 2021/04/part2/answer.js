const fs = require("fs");

function readBingo() {
    const input = fs.readFileSync("./input.txt").toString();
    const lines = input.split(/\r?\n/);
    const orders = lines[0].split(",");
    const borads = [];
    for (let index = 1; index < lines.length; index++) {
        const boradNumber = Math.floor((index - 1) / 6);
        const lineNumber = ((index - 1) % 6) - 1;
        if (lineNumber < 0) {
            borads[boradNumber] = [];
        } else {
            borads[boradNumber][lineNumber] = lines[index]
                .trim()
                .split(" ")
                .filter((key) => key !== "");
        }
    }
    return { borads, orders };
}
function calcPoint(marks, boards, boradNumber) {
    let point = 0;
    for (let row = 0; row < 5; row++) {
        for (let column = 0; column < 5; column++) {
            if (marks[boradNumber][row][column] === 0) {
                point += parseInt(boards[boradNumber][row][column]);
            }
        }
    }
    return point;
}

function checkWin(marks) {
    for (let boradNumber = 0; boradNumber < marks.length; boradNumber++) {
        for (let row = 0; row < 5; row++) {
            let win = true;
            for (let column = 0; column < 5; column++) {
                if (marks[boradNumber][row][column] === 0) win = false;
            }
            if (win) {
                return { point: calcPoint(marks, borads, boradNumber), boradNumber };
            }
        }
        for (let column = 0; column < 5; column++) {
            let win = true;
            for (let row = 0; row < 5; row++) {
                if (marks[boradNumber][row][column] === 0) win = false;
            }
            if (win) {
                return { point: calcPoint(marks, borads, boradNumber), boradNumber };
            }
        }
    }
    return { point: 0, boradNumber: -1 };
}

function game(marks, borads, orders) {
    for (let index = 0; index < orders.length; index++) {
        for (let boradNumber = 0; boradNumber < marks.length; boradNumber++) {
            for (let row = 0; row < 5; row++) {
                for (let column = 0; column < 5; column++) {
                    if (borads[boradNumber][row][column] === orders[index]) marks[boradNumber][row][column] = 1;
                }
            }
        }
        let { point, boradNumber } = checkWin(marks);
        while (point > 0) {
            if (borads.length === 1) return { point, order: parseInt(orders[index]) };
            marks.splice(boradNumber, 1);
            borads.splice(boradNumber, 1);
            const win = checkWin(marks);
            point = win.point;
            boradNumber = win.boradNumber;
        }
    }
}

const { borads, orders } = readBingo();

const marks = [];
for (let i = 0; i < borads.length; i++) {
    marks[i] = [];
    for (let j = 0; j < 5; j++) {
        marks[i][j] = [0, 0, 0, 0, 0];
    }
}
const { point, order } = game(marks, borads, orders);

console.log(`Answer: ${point * order}`);
