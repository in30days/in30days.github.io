---
title: "The Standard Library Tour"
date: 2024-01-26
day: 26
weight: 26
draft: false
duration: "45 min"
difficulty: "beginner"
description: "Discover the powerful tools that come built-in with every Python installation."
objectives:
  - Understand what the Standard Library is
  - Explore the 'sys' module for system tasks
  - Explore the 'statistics' module
  - Learn about the 'collections' module (Counter)
prerequisites: [25]
tags: ["standard-library", "modules", "basics"]
---

## Batteries Included

Python is often described as having "batteries included". This means that it comes with a large set of pre-written code called the **Standard Library**. You've already used `math`, `random`, and `json`. Today, we look at a few more.

## The `sys` Module

Use this to interact with the Python runtime environment itself.

{{< code-file filename="sys_example.py" lang="python" >}}
import sys

# Get version of Python
print(f"Python Version: {sys.version}")

# Get command line arguments passed to the script
print(f"Arguments: {sys.argv}")
{{< /code-file >}}

## The `statistics` Module

Perfect for simple data analysis without needing complex external tools.

{{< code-file filename="stats.py" lang="python" >}}
import statistics

grades = [85, 90, 70, 95, 88]

print(f"Mean: {statistics.mean(grades)}")
print(f"Median: {statistics.median(grades)}")
{{< /code-file >}}

## The `collections` Module

Provides specialized "container" data types. `Counter` is one of the most useful.

{{< code-file filename="counter.py" lang="python" >}}
from collections import Counter

inventory = ["apple", "banana", "apple", "cherry", "banana", "apple"]

# Count occurrences of items in a list
count = Counter(inventory)
print(count)
# Output: Counter({'apple': 3, 'banana': 2, 'cherry': 1})

print(count["apple"]) # 3
{{< /code-file >}}

## Why learn these?

Knowing what's in the Standard Library prevents you from "reinventing the wheel". Before writing a complex loop to count items or calculate an average, check if Python already has a battery for it!

---

## Interactive Practice

Explore the `time` module. Can you use `time.sleep(2)` to make your program wait for 2 seconds before printing a message?

{{< interactive-table >}}
| Module | Battery For... |
| :--- | :--- |
| **sys** | System paths and arguments |
| **statistics** | Basic math analysis |
| **collections** | Specialized lists/dicts |
| **itertools** | Complex loops and iterations |
{{< /interactive-table >}}

{{< quiz >}}
