
import time


def read_input():
    with open("./input.txt", "r") as f:
        return f.read().split("\n\n")


class Condition:
    def __init__(self, variable: str, operator: str, value: int):
        self.variable = variable
        self.operator = operator
        self.value = value

    def __repr__(self) -> str:
        return f"Condition(variable={self.variable}, operator={self.operator}, value={self.value})"


class Rule:
    def __init__(self, conditions: Condition | None, next_state: str):
        self.conditions = conditions
        self.next_state = next_state

    def __repr__(self) -> str:
        return f"Rule(conditions={self.conditions}, next_state={self.next_state})"


class State:
    def __init__(self, name: str, rules: list[Rule]):
        self.name = name
        self.rules = rules

    def __repr__(self) -> str:
        return f"State(name={self.name}, rules={self.rules})"


def calc_next_state(state_machine: dict[str, State], current_state: str, variables: dict[str, int]) -> str:
    state = state_machine[current_state]
    for rule in state.rules:
        if rule.conditions is None:
            return rule.next_state
        condition = rule.conditions
        if condition.operator == ">" and variables[condition.variable] > condition.value:
            return rule.next_state
        elif condition.operator == "<" and variables[condition.variable] < condition.value:
            return rule.next_state
    raise Exception("No valid rule found")


def calc_final_state(state_machine: dict[str, State], variables: dict[str, int]) -> str:
    current_state = "in"
    while current_state != "A" and current_state != "R":
        current_state = calc_next_state(
            state_machine, current_state, variables)
    return current_state


def read_state_machine(states: str) -> dict[str, State]:
    state_machine = {}
    for s in states.split("\n"):
        name, rules_str = s.split("{")
        rules = []
        for rule in rules_str[:-1].split(","):
            if ":" not in rule:
                rules.append(Rule(None, rule))
            else:
                conditions_str, next = rule.split(":")
                variable = conditions_str[0]
                operator = conditions_str[1]
                value = int(conditions_str[2:])
                conditions = Condition(variable, operator, value)
                rules.append(Rule(conditions, next))
        state_machine[name] = State(name, rules)
    return state_machine


def part1():
    states, raw_values = read_input()
    state_machine = read_state_machine(states)

    answer = 0
    for line in raw_values.split("\n"):
        # {x=472,m=796,a=2160,s=343}
        variables = {}
        for var in line[1:-1].split(","):
            name, value = var.split("=")
            variables[name] = int(value)
        final_state = calc_final_state(state_machine, variables)
        if final_state == "A":
            answer += sum(variables.values())
    return answer


def calc_final_state_range(state_machine: dict[str, State], current_state: str, ranges: dict[str, tuple[int, int]]) -> int:
    if current_state == "R":
        return 0
    if current_state == "A":
        # return product of ranges (0,2) (2, 5) -> 2 * 3 = 6
        total = 1
        for r in ranges.values():
            total *= r[1] - r[0]
        return total
    total = 0
    state = state_machine[current_state]
    for rule in state.rules:
        if rule.conditions is None:
            total += calc_final_state_range(state_machine,
                                            rule.next_state, ranges)
            continue
        condition = rule.conditions
        start, stop = ranges[condition.variable]
        if condition.operator == ">":
            match_range = (max(start, condition.value + 1), stop)
            miss_range = (start, min(stop, condition.value + 1))
        else:
            match_range = (start, min(stop, condition.value))
            miss_range = (max(start, condition.value), stop)
        if match_range[0] < match_range[1]:
            next_ranges = dict(ranges)
            next_ranges[condition.variable] = match_range
            total += calc_final_state_range(state_machine,
                                            rule.next_state, next_ranges)
        if miss_range[0] < miss_range[1]:
            ranges[condition.variable] = miss_range
    return total


def part2():
    states, _ = read_input()
    state_machine = read_state_machine(states)
    ranges = {"x": (1, 4001), "m": (1, 4001), "a": (1, 4001), "s": (1, 4001)}
    return calc_final_state_range(state_machine, "in", ranges)


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
