import time


def read_input():
    antennas = dict()
    with open("./input.txt", "r") as f:
        row = 0
        for line in f:
            width = len(line.strip())
            for col in range(width):
                if line[col] != '.':
                    if line[col] not in antennas:
                        antennas[line[col]] = []
                    antennas[line[col]].append((col, row))
            row += 1
        height = row
    return antennas, height, width


def add_antinode(antinodes: set, x: int, y: int, w: int, h: int):
    if 0 <= x < w and 0 <= y < h:
        antinodes.add(f"{x},{y}")
        return True
    return False


def part1():
    antennas, h, w = read_input()
    antinodes = set()
    for positions in antennas.values():
        for i in range(len(positions)):
            x1, y1 = positions[i]
            for j in range(i+1, len(positions)):
                x2, y2, = positions[j]
                add_antinode(antinodes, 2 * x1 - x2, 2 * y1 - y2, w, h)
                add_antinode(antinodes, 2 * x2 - x1, 2 * y2 - y1, w, h)
    return len(antinodes)


def part2():
    antennas, h, w = read_input()
    antinodes = set()
    for positions in antennas.values():
        for i in range(len(positions)):
            x1, y1 = positions[i]
            for j in range(i+1, len(positions)):
                x2, y2, = positions[j]
                y_diff = y1 - y2
                x_diff = x1 - x2
                index = 0
                while add_antinode(antinodes, x1 + index * x_diff, y1 + index * y_diff, w, h):
                    index += 1
                index = -1
                while add_antinode(antinodes, x1 + index * x_diff, y1 + index * y_diff, w, h):
                    index -= 1
    return len(antinodes)


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
