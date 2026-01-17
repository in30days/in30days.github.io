---
title: "Debugging Your Code"
date: 2024-01-25
module: 25
weight: 25
draft: false
duration: "45 min"
difficulty: "beginner"
description: "Learn how to find and fix bugs like a professional developer."
objectives:
  - Understand common types of bugs
  - Use 'print debugging' effectively
  - Learn basic use of the Python debugger (pdb)
  - Understand the concept of a 'Rubber Duck'
prerequisites: [24]
tags: ["debugging", "best-practices", "basics"]
---

## Solving the Mystery

Bugs are a natural part of programming. A "bug" is just a mistake in your logic that causes the program to behave unexpectedly. Today, we learn the mindset and the tools needed to fix them.

## Type of Bugs

1. **Syntax Errors:** Mistakes in your typing (e.g., `prnit("Hello")`). Python finds these for you.
2. **Runtime Errors:** Mistakes that happen while the app is running (e.g., `1 / 0`).
3. **Logic Errors:** The app runs fine, but the result is wrong (e.g., calculating `price + discount` instead of `price - discount`).

## The Power of `print()`

The simplest way to debug is to "trace" your code by printing variable values at different steps.

{{< code-file filename="debug_print.py" lang="python" >}}
def calculate_total(price, tax):
    print(f"DEBUG: Price is {price}") # Trace point 1
    total = price * tax 
    print(f"DEBUG: Total is {total}") # Trace point 2
    return total

# If tax is 0.10 (10%), why is the total wrong?
calculate_total(100, 0.10) 
{{< /code-file >}}

## Using the Debugger (`pdb`)

Python comes with a built-in debugger called `pdb`. It allows you to **pause** your code and look around.

{{< code-file filename="using_pdb.py" lang="python" >}}
import pdb

x = 10
y = 20

# Pause the program here!
pdb.set_trace() 

z = x + y
print(z)
{{< /code-file >}}

When the program hits `set_trace()`, it stops. You can type variable names (like `x`) to see their values before the next line runs.

## Rubber Duck Debugging

Sometimes, the best way to find a bug is to explain your code line-by-line to an inanimate object (like a rubber duck). As you explain *what you think* the code is doing, you often realize *what it is actually doing*.

---

## Interactive Practice

Imagine a loop that should print numbers 1 to 5 but only prints 1 to 4. Where would you put a `print()` statement to check the loop condition?

{{< mermaid >}}
flowchart TD
    Error[Logic Error Found] --> Think[Think: Where did it start?]
    Think --> Print[Add Print Statements]
    Print --> Run[Run and Inspect Output]
    Run --> Fix[Apply Fix]
    Fix --> Clean[Remove Debug Prints]
{{< /mermaid >}}

{{< quiz >}}
