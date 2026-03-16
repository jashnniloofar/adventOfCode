
import time
import sympy


class Stone:
    def __init__(self, line: str) -> None:
        p, v = line.split(" @ ")
        self.x0, self.y0, self.z0 = tuple(map(int, p.split(",")))
        self.vx, self.vy, self.vz = tuple(map(int, v.split(",")))

    def __repr__(self):
        return f"Stone(p0={self.x0},{self.y0},{self.z0}, v={self.vx},{self.vy},{self.vz})"

    def intersect(self, other: "Stone") -> tuple[int, int, int, int] | None:
        # y = y0 + t * vy
        # x = x0 + t * vx
        # t = (x - x0) / vx
        # y = y0 + (x - x0) * (vy / vx)
        # y = x * (vy / vx) + y0 - x0 * (vy / vx)
        # ax + b = cx + d --> 2 lines intersect
        a = self.vy / self.vx
        b = self.y0 - a * self.x0
        c = other.vy / other.vx
        d = other.y0 - c * other.x0

        # parallel lines
        if a == c:
            return None
        x = (d - b) / (a - c)
        y = a * x + b
        t = (x - self.x0) / self.vx
        t_other = (x - other.x0) / other.vx

        return (x, y, t, t_other)


def read_input():
    with open("./input.txt", "r") as f:
        return [Stone(line) for line in f]


def part1():
    stones = read_input()
    min_p = 200000000000000
    max_p = 400000000000000
    answer = 0
    for i in range(len(stones)):
        for j in range(i):
            result = stones[i].intersect(stones[j])
            if not result:
                continue
            x, y, ti, tj = result
            # print(x, y, ti, tj)
            if min_p <= x <= max_p and min_p <= y <= max_p and ti >= 0 and tj >= 0:
                answer += 1
    return answer


def part2():
    stones = read_input()
    # rock:  Stone(p0=rx,ry,rz, v=rvx,rvy,rvz) --> unknown
    # stone: Stone(p0=sx,sy,sz, v=svx,svy,svz) --> known
    # t * rvx + rx = t * svx + sx
    # t * rvy + ry = t * svy + sy
    # t * rvz + rz = t * svz + sz
    # t = (sx - rx) / (rvx - svx) = (sy - ry) / (rvy - svy) = (sz - rz) / (rvz - svz)
    # (sx - rx) * (rvy - svy) = (rvx - svx) * (sy - ry)
    # (sx - rx) * (rvy - svy) - (rvx - svx) * (sy - ry) = 0
    # (sx - rx) * (rvz - svz) = (rvx - svx) * (sz - rz)
    # (sx - rx) * (rvz - svz) - (rvx - svx) * (sz - rz) = 0

    rx, ry, rz, rvx, rvy, rvz = sympy.symbols("rx, ry, rz, rvx, rvy, rvz")
    equations = []
    for i in range(4):
        stone = stones[i]
        equations.append((stone.x0 - rx) * (rvy - stone.vy) - (rvx - stone.vx) * (stone.y0 - ry))
        equations.append((stone.x0 - rx) * (rvz - stone.vz) - (rvx - stone.vx) * (stone.z0 - rz))
    result = sympy.solve(equations)
    return result[0][rx] + result[0][ry] + result[0][rz]


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
