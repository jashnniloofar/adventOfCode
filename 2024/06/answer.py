import time


def read_input():
    with open("./input.txt", "r") as f:
        input_map = []
        row = 0
        start_row = 0
        start_col = 0
        for line in f:
            input_map.append(list(line.strip()))
            if line.find("^") > 0:
                start_row = row
                start_col = line.find("^")
            row += 1
    return input_map, start_row, start_col


directions = [[-1, 0], [0, 1], [1, 0], [0, -1]]


def in_map(input: list[list[int]], row: int, col: int):
    return 0 <= col < len(input[0]) and 0 <= row < len(input)


def next_step(input: list[list[int]], row: int, col: int, direction_index: int):
    next_row = row + directions[direction_index][0]
    next_col = col + directions[direction_index][1]
    if in_map(input, next_row, next_col) and input[next_row][next_col] == "#":
        direction_index = (direction_index + 1) % len(directions)
        return row, col, direction_index
    return next_row, next_col, direction_index


def part1():
    input_map, current_row, current_col = read_input()
    visited = set()
    direction_index = 0
    while in_map(input_map, current_row, current_col):
        visited.add(f"{current_row},{current_col}")
        current_row, current_col, direction_index = next_step(
            input_map, current_row, current_col, direction_index)
    return len(visited)


def is_loop(input_map, row, col, direction_index, visited_dir):
    new_visites = set()
    while in_map(input_map, row, col):
        row, col, direction_index = next_step(
            input_map, row, col, direction_index)
        key = f"{row},{col},{direction_index}"
        if key in visited_dir or key in new_visites:
            return True
        new_visites.add(key)
    return False


def part2():
    visited_dir = set()
    input_map, start_row, start_col = read_input()
    visited = set()
    direction_index = 0
    answer = 0
    current_row, current_col = start_row, start_col
    while in_map(input_map, current_row, current_col):
        visited.add(f"{current_row},{current_col}")
        next_row, next_col, direction_index = next_step(
            input_map, current_row, current_col, direction_index)
        visited_dir.add(f"{current_row},{current_col},{direction_index}")
        if f"{next_row},{next_col}" not in visited and in_map(input_map, next_row, next_col):
            input_map[next_row][next_col] = '#'
            answer += is_loop(input_map, current_row,
                              current_col, direction_index, visited_dir)
            input_map[next_row][next_col] = '.'
        current_row, current_col = next_row, next_col
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
