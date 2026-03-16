
import time


def read_input():
    with open("./input.txt", "r") as f:
        return f.readlines()


directions = {"R": (0, 1), "D": (1, 0), "L": (0, -1), "U": (-1, 0)}


def boundary(points: list[tuple[int, int]]) -> int:
    total = 0
    for i in range(len(points)):
        total += abs(points[i][0] - points[i - 1][0]) + \
            abs(points[i][1] - points[i - 1][1])
    return total


def calc_area(points: list[tuple[int, int]]) -> int:
    # https://en.wikipedia.org/wiki/Shoelace_formula
    area = 0
    for i in range(len(points)):
        area += (points[i][0] + points[i - 1][0]) * \
            (points[i][1] - points[i - 1][1])
    return abs(area) // 2


def part1():
    plan = read_input()
    points = []
    current = (0, 0)
    for line in plan:
        dir, step, _ = line.split()
        step = int(step)
        next = (current[0] + directions[dir][0] * step,
                current[1] + directions[dir][1] * step)
        points.append((next))
        current = next

    # https://en.wikipedia.org/wiki/Pick%27s_theorem
    # area = internal + boundary // 2 - 1
    # internal + boundary = area + boundary // 2 + 1
    return calc_area(points) + boundary(points) // 2 + 1


def part2():
    plan = read_input()
    points = []
    current = (0, 0)
    for line in plan:
        _, _, hex_ins = line.split()
        hex_ins = hex_ins[2:-1]
        step = int(hex_ins[:5], 16)
        dir = "RDLU"[int(hex_ins[5])]
        next = (current[0] + directions[dir][0] * step,
                current[1] + directions[dir][1] * step)
        points.append((next))
        current = next

    return calc_area(points) + boundary(points) // 2 + 1


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
