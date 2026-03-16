import time
from enum import IntEnum
from collections import defaultdict


def read_input():
    with open("./input.txt", "r") as f:
        return [line.strip() for line in f]


class Direction(IntEnum):
    DOWN = 0
    RIGHT = 1
    UP = 2
    LEFT = 3


moves = [[1, 0], [0, 1], [-1, 0], [0, -1]]


def get_energized_grid(grid: list[str], start: tuple):
    queue = [start]
    visited = defaultdict(list)
    while len(queue) > 0:
        row, col, direction = queue.pop()
        if row < 0 or row >= len(grid) or col < 0 or col >= len(grid):
            continue
        if direction in visited[(row, col)]:
            continue
        visited[(row, col)].append(direction)
        new_direction = [direction]
        match grid[row][col]:
            case "-":
                if direction in [Direction.DOWN, Direction.UP]:
                    new_direction = [Direction.RIGHT, Direction.LEFT]
            case "|":
                if direction in [Direction.RIGHT, Direction.LEFT]:
                    new_direction = [Direction.DOWN, Direction.UP]
            case "/":
                if direction == Direction.RIGHT:
                    new_direction = [Direction.UP]
                elif direction == Direction.LEFT:
                    new_direction = [Direction.DOWN]
                elif direction == Direction.UP:
                    new_direction = [Direction.RIGHT]
                else:
                    new_direction = [Direction.LEFT]
            case "\\":
                if direction == Direction.RIGHT:
                    new_direction = [Direction.DOWN]
                elif direction == Direction.LEFT:
                    new_direction = [Direction.UP]
                elif direction == Direction.UP:
                    new_direction = [Direction.LEFT]
                else:
                    new_direction = [Direction.RIGHT]
        for d in new_direction: 
            queue.append((row + moves[d][0], col + moves[d][1], d))
    return len(visited)


def part1():
    grid = read_input()
    return get_energized_grid(grid, (0, 0, Direction.RIGHT))


def part2():
    grid = read_input()
    energized_count = []
    for i in range(len(grid)):
        energized_count.append(get_energized_grid(
            grid, (0, i, Direction.DOWN)))
        energized_count.append(get_energized_grid(
            grid, (len(grid)-1, i, Direction.UP)))
        energized_count.append(get_energized_grid(
            grid, (i, 0, Direction.RIGHT)))
        energized_count.append(get_energized_grid(
            grid, (i, len(grid)-1, Direction.RIGHT)))
    return max(energized_count)


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
