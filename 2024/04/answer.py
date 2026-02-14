import time
import re


def read_input():
    with open("./input.txt", "r") as f:
        return [list(line.strip()) for line in f]


def get_cell(input: list[list[int]], row: int, col: int):
    if row < 0 or row >= len(input):
        return ""
    if col < 0 or col >= len(input[0]):
        return ""
    return input[row][col]


def part1():
    input = read_input()
    directions = [[0, 1], [0, -1], [1, 0],
                  [1, 1], [1, -1], [-1, 0], [-1, 1], [-1, -1]]
    answer = 0
    word = 'XMAS'
    for direction in directions:
        d_r, d_c = direction
        for row in range(len(input)):
            for col in range(len(input[0])):
                found = True
                for index in range(len(word)):
                    if get_cell(input, row + index * d_r, col + index * d_c) != word[index]:
                        found = False
                        break
                answer += found

    return answer


def part2():
    input = read_input()
    answer = 0
    word = 'XMAS'
    for row in range(1, len(input)-1):
        for col in range(1, len(input[0])-1):

            if input[row][col] == 'A':
                if input[row-1][col-1] + input[row+1][col+1] in ['MS', 'SM']:
                    if input[row+1][col-1] + input[row-1][col+1] in ['MS', 'SM']:
                        answer += 1
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
