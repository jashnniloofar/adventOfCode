import time
import math
with open("./input.txt", "r") as f:
    locations = [list(map(int, line.strip().split(","))) for line in f]


def calc_distance(a: list[int], b: list[int]):
    return math.sqrt((a[0] - b[0]) ** 2 + (a[1] - b[1]) ** 2 + (a[2] - b[2]) ** 2)


def calc_edges(locations: list[list[int]]):
    edges = []
    for i in range(len(locations)):
        for j in range(i+1, len(locations)):
            edges.append([i, j, calc_distance(locations[i], locations[j])])
    edges.sort(key=lambda l: l[2])
    return edges


def network_member(node: int, visited: set, adjacents: dict):
    visited.add(node)
    new_member = 1
    if not adjacents.get(node) or len(adjacents.get(node)) == 0:
        return new_member
    for adj in adjacents.get(node):
        if adj not in visited:
            visited.add(adj)
            new_member += network_member(adj, visited, adjacents)
    return new_member


def part1(locations: list[list[int]], edge_count: int):
    edges = calc_edges(locations)[0:edge_count]
    adjacents = dict()
    for edge in edges:
        if adjacents.get(edge[0]):
            adjacents.get(edge[0]).append(edge[1])
        else:
            adjacents[edge[0]] = [edge[1]]
        if adjacents.get(edge[1]):
            adjacents.get(edge[1]).append(edge[0])
        else:
            adjacents[edge[1]] = [edge[0]]
    networks = []
    visited = set()
    for i in range(len(locations)):
        if i not in visited:
            networks.append(network_member(i, visited, adjacents))
    networks.sort(reverse=True)
    return networks[0] * networks[1] * networks[2]


def part2(locations: list[list[int]]):
    edges = calc_edges(locations)
    adjacents = dict()
    for edge in edges:
        if adjacents.get(edge[0]):
            adjacents.get(edge[0]).append(edge[1])
        else:
            adjacents[edge[0]] = [edge[1]]
        if adjacents.get(edge[1]):
            adjacents.get(edge[1]).append(edge[0])
        else:
            adjacents[edge[1]] = [edge[0]]

        visited = set()
        if network_member(0, visited, adjacents) == len(locations):

            return locations[edge[0]][0] * locations[edge[1]][0]


start = time.time()
answer = part1(locations, 1000)
end = time.time()
print(
    f"Part1: answer is {answer} and running time is: {end - start:.4f} seconds")

start = time.time()
answer = part2(locations)
end = time.time()
print(
    f"Part2: answer is {answer} and running time is: {end - start:.4f} seconds")
