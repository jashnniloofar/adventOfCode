import time
import re


def read_input():
    with open("./input.txt", "r") as f:
        cards = []
        for line in f:
            [winning_nums, user_nums] = line.split(": ")[1].split(" | ")
            winning_nums = list(map(int, re.findall(r'\d+', winning_nums)))
            user_nums = list(map(int, re.findall(r'\d+', user_nums)))
            cards.append((winning_nums, user_nums))
        return cards


def get_win_count(cards: list):
    return [len(list(set(winning_nums) & set(user_nums))) for (winning_nums, user_nums) in cards]


def part1():
    cards = read_input()
    answer = 0
    win_count = get_win_count(cards)
    for count in win_count:
        if count > 0:
            answer += 2 ** (count-1)
    return answer


def get_cards_count(id: int, win_count: list[int], cache: dict):
    if id in cache:
        return cache[id]
    result = 1
    for i in range(win_count[id]):
        result += get_cards_count(id+i+1, win_count, cache)
    cache[id] = result
    return result


def part2():
    cards = read_input()
    win_count = get_win_count(cards)
    answer = 0
    cache = dict()
    for id in range(len(cards)):
        answer += get_cards_count(id, win_count, cache)
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
