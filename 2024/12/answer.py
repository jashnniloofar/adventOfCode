import time


def read_input():
    input_map = []
    with open("./input.txt", "r") as f:
        for line in f:
            input_map.append(list(line.strip()))
    return input_map


def get_map(input: list[list[int]], row: int, col: int):
    if 0 <= row < len(input) and 0 <= col < len(input):
        return input[row][col]
    return '#'


cache = set()
directions = [[1, 0], [0, 1], [-1, 0], [0, -1]]


def count_fence(input: list[list[int]], row: int, col: int):
    key = f"{row},{col}"
    cache.add(key)
    fence_count = 4
    area = 1
    for direction in directions:
        next_row, next_col = row + direction[0], col + direction[1]
        if get_map(input, next_row, next_col) == input[row][col]:
            fence_count -= 1
            if f"{next_row},{next_col}" not in cache:
                a, f = count_fence(input, next_row, next_col)
                fence_count += f
                area += a
    return area, fence_count


def count_edge(input: list[list[int]], row: int, col: int):
    key = f"{row},{col}"
    cache.add(key)
    edge_count = 0
    area = 1
    neighbours = []
    for direction in directions:
        r, c = row + direction[0], col + direction[1]
        neighbours.append((r, c))
    for i in range(len(neighbours)):
        n_row, n_col = neighbours[i]
        next_n_row, next_n_col = neighbours[(i + 1) % 4]
        if get_map(input, n_row, n_col) == input[row][col]:
            if f"{n_row},{n_col}" not in cache:
                a, e = count_edge(input, n_row, n_col)
                edge_count += e
                area += a
            if get_map(input, next_n_row, next_n_col) == input[row][col]:
                m_row = next_n_row if n_row == row else n_row
                m_col = next_n_col if n_col == col else n_col
                if get_map(input, m_row, m_col) != input[row][col]:
                    edge_count += 1
        elif get_map(input, next_n_row, next_n_col) != input[row][col]:
            edge_count += 1

    return area, edge_count


def part1():
    input_map = read_input()
    answer = 0
    for row in range(len(input_map)):
        for col in range(len(input_map[0])):
            if f"{row},{col}" not in cache:
                area, fence_count = count_fence(input_map, row, col)
                answer += area * fence_count
    return answer


def part2():
    cache.clear()
    input_map = read_input()
    answer = 0
    for row in range(len(input_map)):
        for col in range(len(input_map[0])):
            if f"{row},{col}" not in cache:
                area, fence_count = count_edge(input_map, row, col)
                answer += area * fence_count
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
