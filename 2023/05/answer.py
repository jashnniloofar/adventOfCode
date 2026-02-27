import time
import re


def translate(convert: list[int]):
    [des, src, range] = convert
    return [src, src+range, des-src]


def read_input():
    converts = []
    with open("./input.txt", "r") as f:
        sections = f.read().split("\n\n")
        seeds = list(map(int, re.findall(r'\d+', sections[0])))
        for i in range(1, len(sections)):
            nums = list(map(int, re.findall(r'\d+', sections[i])))
            converts.append([translate(nums[i:i+3])
                            for i in range(0, len(nums), 3)])
    return seeds, converts


def get_position(seed: int, converts: list[list[list[int]]]):
    current = seed
    for convert in converts:
        for [start, end, offset] in convert:
            if start <= current < end:
                current += offset
                break
    return current


def part1():
    seeds, converts = read_input()
    locations = [get_position(seed, converts) for seed in seeds]
    return min(locations)


def convert_range(range: list[list[int]], convert: list[list[int]]):
    result = []
    for [r_s, r_e] in range:
        for [c_s, c_e, c_o] in convert:
            over_start = max(c_s, r_s)
            over_end = min(c_e, r_e)
            if over_start < over_end:
                result.append([over_start + c_o, over_end + c_o])
    return result


def part2():
    seeds, converts = read_input()
    current = []
    for i in range(0, len(seeds), 2):
        current.append([seeds[i], seeds[i]+seeds[i+1]])
    for convert in converts:
        current = convert_range(current, convert)
    print(len(current))
    return min(current, key=lambda r: r[0])[0]


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
