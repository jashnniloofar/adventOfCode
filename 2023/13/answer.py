
import time


def read_input():
    with open("./input.txt", "r") as f:
        return [part.split("\n") for part in f.read().split("\n\n")]


def find_mirror(pattern: list[str], smudge_count=0) -> int:
    for i in range(1, len(pattern)):
        diff = 0
        for j in range(i):
            mirrored_row = 2*i-1 - j
            if mirrored_row < len(pattern):
                diff += sum(c1 != c2 for c1,
                            c2 in zip(pattern[j], pattern[mirrored_row]))
        if diff == smudge_count:
            return i
    return 0


def part1():
    patterns = read_input()
    answer = 0
    for pattern in patterns:
        answer += find_mirror(pattern) * 100
        answer += find_mirror(list(zip(*pattern)))
    return answer


def part2():
    patterns = read_input()
    answer = 0
    for pattern in patterns:
        answer += find_mirror(pattern, 1) * 100
        answer += find_mirror(list(zip(*pattern)), 1)
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
