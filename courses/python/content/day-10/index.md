---
title: "Lambda Functions"
date: 2024-01-10
day: 10
weight: 10
draft: false
duration: "45 min"
difficulty: "beginner"
description: "Learn how to write small, anonymous functions in a single line"
objectives:
  - Understand what an anonymous function is
  - Write basic 'lambda' functions
  - Learn when to use lambda vs. regular functions
prerequisites: [9]
tags: ["lambda", "functions", "basics"]
---

## Anonymous Functions

Sometimes you need a small function for a short period of time, and you don't even want to give it a name using `def`. These are called **Anonymous Functions**, and in Python, we create them using the `lambda` keyword.

## The Lambda Syntax

The syntax for a lambda function is:
`lambda arguments : expression`

{{< code-file filename="lambda_basic.py" lang="python" >}}
# A regular function
def add_ten(x):
    return x + 10

# The same function as a lambda
add_ten_lambda = lambda x : x + 10

print(add_ten(5))
print(add_ten_lambda(5))
{{< /code-file >}}

### Characteristics:
1. It can take any number of arguments.
2. It can only have **one** expression.
3. It automatically **returns** the result of that expression.

## Why use Lambda?

Lambdas are most useful when passed as an argument to another function.

### Example: Custom Sorting

Imagine you have a list of tuples representing students and their scores, and you want to sort them by score.

{{< code-file filename="lambda_sort.py" lang="python" >}}
students = [("Alice", 85), ("Bob", 75), ("Charlie", 95)]

# Sort by the second item in each tuple (the score)
students.sort(key=lambda student: student[1])

print(students)
{{< /code-file >}}

## Lambda vs. Def

| Feature | `def` | `lambda` |
| :--- | :--- | :--- |
| Name | Required | Anonymous |
| Body | Multiple lines | Single expression |
| Use Case | Complex logic | Simple, one-time tasks |
| Reusability | High | Low |

{{< callout type="info" title="Readability First" >}}
If your lambda expression is getting long or complex, it's always better to use a regular `def` function. Code is read more often than it is written!
{{< /callout >}}

---

## Interactive Practice

Try writing a lambda function that takes one number and returns its square (number multiplied by itself).

{{< mermaid >}}
flowchart LR
    Input[Input: 5] --> Lambda[lambda x: x*x]
    Lambda --> Output[Output: 25]
{{< /mermaid >}}

{{< quiz >}}
