import time
import re


def read_input():
    registers = []
    with open("./input.txt", "r") as f:
        lines = f.read().split('\n')
        registers = list(
            map(int, [lines[0][12:], lines[1][12:], lines[2][12:]]))
        program = list(map(int, lines[4][9:].split(',')))
        return registers, program


def get_combo_operand(operand: int, registers: list[int]):
    if 0 <= operand <= 3:
        return operand
    if operand < 7:
        return registers[operand - 4]
    return 'INVALID'


def run_program(program: list[int], registers: list[int], only_first_output=False):
    pointer = 0
    output = []
    while pointer < len(program):
        [opcode, operand] = program[pointer: pointer+2]
        pointer += 2
        match opcode:
            case 0:
                registers[0] = registers[0] // 2 ** get_combo_operand(
                    operand, registers)
            case 1:
                registers[1] = registers[1] ^ operand
            case 2:
                registers[1] = get_combo_operand(operand, registers) % 8
            case 3:
                if registers[0] != 0:
                    pointer = operand
            case 4:
                registers[1] = registers[1] ^ registers[2]
            case 5:
                out = get_combo_operand(operand, registers) % 8
                if only_first_output:
                    return out
                output.append(out)
            case 6:
                registers[1] = registers[0] // 2 ** get_combo_operand(
                    operand, registers)
            case 7:
                registers[2] = registers[0] // 2 ** get_combo_operand(
                    operand, registers)
    return output


def part1():
    registers, program = read_input()
    output = run_program(program, registers)
    return ",".join(list(map(str, output)))


def part2():
    registers, program = read_input()
    result = program.copy()
    value_a = 0
    while result:
        x = result.pop()
        value_a *= 8
        for i in range(8):
            registers[0] = value_a + i
            registers[1] = 0
            registers[2] = 0
            if x == run_program(program, registers, True):
                break
        value_a += i
    return value_a


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
