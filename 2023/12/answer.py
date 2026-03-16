import time
from functools import cache


def read_input():
    springs = []
    damaged = []
    with open("./input.txt", "r") as f:
        for line in f:
            spring, nums = line.strip().split(" ")
            damaged.append(tuple(map(int, nums.split(","))))
            springs.append(spring)
    return springs, damaged


@cache
def arrangement_count(spring: str, damaged: tuple[int]) -> int:
    if len(spring) == 0:
        if len(damaged) == 0:
            return 1
        return 0
    if len(damaged) == 0:
        if "#" in spring:
            return 0
        return 1
    if len(spring) < sum(damaged) + len(damaged) - 1:
        return 0

    count = 0
    if spring[0] == "." or spring[0] == "?":
        count += arrangement_count(spring[1:], damaged)

    if (spring[0] == "#" or spring[0] == "?") and "." not in spring[:damaged[0]] and (len(spring) == damaged[0] or spring[damaged[0]] == "." or spring[damaged[0]] == "?"):
        count += arrangement_count(spring[damaged[0]+1:], damaged[1:])

    return count


def part1():
    springs, damaged = read_input()
    answer = 0
    for i in range(len(springs)):
        answer += arrangement_count(springs[i], damaged[i])
    return answer


def part2():
    springs, damaged = read_input()
    fold_count = 5
    answer = 0
    for i in range(len(springs)):
        spring = "?".join([springs[i]] * fold_count)
        answer += arrangement_count(spring, damaged[i] * 5)
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
