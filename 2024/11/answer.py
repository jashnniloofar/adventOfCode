import time


def read_input():
    with open("./input.txt", "r") as f:
        return list(map(int, f.read().strip().split()))


cache = dict()


def num_stones(stone: int, blink: int):
    key = f"{stone},{blink}"
    if key in cache:
        return cache[key]
    if blink == 0:
        return 1
    result = 0
    if stone == 0:
        result = num_stones(1, blink-1)
    elif len(str(stone)) % 2 == 0:
        result = num_stones(int(str(stone)[0:len(str(stone)) // 2]), blink-1) + num_stones(
            int(str(stone)[len(str(stone)) // 2:]), blink-1)
    else:
        result = num_stones(2024 * stone, blink-1)
    cache[key] = result
    return result


def part1(blink: int):
    stones = read_input()
    answer = 0
    for stone in stones:
        answer += num_stones(stone, blink)
    return answer


start = time.time()
answer = part1(25)
end = time.time()
print(
    f"Part1: answer is {answer} and running time is: {end - start:.4f} seconds")

start = time.time()
answer = part1(75)
end = time.time()
print(
    f"Part2: answer is {answer} and running time is: {end - start:.4f} seconds")
