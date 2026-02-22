import time
import re


def read_input():
    with open("./input.txt", "r") as f:
        return f.read().split('\n')


directions = [[1, 0], [-1, 0], [0, 1], [0, -1]]


def dijkstra(bytes: list[str], width: int):
    visited = set()
    visited.add("0,0")
    queue = [(0, 0, 0)]
    while len(queue) > 0:
        row, col, cost = queue.pop(0)
        for direction in directions:
            next_row = row + direction[0]
            next_col = col + direction[1]
            key = f"{next_col},{next_row}"
            if 0 <= next_row <= width and 0 <= next_col <= width and key not in bytes and key not in visited:
                if next_col == width and next_row == width:
                    return cost + 1
                visited.add(key)
                queue.append((next_row, next_col, cost+1))


def part1(width: int, bytes_length: int):
    bytes = read_input()
    return dijkstra(bytes[:bytes_length], width)


def part2(width: int):
    bytes = read_input()
    start = 0
    end = len(bytes)
    while start < end - 1:
        mid = (start + end) // 2
        if dijkstra(bytes[:mid], width) is not None:
            start = mid
        else:
            end = mid
    return bytes[start]


start = time.time()
answer = part1(70, 1024)
end = time.time()
print(
    f"Part1: answer is {answer} and running time is: {end - start:.4f} seconds")

start = time.time()
answer = part2(70)
end = time.time()
print(
    f"Part2: answer is {answer} and running time is: {end - start:.4f} seconds")
