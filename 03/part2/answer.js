const fs = require("fs");

const input = fs.readFileSync("./input.txt").toString();
const lines = input.split(/\r?\n/);

function countOne(reports, charPosition) {
    let count = 0;
    for (let index = 0; index < reports.length; index++) {
        if (reports[index].charAt(charPosition) === "1") count++;
    }
    return count;
}

let remainedReports = lines.slice();
let charPosition = 0;
while (remainedReports.length > 1) {
    let filterChar = "0";
    if (countOne(remainedReports, charPosition) >= remainedReports.length / 2) {
        filterChar = "1";
    }
    remainedReports = remainedReports.filter((report) => report.charAt(charPosition) === filterChar);
    charPosition++;
}

const oxygen = parseInt(remainedReports[0], 2);
remainedReports = lines.slice();
charPosition = 0;
while (remainedReports.length > 1) {
    let filterChar = "0";
    if (countOne(remainedReports, charPosition) < remainedReports.length / 2) {
        filterChar = "1";
    }
    console.log(filterChar);
    remainedReports = remainedReports.filter((report) => report.charAt(charPosition) === filterChar);
    charPosition++;
}
const co2 = parseInt(remainedReports[0], 2);

console.log(`Answer: ${co2 * oxygen}`);
