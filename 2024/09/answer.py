import time


def read_input():
    files = []
    free_spaces = []
    with open("./input.txt", "r") as f:
        disk_map = f.readline()
        is_file = True
        file_index = 0
        memory_index = 0
        for ch in disk_map:
            if is_file:
                files.append((file_index, memory_index, int(ch)))
                file_index += 1
            else:
                if int(ch) > 0:
                    free_spaces.append((memory_index, int(ch)))
            memory_index += int(ch)
            is_file = not is_file
        return files, free_spaces, memory_index


def part1():
    files, free_spaces, len_memory = read_input()
    memory = [-1] * len_memory
    for file_id, start, file_len in files:
        for i in range(file_len):
            memory[start+i] = file_id
    tail = 0
    head = len(memory) - 1
    while head > tail:
        while memory[head] < 0:
            head -= 1
        while head > tail and memory[tail] >= 0:
            tail += 1
        if head > tail:
            memory[tail] = memory[head]
            memory[head] = -1
    answer = 0
    for i in range(head+1):
        answer += i * memory[i]
    return answer


def part2():
    files, free_spaces, len_memory = read_input()
    files_after_move = []
    while len(files) > 0:
        file_id, file_start, file_len = files.pop()
        for space_index in range(len(free_spaces)):
            space_start, space_len = free_spaces[space_index]
            if space_start > file_start:
                break
            if space_len >= file_len:
                free_spaces[space_index] = (
                    space_start + file_len, space_len - file_len)
                file_start = space_start
                break
        files_after_move.append((file_id, file_start, file_len))
    answer = 0
    for file_id, file_start, file_len in files_after_move:
        answer += (2 * file_start + file_len - 1) * file_len / 2 * file_id
    return answer

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
