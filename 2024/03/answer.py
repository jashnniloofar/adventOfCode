import time
import re


def read_input():
    with open("./input.txt", "r") as f:
        return f.read()


def mul(input: str):
    groups = re.findall(r'mul\(\d{1,3},\d{1,3}\)', input)
    answer = 0
    for group in groups:
        a, b = list(map(int, group[4:-1].split(",")))
        answer += a * b
    return answer


def part1():
    memory = read_input()
    return mul(memory)


def part2():
    memory = read_input()
    start = 0
    answer = 0
    is_do = True
    for match in re.finditer(r'do(n\'t){0,1}\(\)', memory):
        if is_do:
            answer += mul(memory[start:match.start()])
        is_do = True if match.end() - match.start() == 4 else False
        start = match.end()
    if is_do:
        answer += mul(memory[start:])
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
