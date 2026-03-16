
import time

input_map = []


def read_input():
    input_map.clear()
    with open("./input.txt", "r") as f:
        row = 0
        for line in f:
            input_map.append(list(line.strip()))
            if line.find('S') >= 0:
                start = (row, line.find('S'))
            row += 1
    return start


def traverse(start: tuple[int, int], max_steps: int):
    seen = set()
    queue = [(start, 0)]
    count = 0
    while len(queue) > 0:
        (row, col), steps = queue.pop(0)
        if steps > max_steps:
            continue
        if (row, col) in seen:
            continue
        seen.add((row, col))
        if (max_steps - steps) % 2 == 0:
            count += 1

        for dr, dc in [(0, 1), (0, -1), (1, 0), (-1, 0)]:
            new_row = row + dr
            new_col = col + dc
            if new_row < 0 or new_row >= len(input_map) or new_col < 0 or new_col >= len(input_map[0]):
                continue
            if input_map[new_row][new_col] != "#":
                queue.append(((new_row, new_col), steps + 1))
    return count


def part1():
    start = read_input()
    max_steps = 64
    answer = traverse(start, max_steps)
    return answer


def part2():
    start = read_input()
    size = len(input_map)
    steps = 26501365
    radius = steps // size

    even_blocks = traverse(start, size)
    odd_blocks = traverse(start, size+1)

    right_edge = traverse((size//2, 0), steps - (radius - 1) * size - (size // 2 + 1))
    left_edge = traverse((size//2, size-1), steps - (radius - 1) * size - (size // 2 + 1))
    top_edge = traverse((size-1, size//2), steps - (radius - 1) * size - (size // 2 + 1))
    bottom_edge = traverse((0, size//2), steps - (radius - 1) * size - (size // 2 + 1))

    top_right_corner_out = traverse((size-1, 0), steps - (radius - 1) * size - (size // 2 + 1) * 2)
    top_left_corner_out = traverse((size-1, size-1), steps - (radius - 1) * size - (size // 2 + 1) * 2)
    bottom_right_corner_out = traverse((0, 0), steps - (radius - 1) * size - (size // 2 + 1) * 2)
    bottom_left_corner_out = traverse((0, size-1), steps - (radius - 1) * size - (size // 2 + 1) * 2)

    top_right_corner_in = traverse((size-1, 0), steps - (radius - 2) * size - (size // 2 + 1) * 2)
    top_left_corner_in = traverse((size-1, size-1), steps - (radius - 2) * size - (size // 2 + 1) * 2)
    bottom_right_corner_in = traverse((0, 0), steps - (radius - 2) * size - (size // 2 + 1) * 2)
    bottom_left_corner_in = traverse((0, size-1), steps - (radius - 2) * size - (size // 2 + 1) * 2)

    answer = (radius ** 2) * odd_blocks
    answer += ((radius - 1) ** 2) * even_blocks
    answer += right_edge + left_edge + top_edge + bottom_edge
    answer += (top_right_corner_out + top_left_corner_out + bottom_right_corner_out + bottom_left_corner_out) * (radius)
    answer += (top_right_corner_in + top_left_corner_in + bottom_right_corner_in + bottom_left_corner_in) * (radius - 1)
    return answer


start = time.time()
answer = part1()
end = time.time()
print(f"Part1: answer is {answer} and running time is: {end - start:.4f} seconds")

start = time.time()
answer = part2()
end = time.time()
print(f"Part2: answer is {answer} and running time is: {end - start:.4f} seconds")
