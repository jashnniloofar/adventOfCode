import time
import re


def read_input():
    with open("./input.txt", "r") as f:
        lines = f.readlines()
        times = re.findall(r'\d+', lines[0])
        distances = re.findall(r'\d+', lines[1])
    return times, distances


def record_ways(time: int, distance: int):
    start = 0
    end = time // 2
    while (end - start) > 1:
        mid = (start + end) // 2
        if mid * (time - mid) > distance:
            end = mid
        else:
            start = mid

    return time - 2 * end + 1


def part1():
    times, distances = read_input()
    times = list(map(int, times))
    distances = list(map(int, distances))
    answer = 1
    for t, time in enumerate(times):
        answer *= record_ways(time, distances[t])
    return answer


def part2():
    times, distances = read_input()
    time = int("".join(times))
    distance = int("".join(distances))
    return record_ways(time, distance)


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
