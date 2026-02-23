import time
import re


def read_input():
    with open("./input.txt", "r") as f:
        return f.read().split("\n")


num_keypad = [['#', '#', '#', '#', '#'], ['#', '#', '#', '#', '#'],
              ['#', '7', '8', '9', '#'], ['#', '4', '5', '6', '#'],
              ['#', '1', '2', '3', '#'], ['#', '#', '0', 'A', '#'],
              ['#', '#', '#', '#', '#'], ['#', '#', '#', '#', '#']]

dir_keypad = [['#', '#', '#', '#', '#'], ['#', '#', '#', '#', '#'],
              ['#', '#', '^', 'A', '#'], ['#', '<', 'v', '>', '#'],
              ['#', '#', '#', '#', '#'], ['#', '#', '#', '#', '#']]
nums = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A']
dirs = ['^', '>', 'v', '<', 'A']

moves = [['v', 1, 0], ['^', -1, 0], ['>', 0, 1], ['<', 0, -1]]


def find_pos(char: str, board: list[list[str]]):
    for row in range(1, len(board)-1):
        for col in range(1, len(board[0])-1):
            if board[row][col] == char:
                return row, col


def find_path(chars: list[str], board: list[list[str]], path: dict):
    direct_path = dict()
    for char in chars:
        row, col = find_pos(char, board)
        for move in moves:
            next_row, next_col = row, col
            current_moves = ""
            while board[next_row][next_col] != '#':
                direct_path[f"{char},{board[next_row][next_col]}"] = current_moves
                current_moves += move[0]
                next_row += move[1]
                next_col += move[2]
    for start in chars:
        for end in chars:
            if f"{start},{end}" in direct_path:
                path[f"{start},{end}"] = direct_path[f"{start},{end}"]
                continue
            for mid in chars:
                if f"{start},{mid}" in direct_path and f"{mid},{end}" in direct_path:
                    path[f"{start},{end}"] = direct_path[f"{start},{mid}"] + \
                        direct_path[f"{mid},{end}"]
                    break


def get_keys(code: str, path: dict):
    current = 'A'
    keys = ''
    for char in code:
        keys += path[f"{current},{char}"] + "A"
        current = char
    return keys


path_length = dict()


def get_path_length(start: str, end: str, dir_keypad_count: int, path: dict):
    if (f"{start},{end}", dir_keypad_count) in path_length:
        return path_length[(f"{start},{end}", dir_keypad_count)]

    keys = path[f"{start},{end}"] + "A"
    current = 'A'
    answer = 0
    for key in keys:
        answer += get_path_length(current, key, dir_keypad_count-1, path)
        current = key
    path_length[(f"{start},{end}", dir_keypad_count)] = answer
    return answer


def get_complexities(codes: list[str], dir_keypad_count: int):
    path = dict()
    find_path(nums, num_keypad, path)
    find_path(dirs, dir_keypad, path)
    for p in path:
        path_length[(p, 1)] = len(path[p]) + 1
    answer = 0

    for code in codes:
        current = 'A'
        for char in code:
            length = get_path_length(current, char, dir_keypad_count+1, path)
            answer += length * int(code[:-1])
            current = char
    return answer


def part1():
    codes = read_input()
    return get_complexities(codes, 2)


def part2():
    codes = read_input()
    return get_complexities(codes, 25)


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
