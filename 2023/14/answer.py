
import time


def read_input():
    with open("./input.txt", "r") as f:
        return [list(line.strip()) for line in f]


def move_north(platform: list[list[str]], row: int, col: int):
    if platform[row][col] != "O":
        return 0
    move = 0
    for i in range(row-1, -1, -1):
        if platform[i][col] != ".":
            break
        move += 1
    platform[row][col] = "."
    platform[row-move][col] = "O"


def tilt_north(platform: list[list[str]]):
    for row in range(len(platform)):
        for col in range(len(platform[0])):
            move_north(platform, row, col)


def calc_load(platform: list[list[str]]) -> int:
    answer = 0
    for row in range(len(platform)):
        for col in range(len(platform[0])):
            if platform[row][col] == "O":
                answer += len(platform) - row
    return answer


def rotate_counterclockwise(platform: list[list[str]]) -> list[list[str]]:
    return [list(col) for col in zip(*reversed(platform))]


def print_platform(platform: list[list[str]]):
    for row in platform:
        print("".join(row))
    print("")


def tilt_cycle(platform: list[list[str]]):
    for _ in range(4):
        tilt_north(platform)
        platform = rotate_counterclockwise(platform)
    return platform


def convert_to_tuple(platform: list[list[str]]) -> tuple[str]:
    return tuple("".join(row) for row in platform)


def tilt_cycles(platform: list[list[str]], count: int):
    states = [convert_to_tuple(platform)]
    index = 0
    while index < count:
        platform = tilt_cycle(platform)
        index += 1
        platform_tuple = convert_to_tuple(platform)
        if platform_tuple in states:
            break
        else:
            states.append(platform_tuple)
    first_seen = states.index(platform_tuple)
    cycle = index - first_seen
    return states[(count - first_seen) % cycle + first_seen]


def part1():
    platform = read_input()
    tilt_north(platform)
    return calc_load(platform)


def part2():
    platform = read_input()
    platform = tilt_cycles(platform, 1000000000)
    return calc_load(platform)


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
