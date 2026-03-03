import time
import math


def read_input():
    node_map = dict()
    with open("./input.txt", "r") as f:
        instruction, nodes = f.read().split("\n\n")
        for node in nodes.split("\n"):
            node_map[node[0:3]] = [node[7:10], node[12:15]]
        return instruction, node_map


def part1():
    instruction, node_map = read_input()
    current_node = 'AAA'
    index = 0
    while current_node != 'ZZZ':
        if instruction[index % len(instruction)] == 'L':
            current_node = node_map[current_node][0]
        else:
            current_node = node_map[current_node][1]
        index += 1
    return index


def get_cycle(node: str, node_map: dict, instruction: str) -> int:
    current_node = node
    index = 0
    while not current_node.endswith("Z"):
        if instruction[index % len(instruction)] == 'L':
            current_node = node_map[current_node][0]
        else:
            current_node = node_map[current_node][1]
        index += 1
    return index


def part2():
    instruction, node_map = read_input()
    cycles = []
    for node in node_map.keys():
        if node.endswith("A"):
            cycles.append(get_cycle(node, node_map, instruction))
    return math.lcm(*cycles)


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
