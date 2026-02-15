import time


def read_input():
    equations = []
    with open("./input.txt", "r") as f:
        for line in f:
            parts = line.split(":")
            target = int(parts[0])
            operands = list(map(int, parts[1].split()))
            equations.append(dict(target=target, operands=operands))
    return equations


def is_possible(prev_result, equation, op_index, operator):
    operands = equation["operands"]
    target = equation["target"]

    if operator == "+":
        result = prev_result + operands[op_index]
    else:
        result = prev_result * operands[op_index]
    if (result > target):
        return False
    if op_index == (len(operands) - 1):
        return result == target
    return is_possible(result, equation, op_index+1, "+") or is_possible(result, equation, op_index+1, "*")


def is_possible_with_concat(prev_result, equation, op_index, operator):
    operands = equation["operands"]
    target = equation["target"]

    if operator == "+":
        result = prev_result + operands[op_index]
    elif operator == "*":
        result = prev_result * operands[op_index]
    else:
        result = int(f"{prev_result}{operands[op_index]}")
    if result > target:
        return False
    if op_index == (len(operands) - 1):
        return result == target
    return is_possible_with_concat(result, equation, op_index+1, "+") or \
        is_possible_with_concat(result, equation, op_index+1, "*") or \
        is_possible_with_concat(result, equation, op_index+1, "||")


def part1():
    equations = read_input()
    answer = 0
    for eq in equations:
        if is_possible(0, eq, 0, "+"):
            answer += eq["target"]
    return answer


def part2():
    equations = read_input()
    answer = 0
    for eq in equations:
        if is_possible_with_concat(0, eq, 0, "+"):
            answer += eq["target"]
    return answer


start = time.time()
answer = part1()
end = time.time()
print(
    f"Part1: answer is {answer} and running time is: {end - start:.4f} seconds")

start = time.time()
answer = part2()
end = time.time()
print(
    f"Part2: answer is {answer} and running time is: {end - start:.4f} seconds")
