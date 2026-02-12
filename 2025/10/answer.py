import re
import time

machines = []
permutations = dict()
infinite = 1000000
min_joltage_cache = dict()

with open("./input.txt", "r") as f:
    for line in f:
        indicator = re.search(
            r'\[(.*?)\]', line).group(1).replace("#", '1').replace(".", "0")
        groups = re.findall(r'\((.*?)\)', line)
        buttons = [list(map(int, g.split(','))) for g in groups]

        requirement = re.search(r'\{(.*?)\}', line).group(1)
        joltages = list(map(int, requirement.split(',')))
        machines.append(
            dict(indicator=indicator, buttons=buttons, joltages=joltages))


def get_permutations(length: int):
    binaries = [list(format(i, f'0{length}b')) for i in range(1, 2**length)]
    binaries.sort(key=lambda b: b.count('1'))
    return binaries


def get_min_buttons(machine):
    indicator = machine['indicator']
    buttons = machine['buttons']
    buttons_count = len(buttons)
    if permutations.get(buttons_count):
        permutation = permutations.get(buttons_count)
    else:
        permutation = get_permutations(buttons_count)
        permutations[buttons_count] = permutation
    for candidate in permutation:
        current = [0] * len(indicator)
        for i in range(len(candidate)):
            if candidate[i] == '1':
                for a in buttons[i]:
                    current[a] = current[a] ^ 1
            if indicator == "".join(map(str, current)):
                return candidate.count('1')


def part1(machines: list[dict]):
    answer = 0
    for machine in machines:
        answer += get_min_buttons(machine)
    return answer


def get_pattern(joltage: list[int]):
    return ''.join(str(j % 2) for j in joltage)


def get_patterns(buttons: list[list[int]], joltages: list[int]):
    patterns = dict()
    permutation = [list(format(i, f'0{len(buttons)}b'))
                   for i in range(0, 2**len(buttons))]
    for candidate in permutation:
        current_j = [0] * len(joltages)
        for i in range(len(candidate)):
            if candidate[i] == '1':
                for b in buttons[i]:
                    current_j[b] += 1
        pattern = get_pattern(current_j)
        if patterns.get(pattern):
            patterns[pattern].append(
                dict(count=candidate.count('1'), joltage=current_j))
        else:
            patterns[pattern] = [
                dict(count=candidate.count('1'), joltage=current_j)]
    return patterns


def get_min_buttons_with_joltage(joltages: list[int], patterns: dict):
    joltages_str = str(joltages)
    if joltages_str in min_joltage_cache:
        return min_joltage_cache.get(joltages_str)
    for j in joltages:
        if j < 0:
            return infinite
    pattern = get_pattern(joltages)
    if pattern in patterns:
        candidates = patterns.get(pattern)
        min_j = infinite
        for candidate in candidates:
            half_remain = []
            for i in range(len(joltages)):
                half_remain.append(
                    (joltages[i] - candidate["joltage"][i]) // 2)

            min_j = min(min_j, candidate['count'] + 2 * get_min_buttons_with_joltage(
                half_remain, patterns))
        min_joltage_cache[joltages_str] = min_j
        return min_j
    else:
        return infinite


def part2(machines: list[dict]):
    answer = 0
    for machine in machines:
        buttons = machine['buttons']
        joltages = machine['joltages']
        patterns = get_patterns(buttons, joltages)
        min_joltage_cache.clear()
        min_joltage_cache[str([0] * len(joltages))] = 0
        min_j = get_min_buttons_with_joltage(joltages, patterns)
        answer += min_j
    return answer


start = time.time()
answer = part1(machines)
end = time.time()
print(
    f"Part1: answer is {answer} and running time is: {end - start:.4f} seconds")

start = time.time()
answer = part2(machines)
end = time.time()
print(
    f"Part2: answer is {answer} and running time is: {end - start:.4f} seconds")
