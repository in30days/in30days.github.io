---
title: "Control Flow - If Statements"
date: 2024-01-04
module: 4
weight: 4
draft: false
duration: "45 min"
difficulty: "beginner"
description: "Learn how to make decisions in your code using conditional statements"
objectives:
  - Understand the Boolean logic behind decisions
  - Write if, elif, and else statements
  - Use comparison and logical operators in conditions
  - Understand indentation and block structure in Python
prerequisites: [3]
tags: ["basics", "control-flow", "logic"]
---

## Making Decisions

In the previous lessons, our code ran from top to bottom, executing every line. Real-world programs need to make decisions: "If the user is logged in, show their dashboard; otherwise, show the login screen."

In Python, we use the `if` statement to control the flow of execution.

## The `if` Statement

The simplest form of a conditional is the `if` statement.

{{< code-file filename="age_check.py" lang="python" >}}
age = 18

if age >= 18:
    print("You are an adult.")
{{< /code-file >}}

### How it works:
1. The condition `age >= 18` is evaluated.
2. If it is **True**, the indented block of code below it is executed.
3. If it is **False**, the indented block is skipped.

{{< callout type="warning" title="Indentation Matters!" >}}
Unlike many other languages that use curly braces `{}`, Python uses **indentation** (usually 4 spaces) to define blocks of code. All lines indented at the same level are part of the same block.
{{< /callout >}}

## Adding `else`

What if you want to do something else when the condition is False? Use the `else` statement.

{{< code-file filename="else_example.py" lang="python" >}}
age = 15

if age >= 18:
    print("You can vote.")
else:
    print("You are too young to vote.")
{{< /code-file >}}

## Multiple Conditions with `elif`

When you have more than two possibilities, use `elif` (short for "else if").

{{< code-file filename="grades.py" lang="python" >}}
score = 85

if score >= 90:
    print("Grade: A")
elif score >= 80:
    print("Grade: B")
elif score >= 70:
    print("Grade: C")
else:
    print("Grade: F")
{{< /code-file >}}

Python evaluates these from top to bottom. As soon as one condition is True, its block runs, and the rest are skipped.

## Logical Operators

You can combine multiple conditions using logical operators:

- `and`: True if **both** conditions are True.
- `or`: True if **at least one** condition is True.
- `not`: Inverts the result (True becomes False).

{{< code-file filename="logic.py" lang="python" >}}
has_ticket = True
is_vip = False

if has_ticket or is_vip:
    print("Welcome to the show!")
{{< /code-file >}}

## Nested If Statements

You can place an `if` statement inside another `if` statement.

{{< code-file filename="nested.py" lang="python" >}}
is_weekend = True
is_sunny = True

if is_weekend:
    if is_sunny:
        print("Go to the beach!")
    else:
        print("Watch a movie at home.")
else:
    print("Go to work.")
{{< /code-file >}}

---

## Interactive Practice

Try writing a program that checks if a number is positive, negative, or zero.

{{< mermaid >}}
flowchart TD
    Start([Start]) --> Input[Get Number]
    Input --> IsPos{Number > 0?}
    IsPos -- Yes --> Pos[Print Positive]
    IsPos -- No --> IsNeg{Number < 0?}
    IsNeg -- Yes --> Neg[Print Negative]
    IsNeg -- No --> Zero[Print Zero]
    Pos --> End([End])
    Neg --> End
    Zero --> End
{{< /mermaid >}}

{{< quiz >}}
