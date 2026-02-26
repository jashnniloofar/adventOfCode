# Thanks 0xdf for great hint
import time


def read_input():
    wires = dict()
    with open("./input.txt", "r") as f:
        for line in f:
            if line.find(":") > 0:
                wire, value = line.split(": ")
                wires[wire] = int(value)
            if line.find("->") > 0:
                value, wire = line.strip().split(" -> ")
                wires[wire] = value
    return wires


def get_value(wire: str, wires: dict):
    if wires[wire] in [1, 0]:
        return wires[wire]
    operand1, operator, operand2 = wires[wire].split(" ")
    operand1 = get_value(operand1, wires)
    operand2 = get_value(operand2, wires)
    if operator == "AND":
        result = operand1 & operand2
    elif operator == "OR":
        result = operand1 | operand2
    else:
        result = operand1 ^ operand2
    return result


def part1():
    wires = read_input()
    digit = 0
    binary = ""
    while f"x{digit:02d}" in wires:
        binary = str(get_value(f"x{digit:02d}", wires)) + binary
        digit += 1

    digit = 0
    binary = ""
    while f"y{digit:02d}" in wires:
        binary = str(get_value(f"y{digit:02d}", wires)) + binary
        digit += 1
    digit = 0
    binary = ""
    while make_wire("z", digit) in wires:
        binary = str(get_value(make_wire("z", digit), wires)) + binary
        digit += 1

    return int(binary, 2)


def make_wire(variable: str, digit: int):
    return f"{variable}{digit:02d}"


def validate(n: int, wires: dict) -> bool:
    for i in range(45):
        wires[make_wire("x", i)] = 0
        wires[make_wire("y", i)] = 0
    for x in range(2):
        for y in range(2):
            for c in range(2):
                wires[make_wire("x", n)] = x
                wires[make_wire("y", n)] = y
                if n > 0:
                    wires[make_wire("x", n-1)] = c
                    wires[make_wire("y", n-1)] = c
                elif c > 0:
                    continue

                z = get_value(make_wire("z", n), wires)
                if z != (x + y + c) % 2:
                    return False
    return True


def find_wire(op: str, operands: list[str], wires: dict):
    wire_parts = [f"{operands[0]} {op} {operands[1]}",
                  f"{operands[1]} {op} {operands[0]}"]
    for wire in wires:
        if type(wires[wire]) == int:
            continue
        for wire_part in wire_parts:
            if wires[wire].find(wire_part) >= 0:
                return wire


def swap(w1: str, w2: str, wires: dict) -> None:
    wires[w1], wires[w2] = wires[w2], wires[w1]


def fix_bit_n(n: int, wires: dict):
    """
    zn = nxor XOR m1
    nxor = xn XOR yn
    m1 = m2 OR prevand
    prevand = xn-1 AND yn-1
    m2 = prevxor AND (something else from prev)
    prevxor = xn-1 XOR yn-1

    know m2 is good or would have crashed on prev validation
    """

    prevand = find_wire(
        "AND", [make_wire('x', n-1), make_wire('y', n-1)], wires)
    prevxor = find_wire(
        "XOR", [make_wire('x', n-1), make_wire('y', n-1)], wires)
    m2 = find_wire("AND", [prevxor, ""], wires)
    m1 = find_wire("OR", [m2, prevand], wires)
    nxor = find_wire("XOR", [make_wire('x', n), make_wire('y', n)], wires)
    zn = find_wire("XOR", [nxor, m1], wires)
    if zn is None:
        zn = wires[make_wire("z", n)]
        operand1, _, operand2 = zn.split(" ")
        to_swap = list(set([operand1, operand2]) ^ set([nxor, m1]))
    elif zn != make_wire("z", n):
        to_swap = [make_wire("z", n), zn]

    swap(to_swap[0], to_swap[1], wires)
    return to_swap


def part2():
    swaped_wires = []
    wires = read_input()
    for i in range(45):
        if validate(i, wires):
            continue
        swaped_wires.extend(fix_bit_n(i, wires))
    return ",".join(sorted(swaped_wires))


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
