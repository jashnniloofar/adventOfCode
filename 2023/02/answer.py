import time
import re


def read_input():
    with open("./input.txt", "r") as f:
        return [line.strip().split(": ")[1] for line in f]


cube_count = {
    "red": 12,
    "green": 13,
    "blue": 14
}


def part1():
    games = read_input()
    answer = 0
    id = 1
    for game in games:
        is_valid = True
        for cube, count in cube_count.items():
            counts = list(map(int, re.findall(f"(\\d+) {cube}", game)))
            if max(counts) > count:
                is_valid = False
        if is_valid:
            answer += id
        id += 1

    return answer


def part2():
    games = read_input()
    answer = 0
    for game in games:
        power = 1
        for cube in cube_count:
            counts = list(map(int, re.findall(f"(\\d+) {cube}", game)))
            power *= max(counts)
        answer += power

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
