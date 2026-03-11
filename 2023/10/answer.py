from enum import IntEnum
import time


class Direction(IntEnum):
    SOUTH = 0
    EAST = 1
    NORTH = 2
    WEST = 3


bends = {
    "L": {
        Direction.SOUTH: Direction.EAST,
        Direction.WEST: Direction.NORTH,
    },
    "J": {
        Direction.SOUTH: Direction.WEST,
        Direction.EAST: Direction.NORTH,
    },
    "7":
    {
        Direction.NORTH: Direction.WEST,
        Direction.EAST: Direction.SOUTH,
    },
    "F": {
        Direction.NORTH: Direction.EAST,
        Direction.WEST: Direction.SOUTH,
    },
    "|": {
        Direction.SOUTH: Direction.SOUTH,
        Direction.NORTH: Direction.NORTH,
    },
    "-": {
        Direction.EAST: Direction.EAST,
        Direction.WEST: Direction.WEST,
    }
}

movements = {
    Direction.SOUTH: [1, 0],
    Direction.EAST: [0, 1],
    Direction.NORTH: [-1, 0],
    Direction.WEST: [0, -1]
}


def read_input():
    input_map = []
    with open("./input.txt", "r") as f:
        row = 0
        for line in f:
            input_map.append(list(line.strip()))
            if line.find('S') >= 0:
                start = [row, line.find('S')]
            row += 1
    return input_map, start


def get_path(input_map, start):
    neighbors = []
    for direction in movements.keys():
        current_position = [start[0] + movements[direction][0],
                            start[1] + movements[direction][1]]
        if direction in bends.get(input_map[current_position[0]][current_position[1]], {}):
            neighbors.append((current_position, direction))
    for bend in bends.keys():
        if all(d in bends[bend] for (_, d) in neighbors):
            input_map[start[0]][start[1]] = bend
            break
    current_position, direction = neighbors[0]
    path = set()
    path.add(tuple(start))
    while current_position != start:
        path.add(tuple(current_position))
        direction = bends.get(input_map[current_position[0]][current_position[1]], {}).get(
            direction, direction)
        current_position = [current_position[0] + movements[direction][0],
                            current_position[1] + movements[direction][1]]
    return path


def part1():
    input_map, start = read_input()
    path = get_path(input_map, start)
    return len(path) // 2


def part2():
    input_map, start = read_input()
    path = get_path(input_map, start)
    for row in range(len(input_map)):
        for col in range(len(input_map[row])):
            if (row, col) not in path:
                input_map[row][col] = "."

    answer = 0
    for row in input_map:
        inside = False
        line_start = ""
        for ch in row:
            match ch:
                case ".":
                    if inside:
                        answer += 1
                case "|":
                    inside = not inside
                case "F":
                    line_start = "F"
                case "L":
                    line_start = "L"
                case "J":
                    if line_start == "F":
                        inside = not inside
                    line_start = ""
                case "7":
                    if line_start == "L":
                        inside = not inside
                    line_start = ""

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
