
from collections import deque
import time


def read_input():
    with open("./input.txt", "r") as f:
        return [line.strip() for line in f]


def find_junctions(input_map: list[str]) -> list[tuple[int, int]]:
    width = len(input_map[0])
    height = len(input_map)
    junctions = [(0, 1), (height-1, width-2)]

    for row in range(height):
        for col in range(width):
            if input_map[row][col] == "#":
                continue
            neighbors = 0
            for dr, dc in [(0, 1), (0, -1), (1, 0), (-1, 0)]:
                new_row = row + dr
                new_col = col + dc
                if new_row < 0 or new_row >= height or new_col < 0 or new_col >= width:
                    continue
                if input_map[new_row][new_col] != "#":
                    neighbors += 1
            if neighbors > 2:
                junctions.append((row, col))
    return junctions


def find_junctions_path(input_map: list[str], climbing=False) -> list[tuple[int, int]]:
    junctions = find_junctions(input_map)
    junction_path = {}
    for j_row, j_col in junctions:
        junction_path[(j_row, j_col)] = {}
        queue = [(j_row, j_col, 0)]
        seen = set()

        while len(queue) > 0:
            current_row, current_col, distance = queue.pop(0)
            if (current_row, current_col) in seen:
                continue
            seen.add((current_row, current_col))
            if (current_row, current_col) in junctions and (current_row, current_col) != (j_row, j_col):
                junction_path[(j_row, j_col)][(current_row, current_col)] = distance
                continue
            next_moves = [(0, 1), (0, -1), (1, 0), (-1, 0)]
            if not climbing:
                if input_map[current_row][current_col] == ">":
                    next_moves = [(0, 1)]
                elif input_map[current_row][current_col] == "<":
                    next_moves = [(0, -1)]
                elif input_map[current_row][current_col] == "v":
                    next_moves = [(1, 0)]
                elif input_map[current_row][current_col] == "^":
                    next_moves = [(-1, 0)]

            for dr, dc in next_moves:
                new_row = current_row + dr
                new_col = current_col + dc
                if new_row < 0 or new_row >= len(input_map) or new_col < 0 or new_col >= len(input_map[0]):
                    continue
                if input_map[new_row][new_col] != "#":
                    queue.append((new_row, new_col, distance + 1))
    return junction_path


def maximum_path(input_map: list[str], climbing=False) -> int:
    junction_path = find_junctions_path(input_map, climbing)
    start = (0, 1)
    end = (len(input_map)-1, len(input_map[0])-2)
    all_paths = []
    queue = deque([(start, [start])])

    # print(len(junction_path))

    # for junction, paths in junction_path.items():
    #     if len(paths) == 2:
    #         (j1, d1), (j2, d2) = list(paths.items())
    #         print(f"junction: {junction}, j1: {j1}, d1: {d1}, j2: {j2}, d2: {d2}")
    #         junction_path[j1][j2] = d1 + d2
    #         junction_path[j2][j1] = d1 + d2
    #         junction_path[junction] = {}

    # print(junction_path)

    # for k in list(junction_path.keys()):
    #     if len(junction_path[k]) == 2:
    #         del junction_path[k]

    while len(queue) > 0:
        current, path = queue.pop()
        if current == end:
            all_paths.append(path)
            continue
        for next_junction in junction_path[current]:
            if next_junction in path:
                continue
            queue.append((next_junction, path + [next_junction]))
            
    maximum_distance = 0
    # print(all_paths)
    for path in all_paths:
        # print(path)
        distance = 0
        for i in range(0, len(path)-1):
            distance += junction_path[path[i]][path[i+1]]
        maximum_distance = max(maximum_distance, distance)
    return maximum_distance


def part1():
    input_map = read_input()
    return maximum_path(input_map)


def part2():
    input_map = read_input()
    return maximum_path(input_map, climbing=True)


start = time.time()
answer = part1()
end = time.time()
print(f"Part1: answer is {answer} and running time is: {end - start:.4f} seconds")

start = time.time()
answer = part2()
end = time.time()
print(f"Part2: answer is {answer} and running time is: {end - start:.4f} seconds")
