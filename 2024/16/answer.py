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
            row += 1
    return input_map, start


directions = [[-1, 0], [0, 1], [1, 0], [0, -1]]


def pop_min(queue: list[list[int]], index=0):
    min = queue[0][index]
    min_index = 0
    for i in range(1, len(queue)):
        if queue[i][index] < min:
            min = queue[i][index]
            min_index = i
    return queue.pop(min_index)


def next_cell(row: int, col: int, direction: list[int]):
    return (row + direction[0], col + direction[1])


def get_minimum_cost(input_map: list[list[int]], start: list[int], previous: dict()):
    visited = dict()
    queue = [[0, start[0], start[1], 1, 1]]
    while len(queue) > 0:
        [cost, row, col, d, pd] = pop_min(queue)
        if input_map[row][col] == 'E':
            previous[(row, col, d)] = [pd]
            return cost, (row, col, d)
        if (row, col, d) in visited:
            if cost == visited[(row, col, d)]:
                previous[(row, col, d)].append(pd)
            continue
        visited[(row, col, d)] = cost
        previous[(row, col, d)] = [pd]
        moves = []
        next_r, next_c = next_cell(row, col, directions[d])
        if input_map[next_r][next_c] != '#':
            moves.append([cost + 1, next_r, next_c, d])
        moves.append([cost + 1000, row, col, (d + 1) % 4])
        moves.append([cost + 1000, row, col, (d - 1) % 4])
        for [co, r, c, dir] in moves:
            if (r, c, dir) not in visited:
                queue.append([co, r, c, dir, d])


def part1():
    input_map, start = read_input()
    previous = dict()
    minum_cost, _ = get_minimum_cost(input_map, start, previous)
    return minum_cost


def part2():
    input_map, start = read_input()
    previous = dict()
    _, (end_r, end_c, end_d) = get_minimum_cost(input_map, start, previous)
    route_queue = [(end_r, end_c, end_d)]
    route_node = set()
    while len(route_queue):
        (r, c, d) = route_queue.pop()
        route_node.add((r, c))
        if r == start[0] and c == start[1]:
            continue
        previous_directions = previous[(r, c, d)]
        for pd in previous_directions:
            if pd == d:
                p_r, p_c = next_cell(r, c, directions[(d + 2) % 4])
                route_queue.append((p_r, p_c, d))
            else:
                route_queue.append((r, c, pd))
    return len(route_node)


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
