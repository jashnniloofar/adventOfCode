import time
import functools

with open("./input.txt", "r") as f:
    parts = f.read().split("\n\n")
    rules = set(parts[0].split("\n"))
    updates = [list(map(int, update.split(",")))
               for update in parts[1].split("\n")]


def is_right_order(update: list[int]) -> bool:
    for i in range(len(update)):
        for j in range(i+1, len(update)):
            if f"{update[j]}|{update[i]}" in rules:
                return False
    return True


def part1():
    answer = 0
    for update in updates:
        if is_right_order(update):
            answer += update[len(update)//2]
    return answer


def sort_by_rule(a, b):
    if f"{a}|{b}" in rules:
        return -1
    if f"{b}|{a}" in rules:
        return 1
    return 0


def part2():
    answer = 0
    for update in updates:
        if not is_right_order(update):
            update.sort(key=functools.cmp_to_key(sort_by_rule))
            answer += update[len(update)//2]
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
