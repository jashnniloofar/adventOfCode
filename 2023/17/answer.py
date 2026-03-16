
import time
import heapq


def read_input():
    with open("./input.txt", "r") as f:
        return [list(map(int, list(line.strip()))) for line in f]


moves = [(0, 1), (1, 0), (0, -1), (-1, 0)]


def get_shortest_path(grid: list[list[int]], min_forward: int, max_forward: int) -> int:
    visited = set()
    queue = [(0, 0, 0, 0, 0), (0, 0, 0, 3, 0)]
    while queue:
        heat, row, col, dir, st = heapq.heappop(queue)
        if (row, col, dir, st) in visited:
            continue
        visited.add((row, col, dir, st))
        if row == len(grid) - 1 and col == len(grid[0]) - 1 and st >= min_forward:
            return heat
        for i in range(4):
            n_row = row + moves[i][0]
            n_col = col + moves[i][1]
            if n_row < 0 or n_row >= len(grid) or n_col < 0 or n_col >= len(grid[0]):
                continue
            if i == dir:
                if st < max_forward:
                    heapq.heappush(queue,
                                   (heat + grid[n_row][n_col], n_row, n_col, dir, st + 1))

            elif st >= min_forward:
                heapq.heappush(
                    queue, (heat + grid[n_row][n_col], n_row, n_col, i, 1))

    return -1


def part1():
    grid = read_input()
    return get_shortest_path(grid, 0, 3)


def part2():
    grid = read_input()
    return get_shortest_path(grid, 4, 10)


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
