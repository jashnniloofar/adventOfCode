import time
import re


def read_input():
    with open("./input.txt", "r") as f:
        parts = f.read().split('\n\n')
        towels = parts[0].split(", ")
        return towels, parts[1].split("\n")


def is_possible(design: str, towels: list[str], possible_designs: set, impossible_designs: set):
    for towel in towels:
        if design.startswith(towel):
            remain = design[len(towel):]
            if remain in impossible_designs:
                continue
            if remain in possible_designs or is_possible(remain, towels, possible_designs, impossible_designs):
                possible_designs.add(design)
                return True
    impossible_designs.add(design)
    return False


def arrange_count(design: str, towels: list[str], arrange_counts: dict, impossible_designs: set):
    if design in arrange_counts:
        return arrange_counts[design]
    count = 0
    for towel in towels:
        if design.startswith(towel):
            remain = design[len(towel):]
            if remain in impossible_designs:
                continue
            count += arrange_counts.get(remain, arrange_count(
                remain, towels, arrange_counts, impossible_designs))
    if count > 0:
        arrange_counts[design] = count
    else:
        impossible_designs.add(design)
    return count


def part1():
    towels, designs = read_input()
    possible_designs = set(towels)
    answer = 0
    for design in designs:
        answer += is_possible(design, towels, possible_designs, set())
    return answer


def part2():
    towels, designs = read_input()
    arrange_counts = dict()
    towels.sort(key=lambda t: len(t))
    for i in range(len(towels)):
        towel = towels[i]
        arrange_counts[towel] = 1 + \
            arrange_count(towel, towels[:i], arrange_counts, set())
    answer = 0
    for design in designs:
        answer += arrange_count(design, towels, arrange_counts, set())
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
