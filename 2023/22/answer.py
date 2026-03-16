
import time


class Brick():
    def __init__(self, line: str):
        points = line.strip().split("~")
        x1, y1, z1 = map(int, points[0].split(","))
        x2, y2, z2 = map(int, points[1].split(","))
        self.x1 = x1
        self.y1 = y1
        self.z1 = z1
        self.x2 = x2
        self.y2 = y2
        self.z2 = z2
        self.supports = set()
        self.supported_by = set()

    def __repr__(self) -> str:
        return f"Brick(x1={self.x1}, y1={self.y1}, z1={self.z1}, x2={self.x2}, y2={self.y2}, z2={self.z2})"

    def overlaps(self, other: "Brick") -> bool:
        return max(self.x1, other.x1) <= min(self.x2, other.x2) and max(self.y1, other.y1) <= min(self.y2, other.y2)


def read_input():
    bricks = []
    with open("./input.txt", "r") as f:
        for line in f:
            bricks.append(Brick(line))
    return bricks


def fill_supports(bricks: list[Brick]):
    bricks.sort(key=lambda b: b.z1)
    for i, brick in enumerate(bricks):
        floor = 1
        for j in range(0, i):
            other = bricks[j]
            if brick.overlaps(other):
                floor = max(floor, other.z2 + 1)
        old_z1 = brick.z1
        brick.z1 = floor
        brick.z2 = floor + (brick.z2 - old_z1)

    for i, brick in enumerate(bricks):
        for j in range(0, i):
            other = bricks[j]
            if brick.overlaps(other) and other.z2 == brick.z1 - 1:
                brick.supported_by.add(other)
                other.supports.add(brick)


def part1():
    bricks = read_input()
    fill_supports(bricks)

    count = 0
    for brick in bricks:
        can_remove = True
        for other in brick.supports:
            if len(other.supported_by) == 1:
                can_remove = False
                break
        count += can_remove

    return count


def part2():
    bricks = read_input()
    fill_supports(bricks)

    answer = 0
    for bricks in bricks:
        queue = [bricks]
        falling = set()
        while len(queue) > 0:
            brick = queue.pop(0)
            if brick in falling:
                continue
            falling.add(brick)
            for other in brick.supports:
                if other.supported_by.issubset(falling):
                    queue.append(other)
        answer += len(falling) - 1
    return answer


start = time.time()
answer = part1()
end = time.time()
print(f"Part1: answer is {answer} and running time is: {end - start:.4f} seconds")

start = time.time()
answer = part2()
end = time.time()
print(f"Part2: answer is {answer} and running time is: {end - start:.4f} seconds")
