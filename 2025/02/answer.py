import time
import re
with open("./input.txt", "r") as f:
    lines = [line.strip() for line in f]
ranges = lines[0].split(",")


def part1(id_ranges):
    sum_invalid_ids = 0
    for id_range in id_ranges:
        [lower, upper] = id_range.split("-")
        lower_length = len(lower)
        if len(lower) % 2 == 0:
            invalid_id_half = lower[0: lower_length // 2]
        else:
            invalid_id_half = "1" + "0" * (lower_length // 2)
        invalid_id = invalid_id_half * 2
        invalid_id_half = int(invalid_id_half)
        while int(invalid_id) <= int(upper):
            if int(invalid_id) >= int(lower):
                sum_invalid_ids += int(invalid_id)
            invalid_id_half += 1
            invalid_id = str(invalid_id_half) * 2
    return sum_invalid_ids


def part2(id_ranges):
    sum_invalid_ids = 0
    pattern = re.compile(r'^(\d+)\1+$')
    for id_range in id_ranges:
        lower, upper = map(int, id_range.strip().split("-"))
        for id in range(lower, upper + 1):
            if pattern.fullmatch(str(id)):
                sum_invalid_ids += id
    return sum_invalid_ids


start = time.time()
answer = part1(ranges)
end = time.time()
print(
    f"Part1: answer is {answer} and running time is: {end - start:.4f} seconds")

start = time.time()
answer = part2(ranges)
end = time.time()
print(
    f"Part2: answer is {answer} and running time is: {end - start:.4f} seconds")
