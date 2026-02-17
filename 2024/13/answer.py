import time
import re


def read_input():
    machines = []
    with open("./input.txt", "r") as f:
        for machine in f.read().split("\n\n"):
            machines.append(list(map(int, re.findall(r'\d+', machine))))
    return machines


def part1():
    machines = read_input()
    answer = 0
    for machine in machines:
        [x1, y1, x2, y2, x_p, y_p] = machine
        d = x1 * y2 - x2 * y1
        d_x = x_p * y2 - y_p * x2
        d_y = y_p * x1 - x_p * y1

        a = d_x / d
        b = d_y / d
        if int(a) == a and int(b) == b:
            answer += 3 * a + b

    return int(answer)


def part2():
    machines = read_input()
    answer = 0
    for machine in machines:
        [x1, y1, x2, y2, x_p, y_p] = machine
        x_p = x_p + 10000000000000
        y_p = y_p + 10000000000000

        d = x1 * y2 - x2 * y1
        d_x = x_p * y2 - y_p * x2
        d_y = y_p * x1 - x_p * y1

        a = d_x / d
        b = d_y / d
        if int(a) == a and int(b) == b:
            answer += 3 * a + b

    return int(answer)


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
