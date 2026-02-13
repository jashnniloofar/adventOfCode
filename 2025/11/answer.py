import time

connections = dict()
cache = dict()
visited = set()
with open("./input.txt", "r") as f:
    for line in f:
        nodes = line.split()
        start = nodes.pop(0)
        connections[start[:-1]] = nodes


def calc_routes(node: str, end: str):
    if node in cache:
        return cache[node]
    if node in visited:
        return 0
    visited.add(node)
    result = 0
    for child in connections[node]:
        result += calc_routes(child, end)
    cache[node] = result
    return result


def all_routes(start: str, end: str):
    cache.clear()
    cache[end] = 1
    visited.clear()
    return calc_routes(start, end)


def part1():
    return all_routes('you', 'out')


connections['out'] = []


def part2():
    svr_dac = all_routes('svr', 'dac')
    dac_fft = all_routes('dac', 'fft')
    fft_out = all_routes('fft', 'out')

    svr_fft = all_routes('svr', 'fft')
    fft_dac = all_routes('fft', 'dac')
    dac_out = all_routes('dac', 'out')

    return svr_dac * dac_fft * fft_out + svr_fft * fft_dac * dac_out


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
