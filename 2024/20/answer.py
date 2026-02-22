import time
import re


def read_input():
    input_map = []
    with open("./input.txt", "r") as f:
        row = 0
        for line in f:
            input_map.append(list(line.strip()))
            if line.find('S') >= 0:
                start = [row, line.find('S')]
            if line.find('E') >= 0:
                end = [row, line.find('E')]
            row += 1
    return input_map, start, end


directions = [[1, 0], [-1, 0], [0, 1], [0, -1]]


def dijkstra(input_map: list[str], start: list[int], end: list[int]):
    shortest_path = dict()
    shortest_path[f"{start[0]},{start[1]}"] = 0
    queue = [(start[0], start[1], 0)]
    while len(queue) > 0:
        row, col, cost = queue.pop(0)
        for direction in directions:
            next_row = row + direction[0]
            next_col = col + direction[1]
            key = f"{next_row},{next_col}"
            if 0 <= next_row < len(input_map) and 0 <= next_col < len(input_map) and input_map[next_row][next_col] != '#' and key not in shortest_path:
                shortest_path[key] = cost + 1
                if next_row == end[0] and next_col == end[1]:
                    return shortest_path
                queue.append((next_row, next_col, cost+1))


def get_distance(row, col, next_row, next_col):
    return abs(row-next_row) + abs(col-next_col)


def save_path(cheat_count: int, save_amount: int):
    input_map, start, end = read_input()
    path = dijkstra(input_map, start, end)

    cheats = []
    for row_c in range(cheat_count+1):
        for d in range(max(2, row_c), cheat_count+1):
            col_c = d - row_c
            cheats.append([row_c, col_c, d])
            if row_c != 0:
                cheats.append([-row_c, col_c, d])
            if col_c != 0:
                cheats.append([row_c, -col_c, d])
            if col_c != 0 and row_c != 0:
                cheats.append([-row_c, -col_c, d])
    answer = 0
    for row in range(len(input_map)):
        for col in range(len(input_map)):
            key = f"{row},{col}"
            if key in path:
                for cheat in cheats:
                    next_row = row + cheat[0]
                    next_col = col + cheat[1]
                    next_key = f"{next_row},{next_col}"
                    if next_key in path:
                        if path[key] - path[next_key] - cheat[2] >= save_amount:
                            answer += 1

    return answer


def part1():
    return save_path(2, 100)


def part2():
    return save_path(20, 100)


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
