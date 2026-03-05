import time
import math


def read_input():
    with open("./input.txt", "r") as f:
        return [list(map(int, line.split(" "))) for line in f]


def get_next(seq: list[int]):
    if all(element == 0 for element in seq):
        return 0
    diff = []
    for i in range(1, len(seq)):
        diff.append(seq[i]-seq[i-1])
    return seq[-1] + get_next(diff)


def part1():
    sequences = read_input()
    answer = 0
    for seq in sequences:
        answer += get_next(seq)
    return answer


def part2():
    sequences = read_input()
    answer = 0
    for seq in sequences:
        seq.reverse()
        answer += get_next(seq)
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
