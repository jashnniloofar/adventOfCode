import time


def read_input():
    galaxies = []
    input_map = []
    with open("./input.txt", "r") as f:
        row = 0
        for line in f:
            input_map.append(line.strip())
            for col in range(len(line)):
                if line[col] == '#':
                    galaxies.append((row, col))
            row += 1
    return galaxies, input_map


def get_distance(galaxy1: tuple[int, int], galaxy2: tuple[int, int], space: int, empty_rows_before: list[int], empty_cols_before: list[int]) -> int:
    distance = abs(galaxy1[0] - galaxy2[0]) + abs(galaxy1[1] - galaxy2[1])
    r1 = min(galaxy1[0], galaxy2[0])
    r2 = max(galaxy1[0], galaxy2[0])
    c1 = min(galaxy1[1], galaxy2[1])
    c2 = max(galaxy1[1], galaxy2[1])
    distance += (space-1) * ((empty_rows_before[r2] - empty_rows_before[r1]) + (
        empty_cols_before[c2] - empty_cols_before[c1]))
    return distance


def get_sum_of_distances(galaxies: list[tuple[int, int]], input_map: list[str], space: int) -> int:
    empty_rows = []
    for row in range(len(input_map)):
        if input_map[row].find('#') == -1:
            empty_rows.append(row)

    empty_cols = []
    for col in range(len(input_map[0])):
        if all(input_map[row][col] == '.' for row in range(len(input_map))):
            empty_cols.append(col)
    empty_col_before = []
    current = 0
    for col in range(len(input_map[0])):
        if col in empty_cols:
            current += 1
        empty_col_before.append(current)

    empty_row_before = []
    current = 0
    for row in range(len(input_map)):
        if row in empty_rows:
            current += 1
        empty_row_before.append(current)

    answer = 0
    for i in range(len(galaxies)):
        for j in range(i + 1, len(galaxies)):
            answer += get_distance(galaxies[i],
                                   galaxies[j], space, empty_row_before, empty_col_before)
    return answer


def part1():
    galaxies, input_map = read_input()
    return get_sum_of_distances(galaxies, input_map, 2)


def part2():
    galaxies, input_map = read_input()
    return get_sum_of_distances(galaxies, input_map, 1000000)


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
