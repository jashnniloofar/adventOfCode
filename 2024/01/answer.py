import time


def read_input():
    right_list = []
    left_list = []
    with open("./input.txt", "r") as f:
        for line in f:
            left, right = list(map(int, line.split()))
            right_list.append(right)
            left_list.append(left)
    return right_list, left_list


def part1():
    right_list, left_list = read_input()
    right_list.sort()
    left_list.sort()
    answer = 0
    for i in range(len(right_list)):
        answer += abs(right_list[i]-left_list[i])
    return answer


def part2():
    right_list, left_list = read_input()
    right_count = dict()
    for right in right_list:
        right_count[right] = right_count.get(right, 0) + 1

    answer = 0
    for left in left_list:
        answer += left * right_count.get(left, 0)
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
