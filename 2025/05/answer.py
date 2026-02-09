import time
fresh_ranges = []
ids = []
with open("./input.txt", "r") as f:
    for line in f:
        line = line.strip()
        if not line:          # skip empty lines
            continue
        if "-" in line:
            fresh_ranges.append(list(map(int, line.split("-"))))
        else:
            ids.append(int(line))


def part1(fresh_ranges: list[list[int]], ids: list[int]):
    fresh_count = 0
    for id in ids:
        for fresh_range in fresh_ranges:
            if fresh_range[0] <= id <= fresh_range[1]:
                fresh_count += 1
                break
    return fresh_count


def part2(fresh_ranges: list[list[int]]):
    fresh_ranges.sort(key=lambda r: r[0])
    start = fresh_ranges[0][0]
    end = fresh_ranges[0][1]
    sum = 0
    for fresh_range in fresh_ranges:
        if fresh_range[0] <= end:
            end = max(end, fresh_range[1])
        else:
            sum += end - start + 1
            start = fresh_range[0]
            end = fresh_range[1]

    sum += end - start + 1
    return sum


start = time.time()
answer = part1(fresh_ranges, ids)
end = time.time()
print(
    f"Part1: answer is {answer} and running time is: {end - start:.4f} seconds")

start = time.time()
answer = part2(fresh_ranges)
end = time.time()
print(
    f"Part2: answer is {answer} and running time is: {end - start:.4f} seconds")
