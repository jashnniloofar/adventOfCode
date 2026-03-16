
import time
import networkx as nx


def read_input():
    graph = nx.Graph()
    with open("./input.txt", "r") as f:
        for line in f:
            start, adj = line.strip().split(": ")
            for node in adj.split(" "):
                graph.add_edge(start, node)
    return graph


def part1():
    graph = read_input()
    _, partitions = nx.stoer_wagner(graph)
    return len(partitions[0]) * len(partitions[1])

start = time.time()
answer = part1()
end = time.time()
print(
    f"Part1: answer is {answer} and running time is: {end - start:.4f} seconds")
