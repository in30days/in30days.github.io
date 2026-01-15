---
title: "List Comprehensions"
date: 2024-01-18
day: 18
weight: 18
draft: false
duration: "45 min"
difficulty: "beginner"
description: "Learn how to create lists in a single, elegant line of code."
objectives:
  - Understand the syntax of List Comprehensions
  - Use conditions inside comprehensions
  - Learn when to use comprehensions vs. traditional for loops
  - Write more 'Pythonic' code
prerequisites: [17]
tags: ["lists", "comprehensions", "basics"]
---

## Writing Pythonic Code

In Python, we often want to create a new list by transforming or filtering another list. You could use a `for` loop for this, but Python offers a more concise and elegant way: **List Comprehensions**.

## Traditional Loop vs. Comprehension

Imagine you want to create a list of square numbers.

### Using a For Loop:
{{< code-file filename="old_way.py" lang="python" >}}
numbers = [1, 2, 3, 4, 5]
squares = []

for n in numbers:
    squares.append(n * n)

print(squares) # [1, 4, 9, 16, 25]
{{< /code-file >}}

### Using a List Comprehension:
{{< code-file filename="new_way.py" lang="python" >}}
numbers = [1, 2, 3, 4, 5]
squares = [n * n for n in numbers]

print(squares) # [1, 4, 9, 16, 25]
{{< /code-file >}}

## The Syntax

`new_list = [expression for item in iterable]`

1. **`expression`**: What you want to do to each item.
2. **`item`**: The temporary variable name.
3. **`iterable`**: The original collection (list, range, etc.).

## Adding a Condition (Filtering)

You can also add an `if` statement to the end to filter items.

{{< code-file filename="filtering.py" lang="python" >}}
numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

# Only include even numbers
evens = [n for n in numbers if n % 2 == 0]

print(evens) # [2, 4, 6, 8, 10]
{{< /code-file >}}

## Why use them?
- **Shorter:** You can do in 1 line what usually takes 3-4.
- **Readable:** Once you're used to them, they are very easy to scan.
- **Performance:** They are slightly faster than manual `.append()` calls.

---

## Interactive Practice

Try writing a comprehension that takes a list of strings and creates a new list with all strings converted to uppercase using `.upper()`.

{{< mermaid >}}
flowchart LR
    List[List: 1, 2, 3] --> Comp["[x*2 for x in List]"]
    Comp --> Result[New List: 2, 4, 6]
{{< /mermaid >}}

{{< quiz >}}
