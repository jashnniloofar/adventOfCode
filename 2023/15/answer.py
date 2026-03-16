
from collections import defaultdict
import time


def read_input():
    with open("./input.txt", "r") as f:
        return f.read().split(",")


def hash_code(code: str) -> int:
    result = 0
    for c in code:
        result = (result + ord(c)) * 17 % 256
    return result


def part1():
    codes = read_input()
    answer = 0
    for code in codes:
        answer += hash_code(code)
    return answer


def part2():
    codes = read_input()
    boxes = defaultdict(list)
    values = defaultdict(int)
    for code in codes:
        if "-" in code:
            label = code[:-1]
            hash = hash_code(label)
            if label in boxes[hash]:
                boxes[hash].remove(label)
        else:
            label, value = code.split("=")
            hash = hash_code(label)
            if label not in boxes[hash]:
                boxes[hash].append(label)
            values[label] = int(value)
    answer = 0
    for id, labels in boxes.items():
        for index, label in enumerate(labels):
            answer += (id + 1) * (index + 1) * values[label]
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
