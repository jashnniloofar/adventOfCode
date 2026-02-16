import time


def read_input():
    input_map = []
    with open("./input.txt", "r") as f:
        for line in f:
            input_map.append(list(map(int, list(line.strip()))))
    return input_map


def get_map(input: list[list[int]], row: int, col: int):
    if 0 <= row < len(input) and 0 <= col < len(input):
        return input[row][col]
    return -10


directions = [[1, 0], [-1, 0], [0, 1], [0, -1]]


def get_score(input: list[list[int]], row: int, col: int, scores: dict):
    key = f"{row},{col}"
    if key in scores:
        return scores.get(key)
    if input[row][col] == 9:
        return set([key])
    result = set()
    for direction in directions:
        next_row = row + direction[0]
        next_col = col + direction[1]
        if get_map(input, next_row, next_col) == input[row][col] + 1:
            result |= get_score(input, next_row, next_col, scores)
    scores[key] = result
    return result


def distinct_trail(input: list[list[int]], row: int, col: int, scores: dict):
    key = f"{row},{col}"
    if key in scores:
        return scores.get(key)
    if input[row][col] == 9:
        return 1
    result = 0
    for direction in directions:
        next_row = row + direction[0]
        next_col = col + direction[1]
        if get_map(input, next_row, next_col) == input[row][col] + 1:
            result += distinct_trail(input, next_row, next_col, scores)
    scores[key] = result
    return result


def part1():
    input_map = read_input()
    scores = dict()
    answer = 0
    for row in range(len(input_map)):
        for col in range(len(input_map[0])):
            if input_map[row][col] == 0:
                answer += len(get_score(input_map, row, col, scores))
    return answer


def part2():
    input_map = read_input()
    scores = dict()
    answer = 0
    for row in range(len(input_map)):
        for col in range(len(input_map[0])):
            if input_map[row][col] == 0:
                answer += distinct_trail(input_map, row, col, scores)
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
