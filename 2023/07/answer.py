import time
from enum import IntEnum
from typing import Self


class HANDTYPE(IntEnum):
    HIGHCARD = 1
    PAIR = 2
    TWOPAIR = 3
    THREEOFAKIND = 4
    FULLHOUSE = 5
    FOUROFAKIND = 6
    FIVEOFAKIND = 7


card_map = {"T": "A", "J": "B", "Q": "C", "K": "D", "A": "E"}
card_map_with_jocker = {"T": "A", "J": "0", "Q": "C", "K": "D", "A": "E"}


class Hand:
    def __init__(self, hand: str, bet: str, has_jocker: bool = False) -> None:
        self.hand = hand
        self.bet = int(bet)
        self.has_jocker = has_jocker
        if not has_jocker:
            self.hand_type = get_hand_type(hand)
        else:
            types = [get_hand_type(hand.replace("J", c)) for c in hand]
            self.hand_type = max(types)

    def __eq__(self, other: Self) -> bool:
        return self.hand == other.hand

    def __gt__(self, other: Self) -> bool:
        if self.hand_type == other.hand_type:
            if not self.has_jocker:
                self_cards = [card_map.get(c, c) for c in self.hand]
                other_cards = [card_map.get(c, c) for c in other.hand]
            else:
                self_cards = [card_map_with_jocker.get(
                    c, c) for c in self.hand]
                other_cards = [card_map_with_jocker.get(
                    c, c) for c in other.hand]
            return self_cards > other_cards
        return self.hand_type > other.hand_type


def get_hand_type(hand: str) -> HANDTYPE:
    counts = [hand.count(c) for c in hand]
    if 5 in counts:
        return HANDTYPE.FIVEOFAKIND
    if 4 in counts:
        return HANDTYPE.FOUROFAKIND
    if 3 in counts:
        if 2 in counts:
            return HANDTYPE.FULLHOUSE
        return HANDTYPE.THREEOFAKIND
    if counts.count(2) == 4:
        return HANDTYPE.TWOPAIR
    if 2 in counts:
        return HANDTYPE.PAIR
    return HANDTYPE.HIGHCARD


def read_input(has_jocker: bool = False) -> list[Hand]:
    hands = []
    with open("./input.txt", "r") as f:
        for line in f:
            hand, bet = line.split(" ")
            hands.append(Hand(hand, bet, has_jocker))
    return hands


def part1():
    hands = read_input()
    hands.sort()
    answer = 0
    for index, hand in enumerate(hands):
        answer += (index+1) * hand.bet
    return answer


def part2():
    hands = read_input(has_jocker=True)
    hands.sort()
    answer = 0
    for index, hand in enumerate(hands):
        answer += (index+1) * hand.bet
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
