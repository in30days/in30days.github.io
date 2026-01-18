---
title: "Introduction to Functions"
date: 2024-01-08
module: 8
weight: 8
draft: false
duration: "45 min"
difficulty: "beginner"
description: "Learn how to write reusable blocks of code using functions"
objectives:
  - Understand the purpose of functions
  - Define and call basic functions
  - Use parameters and arguments
  - Return values from functions
prerequisites: [7]
tags: ["functions", "reusability", "basics"]
---

## Why Functions?

Imagine you are writing a program that greets a user. You might write:

```python
print("Hello, Alice! Welcome to the Python course.")
```

If you have 100 users, you don't want to write that line 100 times. Instead, you create a **Function**.

A function is a reusable block of code that performs a specific task. You define it once, and you can "call" it whenever you need it.

## Defining a Function

In Python, we use the `def` keyword to define a function.

{{< code-file filename="greet.py" lang="python" >}}
def say_hello():
    print("Hello there!")
    print("Welcome to Module 8.")

# Calling the function
say_hello()
say_hello()
{{< /code-file >}}

### Key Rules:
1. Use the `def` keyword.
2. Give the function a name (use lowercase and underscores).
3. Add parentheses `()` and a colon `:`.
4. **Indent** the code block inside the function.

## Parameters and Arguments

Functions become powerful when they can accept information. We use **parameters** to pass data into a function.

{{< code-file filename="params.py" lang="python" >}}
def greet_user(username):
    print(f"Hello, {username}! Ready to code?")

greet_user("Alice")
greet_user("Bob")
{{< /code-file >}}

- `username` is the **parameter** (the variable name inside the function).
- `"Alice"` is the **argument** (the actual value passed in).

## Returning Values

Sometimes you want a function to calculate something and give the result back to you. We use the `return` statement for this.

{{< code-file filename="calc.py" lang="python" >}}
def add_numbers(a, b):
    result = a + b
    return result

sum_total = add_numbers(5, 10)
print(f"The total is: {sum_total}")
{{< /code-file >}}

{{< callout type="info" title="Return vs. Print" >}}
`print()` displays text on the screen. `return` sends data back to the part of the program that called the function, so you can store it in a variable.
{{< /callout >}}

---

## Interactive Practice

Try defining a function called `multiply` that takes two numbers and returns their product.

{{< mermaid >}}
flowchart LR
    Start([Start]) --> Call[Call multiply 4, 5]
    Call --> Func[Function Body: 4 * 5]
    Func --> Return[Return 20]
    Return --> End[Print Result]
{{< /mermaid >}}

{{< quiz >}}
