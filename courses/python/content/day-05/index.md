---
title: "Control Flow - Loops"
date: 2024-01-05
day: 5
weight: 5
draft: false
duration: "45 min"
difficulty: "beginner"
description: "Learn how to repeat actions in your code using for and while loops"
objectives:
  - Understand why we use loops
  - Write 'while' loops for conditional repetition
  - Write 'for' loops to iterate over sequences
  - Use 'break' and 'continue' to control loop execution
  - Understand the 'range()' function
prerequisites: [4]
tags: ["basics", "control-flow", "loops"]
---

## Repeating Actions

If you want to print "Hello" 10 times, you could write `print("Hello")` ten times, but that's inefficient. Instead, we use **loops**.

Python provides two main types of loops: `for` loops and `while` loops.

## The `while` Loop

A `while` loop repeats a block of code as long as a condition is **True**.

{{< code-file filename="while_loop.py" lang="python" >}}
count = 1

while count <= 5:
    print(f"Number {count}")
    count += 1  # Important: change the variable used in the condition!
{{< /code-file >}}

{{< callout type="warning" title="Infinite Loops" >}}
If the condition never becomes False, the loop will run forever! This is called an **infinite loop**. Always ensure your loop has a way to finish.
{{< /callout >}}

## The `for` Loop

A `for` loop is used to iterate over a sequence (like a list, a string, or a range of numbers).

### Using `range()`

The `range()` function generates a sequence of numbers.

{{< code-file filename="for_range.py" lang="python" >}}
for i in range(5):
    print(f"Iteration {i}")
{{< /code-file >}}

- `range(5)` gives numbers: 0, 1, 2, 3, 4.
- `range(1, 6)` gives numbers: 1, 2, 3, 4, 5.
- `range(0, 10, 2)` gives even numbers: 0, 2, 4, 6, 8 (step of 2).

## Loop Control: `break` and `continue`

Sometimes you need to exit a loop early or skip an iteration.

- **`break`**: Exits the loop immediately.
- **`continue`**: Skips the rest of the current block and starts the next iteration.

{{< code-file filename="control.py" lang="python" >}}
for i in range(10):
    if i == 3:
        continue  # Skip 3
    if i == 7:
        break     # Stop at 7
    print(i)
{{< /code-file >}}

---

## Interactive Practice

Try writing a loop that calculates the sum of all numbers from 1 to 100.

{{< mermaid >}}
flowchart TD
    Start([Start]) --> Init[Sum = 0, i = 1]
    Init --> Check{i <= 100?}
    Check -- Yes --> Add[Sum = Sum + i]
    Add --> Inc[i = i + 1]
    Inc --> Check
    Check -- No --> Print[Print Sum]
    Print --> End([End])
{{< /mermaid >}}

{{< quiz >}}
