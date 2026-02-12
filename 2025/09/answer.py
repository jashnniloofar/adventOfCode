import time
import shapely

with open("./input.txt", "r") as f:
    points = [list(map(int, line.strip().split(","))) for line in f]


def part1(points: list[list[int]]):
    max_area = 0
    for i in range(len(points)):
        for j in range(i+1, len(points)):
            area = (abs(points[i][0] - points[j][0]) + 1) * \
                (abs(points[i][1] - points[j][1]) + 1)
            max_area = max(area, max_area)
    return max_area


def part2(points: list[list[int]]):
    polygon = shapely.Polygon([(x, y) for (x, y) in points])
    max_area = 0
    for i in range(len(points)):
        for j in range(i+1, len(points)):
            left = min(points[i][0], points[j][0])
            right = max(points[i][0], points[j][0])
            top = min(points[i][1], points[j][1])
            bottom = max(points[i][1], points[j][1])
            rectangle = shapely.box(left, top, right, bottom)
            if shapely.contains(polygon, rectangle):
                area = (abs(points[i][0] - points[j][0]) + 1) * \
                    (abs(points[i][1] - points[j][1]) + 1)
                if area > max_area:
                    max_area = area
    return max_area


start = time.time()
answer = part1(points)
end = time.time()
print(
    f"Part1: answer is {answer} and running time is: {end - start:.4f} seconds")

start = time.time()
answer = part2(points)
end = time.time()
print(
    f"Part2: answer is {answer} and running time is: {end - start:.4f} seconds")
