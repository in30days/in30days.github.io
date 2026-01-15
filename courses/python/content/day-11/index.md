---
title: "Documentation and Type Hints"
date: 2024-01-11
day: 11
weight: 11
draft: false
duration: "45 min"
difficulty: "beginner"
description: "Learn how to make your code readable for humans and tools"
objectives:
  - Write descriptive Docstrings for your functions
  - Use Type Hints to specify data types
  - Understand why code documentation matters
prerequisites: [10]
tags: ["best-practices", "documentation", "basics"]
---

## Writing Clear Code

Coding isn't just about making the computer do something; it's about telling other humans (including your future self) what your code does. Today we'll learn two essential tools for professional Python developers: **Docstrings** and **Type Hints**.

## Docstrings (Documentation Strings)

A **Docstring** is a special string used as the first statement in a function. It describes what the function does.

{{< code-file filename="docstrings.py" lang="python" >}}
def calculate_area(radius):
    """Calculates and returns the area of a circle."""
    return 3.14 * (radius ** 2)

# You can access a function's docstring like this:
print(calculate_area.__doc__)
{{< /code-file >}}

### Best Practices:
1. Wrap the string in **triple quotes** `"""`.
2. Start with a capital letter and end with a period.
3. Be concise but descriptive.

## Type Hints

Python is a "dynamically typed" language, meaning variables can change types. However, you can add **Type Hints** to suggest what type of data a function should expect and return.

{{< code-file filename="type_hints.py" lang="python" >}}
# name should be a string (str)
# age should be an integer (int)
def greet(name: str, age: int):
    print(f"Hello {name}, you are {age} years old.")

# Return types are indicated with ->
def add(x: int, y: int) -> int:
    return x + y
{{< /code-file >}}

### Why use them?
- **Clarity:** It's easier to see how to use a function.
- **Tooling:** Code editors (like VS Code) can show you warnings if you pass the wrong type.
- **Auto-complete:** Helps your editor suggest correct methods.

## Bringing it Together

Professional Python code usually combines both:

{{< code-file filename="pro_example.py" lang="python" >}}
def get_discounted_price(price: float, discount: float) -> float:
    """Calculates the final price after applying a percentage discount."""
    return price * (1 - discount)
{{< /code-file >}}

---

## Interactive Practice

Try writing a function `is_even` that takes an integer and returns a boolean. Add a docstring and type hints!

{{< interactive-table >}}
| Feature | Docstring | Type Hint |
| :--- | :--- | :--- |
| Purpose | Explain logic/use | Specify data types |
| Syntax | `""" description """` | `name: type` and `-> type` |
| Execution | Ignored by Python | Ignored by Python |
{{< /interactive-table >}}

{{< quiz >}}
