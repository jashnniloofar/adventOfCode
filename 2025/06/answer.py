import time
with open("./input.txt", "r") as f:
    lines = [line for line in f]


def part1(lines: list[str]):
    problems = [l.split() for l in lines]
    sum_result = 0
    for i in range(len(problems[0])):
        result = 0
        operator = problems[-1][i]
        if operator == "*":
            result = 1
        for j in range(len(problems)-1):
            if operator == "+":
                result += int(problems[j][i])
            else:
                result *= int(problems[j][i])
        sum_result += result
    return sum_result


def part2(lines: list[str]):
    sum_result = 0
    operands = []
    for col in range(len(lines[0])-2, -1, -1):
        operand = ""
        for row in range(len(lines)-1):
            operand += lines[row][col]
        if operand.strip():
            operands.append(int(operand))
        if col < len(lines[-1]) and lines[-1][col] != " ":
            if lines[-1][col] == "*":
                result = 1
                for operand in operands:
                    result *= operand
            else:
                result = 0
                for operand in operands:
                    result += operand
            sum_result += result
            operands = []

    return sum_result


start = time.time()
answer = part1(lines)
end = time.time()
print(
    f"Part1: answer is {answer} and running time is: {end - start:.4f} seconds")

start = time.time()
answer = part2(lines)
end = time.time()
print(
    f"Part2: answer is {answer} and running time is: {end - start:.4f} seconds")
