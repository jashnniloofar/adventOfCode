import time


def add_connection(connections: dict, node: str, link: str):
    if node not in connections:
        connections[node] = set()
    connections[node].add(link)


def read_input():
    connections = dict()
    with open("./input.txt", "r") as f:
        for line in f:
            nodes = line.strip().split("-")
            add_connection(connections, nodes[0], nodes[1])
            add_connection(connections, nodes[1], nodes[0])
    return connections


cliques = []


def bron_kerbosch(current: set, remaining: set, processed: set, connections):
    if not remaining and not processed:
        cliques.append(current)
        return

    for node in list(remaining):
        bron_kerbosch(
            current | {node},
            remaining & connections[node],
            processed & connections[node],
            connections
        )
        remaining.remove(node)  # Remove node from remaining
        processed.add(node)     # Add node to x (processed)


def part1():
    connections = read_input()
    inter_connected = set()
    for node in connections.keys():
        if node[0] == "t":
            links = list(connections[node])
            for i in range(len(links)):
                for j in range(i+1, len(links)):
                    if links[j] in connections[links[i]]:
                        network = sorted([node, links[i], links[j]])
                        inter_connected.add(
                            (network[0], network[1], network[2]))

    return len(inter_connected)


def part2():
    connections = read_input()
    bron_kerbosch(set(), set(connections.keys()), set(), connections)
    max_cliques = sorted(list(max(cliques, key=len)))
    return ",".join(max_cliques)


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
