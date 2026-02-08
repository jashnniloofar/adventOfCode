import time
with open("./input.txt", "r") as f:
    lines = [line.strip() for line in f]

def part1(lines):
    current_point = 50
    password = 0
    for line in lines:
        direction = line[0]
        roation = int(line[1:])
        if direction == 'L':
            current_point -= roation
        else:
            current_point += roation
        current_point = current_point % 100
        password += current_point == 0
    return password


def part2(lines):
    current_point = 50
    password = 0
    for line in lines:
        direction = line[0]
        roation = int(line[1:])
        password += int(roation / 100)
        roation = roation % 100
        if direction == 'L':
            if current_point != 0 and roation >= current_point:
                password +=1
            current_point -= roation
        else:
            current_point += roation
            password+= current_point >= 100
        current_point = current_point % 100
    return password

start = time.time()
answer = part1(lines)
end = time.time()
print(f"Part1: answer is {answer} and running time is: {end - start:.4f} seconds")

start = time.time()
answer = part2(lines)
end = time.time()
print(f"Part2: answer is {answer} and running time is: {end - start:.4f} seconds")