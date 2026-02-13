import time

with open("./input.txt", "r") as f:
    content = f.read()
    parts = content.split("\n\n")


def part1():
    presents = []
    present_sizes = []
    for p in parts[:-1]:
        present = p[2:].replace("\n", "")
        presents.append(present)
        present_sizes.append(present.count("#"))
    trees = parts[-1].split("\n")
    remains = []
    answer = 0
    for tree in trees:
        dimension, counts = tree.split(":")
        w, h = map(int, dimension.split("x"))
        tree_size = w * h
        counts = list(map(int, counts.strip().split(" ")))
        total_presents = sum(counts)
        total_presents_size = 0
        for i, count in enumerate(counts):
            total_presents_size += count * present_sizes[i]
        if total_presents_size <= tree_size:
            block_count = w//3 * h // 3
            if total_presents <= block_count:
                answer += 1
            else:
                remains.append(tree)
    if len(remains) == 0:
        return answer
    return remains


start = time.time()
answer = part1()
end = time.time()
print(
    f"Part1: answer is {answer} and running time is: {end - start:.4f} seconds")
