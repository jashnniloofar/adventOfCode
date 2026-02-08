import time
with open("./input.txt", "r") as f:
    lines = [line.strip() for line in f]
lines = [list(line) for line in lines]

def is_paper(input_map, row, col):
    if row < 0 or row >= len(input_map) or col < 0 or col >= len(input_map[0]):
        return False
    return input_map[row][col] == "@"


def part1(input_map, remove_papers= False):
    sum_accesible = 0
    accessible_papers = []
    for row in range(len(input_map)):
        for col in range(len(input_map[row])):
            if input_map[row][col] == "@":
                adjacent_paper = 0
                for i in range(-1, 2):
                    for j in range(-1, 2):
                        if i != 0 or j != 0:
                            adjacent_paper += is_paper(input_map, row + i, col + j)
                if adjacent_paper < 4:
                    sum_accesible += 1
                    accessible_papers.append([row,col])
    if remove_papers:
        for accessible_paper in accessible_papers:
            input_map[accessible_paper[0]][accessible_paper[1]] = '.'
    return sum_accesible


def part2(input_map):
    sum_accesible = 0
    accessible_count = part1(input_map, True)
    while accessible_count > 0:
        sum_accesible += accessible_count
        accessible_count = part1(input_map, True)
    return sum_accesible


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
