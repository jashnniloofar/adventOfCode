import time
import re


def read_input():
    with open("./input.txt", "r") as f:
        return [line.strip() for line in f]


def part1():
    texts = read_input()
    answer = 0
    for text in texts:
        nums = re.findall(r'\d', text)
        answer += int(f"{nums[0]}{nums[-1]}")
    return answer


convert_num = {
    "one": "one1one",
    "two": "two2two",
    "three": "three3three",
    "four": "four4four",
    "five": "five5five",
    "six": "six6six",
    "seven": "seven7seven",
    "eight": "eight8eight",
    "nine": "nine9nine",
}


def part2():
    texts = read_input()
    answer = 0
    for text in texts:
        for key in convert_num:
            text = text.replace(key, convert_num[key])
        nums = re.findall(r'\d', text)
        answer += int(f"{nums[0]}{nums[-1]}")
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
