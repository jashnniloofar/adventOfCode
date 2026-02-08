import time
with open("./input.txt", "r") as f:
    lines = [line.strip() for line in f]


def biggest_digit_index(str: str, start: int, end: int):
    biggest_index = start
    for i in range(start+1, end):
        if str[i] > str[biggest_index]:
            biggest_index = i
    return biggest_index


def part1(banks):
    sum_joltage = 0
    for bank in banks:
        first_battery_index = biggest_digit_index(bank, 0, len(bank) - 1)
        second_battery_index = biggest_digit_index(
            bank, first_battery_index+1, len(bank))
        sum_joltage += int(bank[first_battery_index] +
                           bank[second_battery_index])

    return sum_joltage


def part2(banks, digits_count):
    sum_joltage = 0
    for bank in banks:
        indices = []
        start = 0
        battery = ""
        for digit in range(digits_count):
            indices.append(biggest_digit_index(
                bank, start, len(bank)-digits_count + digit + 1))
            start = indices[digit] + 1
            battery += bank[indices[digit]]
        sum_joltage += int(battery)
    return sum_joltage


start = time.time()
answer = part1(lines)
end = time.time()
print(
    f"Part1: answer is {answer} and running time is: {end - start:.4f} seconds")

start = time.time()
answer = part2(lines, 12)
end = time.time()
print(
    f"Part2: answer is {answer} and running time is: {end - start:.4f} seconds")
