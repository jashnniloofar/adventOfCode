import time
with open("./input.txt", "r") as f:
    lines = [list(line.strip()) for line in f]
timpelines = dict()


def part1(map: list[list[str]]):
    split_count = 0
    for row in range(len(map)-1):
        for col in range(len(map[row])):
            if map[row][col] == 'S':
                if map[row+1][col] == '^':
                    map[row+1][col+1] = 'S'
                    map[row+1][col-1] = 'S'
                    split_count += 1
                else:
                    map[row+1][col] = 'S'
    return split_count


def calc_timelines(map: list[list[str]], row: int, col: int):
    key = f"{row},{col}"
    if timpelines.get(key):
        return timpelines.get(key)
    if row == len(map)-1:
        return 1
    count = 0
    if map[row+1][col] == "^":
        count = calc_timelines(map, row+1, col-1) + \
            calc_timelines(map, row+1, col+1)
    else:
        count = calc_timelines(map, row+1, col)
    timpelines[key] = count
    return count


def part2(map: list[list[str]]):
    start = 0
    for col in range(len(map[0])):
        if map[0][col] == 'S':
            start = col
    return calc_timelines(map, 0, start)


start = time.time()
answer = part1(lines)
end = time.time()
print(
    f"Part1: answer is {answer} and running time is: {end - start:.4f} seconds")

start = time.time()
answer = part2(lines)
end = time.time()
print(
    f"Part2: answer is {answer} and running time is: {end - start:.4f} seconds")
