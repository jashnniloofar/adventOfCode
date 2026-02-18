import time
import re


def read_input():
    with open("./input.txt", "r") as f:
        warehouse, moves = f.read().split("\n\n")
        moves = moves.replace("\n", "")

    return warehouse, moves


directions = [[-1, 0], [0, 1], [1, 0], [0, -1]]


def get_map(warehouse: str):
    input_map = []
    row = 0
    for line in warehouse.split("\n"):
        input_map.append(list(line))
        if line.find("@") > 0:
            start = (row, line.find("@"))
        row += 1
    return input_map, start


def move_to_direction(move: str):
    match move:
        case "^":
            return [-1, 0]
        case ">":
            return [0, 1]
        case "v":
            return [1, 0]
        case "<":
            return [0, -1]


def next_cell(row: int, col: int, direction: list[int]):
    return (row + direction[0], col + direction[1])


def can_move(input_map: list[list[int]], row: int, col: int, direction: list[int], need_move: set):
    key = f"{row},{col}"
    if key in need_move:
        return True
    need_move.add(key)
    next_r, next_col = next_cell(row, col, direction)
    if input_map[next_r][next_col] == '#':
        return False
    if input_map[next_r][next_col] == '.':
        return True
    if input_map[next_r][next_col] == input_map[row][col]:
        return can_move(input_map, next_r, next_col, direction, need_move)
    if input_map[next_r][next_col] == "[":
        return can_move(input_map, next_r, next_col, direction, need_move) and can_move(input_map, next_r, next_col+1, direction, need_move)
    if input_map[next_r][next_col] == "]":
        return can_move(input_map, next_r, next_col, direction, need_move) and can_move(input_map, next_r, next_col-1, direction, need_move)


def part1():
    warehouse, moves = read_input()
    input_map, start = get_map(warehouse)
    current_r, current_c = start
    input_map[current_r][current_c] = '.'
    for move in moves:
        direction = move_to_direction(move)
        next_r, next_c = next_cell(current_r, current_c, direction)
        if input_map[next_r][next_c] == '.':
            current_r, current_c = next_r, next_c
            continue
        elif input_map[next_r][next_c] == 'O':
            boxes_end_r, boxes_end_c = next_cell(next_r, next_c, direction)
            while input_map[boxes_end_r][boxes_end_c] == 'O':
                boxes_end_r, boxes_end_c = next_cell(
                    boxes_end_r, boxes_end_c, direction)
            if input_map[boxes_end_r][boxes_end_c] == '.':
                input_map[boxes_end_r][boxes_end_c] = 'O'
                input_map[next_r][next_c] = '.'
                current_r, current_c = next_r, next_c

    answer = 0
    for row in range(1, len(input_map)-1):
        for col in range(1, len(input_map[0])-1):
            if input_map[row][col] == 'O':
                answer += 100 * row + col

    return answer


def print_map(input_map: list[list[int]], current_r: int, current_c: int):
    input_map[current_r][current_c] = "@"
    for row in input_map:
        print("".join(row))
    input_map[current_r][current_c] = "."


def part2():
    warehouse, moves = read_input()
    warehouse = warehouse.replace("#", "##").replace(
        "O", "[]").replace(".", "..").replace("@", "@.")
    input_map, start = get_map(warehouse)
    current_r, current_c = start
    input_map[current_r][current_c] = '.'
    for move in moves:
        direction = move_to_direction(move)
        next_r, next_c = next_cell(current_r, current_c, direction)
        if input_map[next_r][next_c] == '.':
            current_r, current_c = next_r, next_c
            continue
        if input_map[next_r][next_c] == '#':
            continue
        if direction[0] == 0:
            boxes_end_r, boxes_end_c = next_cell(next_r, next_c, direction)
            while input_map[boxes_end_r][boxes_end_c] in ["[", "]"]:
                boxes_end_r, boxes_end_c = next_cell(
                    boxes_end_r, boxes_end_c, direction)
            if input_map[boxes_end_r][boxes_end_c] == '.':
                step = direction[1]
                for i in range(boxes_end_c, next_c, -step):
                    input_map[next_r][i] = input_map[next_r][i-step]
                input_map[next_r][next_c] = '.'
                current_r, current_c = next_r, next_c
        else:
            need_move = set()
            if input_map[next_r][next_c] == '[':
                move_box = can_move(input_map, next_r, next_c, direction, need_move) and can_move(
                    input_map, next_r, next_c + 1, direction, need_move)
            else:
                move_box = can_move(input_map, next_r, next_c, direction, need_move) and can_move(
                    input_map, next_r, next_c - 1, direction, need_move)
            if not move_box:
                continue
            move_list = [list(map(int, item.split(","))) for item in need_move]
            reversed = False if move == "^" else True
            move_list.sort(key=lambda p: p[0], reverse=reversed)
            for [r, c] in move_list:
                input_map[r + direction[0]][c] = input_map[r][c]
                input_map[r][c] = '.'
            input_map[next_r][next_c] = '.'
            current_r, current_c = next_r, next_c

    # print_map(input_map, current_r, current_c)
    answer = 0
    for row in range(1, len(input_map)-1):
        for col in range(1, len(input_map[0])-1):
            if input_map[row][col] == '[':
                answer += 100 * row + col

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
