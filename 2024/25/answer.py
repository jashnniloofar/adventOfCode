import time


def read_input():
    keys = []
    locks = []
    with open("./input.txt", "r") as f:
        parts = [p.split("\n") for p in f.read().split("\n\n")]
        for part in parts:
            if part[0] == '#####':
                lock = [0] * 5
                for row in range(1, len(part)-1):
                    for col in range(5):
                        lock[col] += part[row][col] == '#'
                locks.append(lock)
            else:
                key = [5] * 5
                for row in range(1, len(part)-1):
                    for col in range(5):
                        key[col] -= part[row][col] == '.'
                keys.append(key)
    return locks, keys


def part1():
    locks, keys = read_input()
    answer = 0
    for lock in locks:
        for key in keys:
            fit = True
            for i in range(5):
                if lock[i] + key[i] > 5:
                    fit = False
            answer += fit
    return answer


start = time.time()
answer = part1()
end = time.time()
print(
    f"Part1: answer is {answer} and running time is: {end - start:.4f} seconds")
