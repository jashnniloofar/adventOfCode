import time
import re


def read_input():
    robots = []
    with open("./input.txt", "r") as f:
        for line in f:
            robots.append(list(map(int, re.findall(r'-{0,1}\d+', line))))
    return robots


def part1(second: int, width: int, height: int):
    robots = read_input()
    quadrants = [0] * 4
    for robot in robots:
        [x, y, v_x, v_y] = robot
        x_final = (x + second * v_x) % width
        y_final = (y + second * v_y) % height
        if x_final < width // 2:
            if y_final < height // 2:
                quadrants[0] += 1
            if y_final > height // 2:
                quadrants[1] += 1
        if x_final > width // 2:
            if y_final < height // 2:
                quadrants[2] += 1
            if y_final > height // 2:
                quadrants[3] += 1

    answer = quadrants[0] * quadrants[1] * quadrants[2] * quadrants[3]
    print(answer)
    return answer


def draw(positions: set, width: int, height: int):
    for i in range(height):
        row = ""
        for j in range(width):
            if f"{i},{j}" in positions:
                row += "#"
            else:
                row += "."
        print(row)


def part2(width: int, height: int):
    robots = read_input()
    for second in range(width * height):
        positions = set()
        for robot in robots:
            [x, y, v_x, v_y] = robot
            x_final = (x + second * v_x) % width
            y_final = (y + second * v_y) % height
            positions.add(f"{x_final},{y_final}")

        print(f"After {second}")
        draw(positions, width, height)
    answer = 0
    return answer


start = time.time()
answer = part1(100, 101, 103)
end = time.time()
print(
    f"Part1: answer is {answer} and running time is: {end - start:.4f} seconds")

start = time.time()
# answer = part2(101, 103)
end = time.time()
print(
    f"Part2: answer is {answer} and running time is: {end - start:.4f} seconds")
