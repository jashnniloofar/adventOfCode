console.time("Run time");
const fs = require("fs");
const input = fs.readFileSync("./input.txt").toString();
const expressions = input.split(/\r?\n/);

const precedence = { "*": 1, "+": 1 };

function infixToPostfix(expression) {
    const stack = []; //For stack operations, we are using C++ built in stack
    let result = "";

    for (let i = 0; i < expression.length; i++) {
        let c = expression[i];
        if (c >= "0" && c <= "9") result += c;
        else if (c == "(") stack.push("(");
        else if (c == ")") {
            while (stack[stack.length - 1] != "(") {
                result += stack[stack.length - 1];
                stack.pop();
            }
            stack.pop();
        } else {
            while (stack.length != 0 && precedence[expression[i]] <= precedence[stack[stack.length - 1]]) {
                result += stack[stack.length - 1];
                stack.pop();
            }
            stack.push(c);
        }
    }
    while (stack.length != 0) {
        result += stack[stack.length - 1];
        stack.pop();
    }
    return result;
}

function evaluate(expression) {
    expression = infixToPostfix(expression.replace(/ /g, ""));
    const stack = [];
    for (let i = 0; i < expression.length; i++) {
        let c = expression[i];
        if (c >= "0" && c <= "9") stack.push(+c);
        else {
            let operand1 = stack.pop();
            let operand2 = stack.pop();
            if (c === "+") stack.push(operand1 + operand2);
            if (c === "*") stack.push(operand1 * operand2);
        }
    }
    return stack.pop();
}

const result = expressions.reduce((sum, exp) => (sum += evaluate(exp)), 0);

console.log(`Answer: ${result}`);
console.timeEnd("Run time");
