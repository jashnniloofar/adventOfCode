import time


def read_input():
    with open("./input.txt", "r") as f:
        return [int(line.strip()) for line in f]


def get_next_secret(secret: int):
    result = ((secret * 64) ^ secret) % 16777216
    result = ((result // 32) ^ result) % 16777216
    result = ((result * 2048) ^ result) % 16777216
    return result


def part1():
    seeds = read_input()
    answer = 0
    for seed in seeds:
        secret = seed
        for _ in range(2000):
            secret = get_next_secret(secret)
        answer += secret
    return answer


def calc_change_price(prices: list[int], diffs: list[int], sum_prices: dict):
    visited = set()
    for i in range(3, len(prices)):
        key = (diffs[i], diffs[i-1], diffs[i-2], diffs[i-3])
        if key not in visited:
            visited.add(key)
            sum_prices[key] = sum_prices.get(key, 0) + prices[i]


def part2():
    seeds = read_input()
    sum_prices = dict()
    for seed in seeds:
        prices = []
        diffs = []
        previous_price = seed % 10
        secret = seed
        for _ in range(2000):
            secret = get_next_secret(secret)
            price = secret % 10
            diffs.append(price - previous_price)
            prices.append(price)
            previous_price = price
        calc_change_price(prices, diffs, sum_prices)
    return max(sum_prices.values())


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
