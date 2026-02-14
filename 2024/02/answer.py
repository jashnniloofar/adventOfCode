import time


def read_input():
    with open("./input.txt", "r") as f:
        reports = [list(map(int, line.split())) for line in f]
    return reports


def is_safe(report: list[int]):
    if len(report) == 1:
        return True
    direction = 1 if report[1] - report[0] > 0 else -1
    index = 0
    while index < len(report)-1:
        diff = report[index+1] - report[index]
        if diff * direction > 3 or diff * direction <= 0:
            return False
        index += 1
    return True


def part1():
    reports = read_input()
    return sum(is_safe(report) for report in reports)


def part2():
    reports = read_input()
    answer = 0
    for report in reports:
        for index in range(len(report)):
            if is_safe(report[:index] + report[index+1:]):
                answer+=1
                break
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
