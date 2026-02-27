import time


def read_input():
    with open("./input.txt", "r") as f:
        return [list(line.strip()) for line in f]


def get_symbols(schematic: list[list[str]]) -> dict:
    symbols = dict()
    for r, row in enumerate(schematic):
        for c, char in enumerate(row):
            if not char.isdigit() and char != ".":
                symbols[(r, c)] = []
    return symbols


def find_symbol(symbols: dict, row: int, c_start: int, c_end: int):
    for (s_r, s_c) in symbols:
        if row-1 <= s_r <= row + 1 and c_start-1 <= s_c <= c_end+1:
            return (s_r, s_c)


def get_numbers(schematic: list[list[str]], symbols: dict):
    nums = []
    for r, row in enumerate(schematic):
        num = ""
        for c, char in enumerate(row):
            if char.isdigit():
                num += char
            else:
                if len(num) > 0:
                    symbol = find_symbol(symbols, r, c-len(num), c-1)
                    if symbol != None:
                        symbols[symbol].append(int(num))
                        nums.append(int(num))
                num = ""
        if len(num) > 0:
            symbol = find_symbol(symbols, r, c-len(num), c-1)
            if symbol != None:
                symbols[symbol].append(int(num))
                nums.append(int(num))
    return nums


def part1():
    schematic = read_input()
    symbols = get_symbols(schematic)
    nums = get_numbers(schematic, symbols)
    return sum(nums)


def part2():
    schematic = read_input()
    symbols = get_symbols(schematic)
    get_numbers(schematic, symbols)
    answer = 0
    for (s_r, s_c), adj in symbols.items():
        if schematic[s_r][s_c] == '*' and len(adj) == 2:
            answer += adj[0] * adj[1]
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
