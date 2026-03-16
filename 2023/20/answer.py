
import math
import time


class Module():
    def __init__(self, type: str, outputs: list[str], memory: dict | int | None):
        self.type = type
        self.outputs = outputs
        self.memory = memory

    def __repr__(self) -> str:
        return f"Module(type={self.type}, outputs={self.outputs}, memory={self.memory})"


def read_input():
    modules = {}
    with open("./input.txt", "r") as f:
        for line in f:
            name, output = line.strip().split(" -> ")
            if name == "broadcaster":
                modules[name] = Module("b", output.split(", "), None)
            elif name[0] == "%":
                modules[name[1:]] = Module("f", output.split(", "), 0)
            else:
                modules[name[1:]] = Module("c", output.split(", "), {})
    return modules


def init_memory(modules: dict[str, Module]):
    for name, module in modules.items():
        for output in module.outputs:
            if output not in modules:
                continue
            output_module = modules[output]
            if output_module.type == "c":
                output_module.memory[name] = 0


def push_button(modules: dict[str, Module], memory_to_rx: list[str] | None = None, push_number: int | None = None) -> tuple[int, int]:
    queue = [("button", 0, "broadcaster")]
    low = 0
    high = 0
    while len(queue) > 0:
        source, pulse, dest = queue.pop(0)
        if pulse == 0:
            low += 1
        else:
            high += 1
        if dest not in modules:
            continue
        if memory_to_rx and source in memory_to_rx and pulse == 1:
            if not memory_to_rx[source]:
                memory_to_rx[source] = push_number
        module = modules[dest]
        if module.type == "b":
            next_pulse = pulse
        elif module.type == "f":
            if pulse == 1:
                continue
            module.memory = 1 if module.memory == 0 else 0
            next_pulse = module.memory
        elif module.type == "c":
            module.memory[source] = pulse
            next_pulse = 0 if all(module.memory.values()) else 1
        for output in module.outputs:
            queue.append((dest, next_pulse, output))
    return low, high


def part1():
    modules = read_input()
    init_memory(modules)
    total_low = 0
    total_high = 0
    for _ in range(1000):
        low, high = push_button(modules)
        total_low += low
        total_high += high
    print(f"Total low: {total_low}, total high: {total_high}")
    return total_low * total_high


def part2():
    modules = read_input()
    init_memory(modules)

    for name, module in modules.items():
        if "rx" in module.outputs:
            to_rx = name
    memory_to_rx = {}
    for name, module in modules.items():
        if to_rx in module.outputs:
            memory_to_rx[name] = None
    i = 0
    while True:
        i += 1
        push_button(modules, memory_to_rx, push_number=i)
        if all(memory_to_rx.values()):
            return math.lcm(*memory_to_rx.values())


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
