---
title: "Variable Scope"
date: 2024-01-09
module: 9
weight: 9
draft: false
duration: "45 min"
difficulty: "beginner"
description: "Understand where your variables live and how to access them"
objectives:
  - Understand the difference between Local and Global scope
  - Learn how to use the 'global' keyword
  - Avoid common pitfalls with naming variables
prerequisites: [8]
tags: ["scope", "functions", "basics"]
---

## Where does a variable live?

In Python, not all variables are accessible from everywhere in your code. The region where a variable is defined and can be accessed is called its **Scope**.

## Local Scope

A variable created **inside** a function belongs to the **local scope** of that function. It only exists while the function is running.

{{< code-file filename="local_scope.py" lang="python" >}}
def my_function():
    x = 10  # Local variable
    print(x)

my_function()
# print(x) # ERROR! x is not defined outside the function
{{< /code-file >}}

## Global Scope

A variable created in the **main body** of a Python file is a **global variable** and belongs to the global scope. Global variables are available from within any scope, next to global or local.

{{< code-file filename="global_scope.py" lang="python" >}}
x = 300 # Global variable

def my_function():
    print(x) # Accessing global variable

my_function()
print(x)
{{< /code-file >}}

## Naming Conflicts

If you operate with the same variable name inside and outside of a function, Python will treat them as two separate variables: one local and one global.

{{< code-file filename="conflicts.py" lang="python" >}}
x = 50

def my_function():
    x = 20 # This creates a NEW local variable x
    print(f"Local x: {x}")

my_function()
print(f"Global x: {x}")
{{< /code-file >}}

## The `global` Keyword

If you need to **modify** a global variable from inside a function, you must use the `global` keyword.

{{< code-file filename="global_keyword.py" lang="python" >}}
count = 0

def increment():
    global count
    count += 1
    print(f"Internal count: {count}")

increment()
print(f"External count: {count}")
{{< /code-file >}}

{{< callout type="warning" title="Use Global Sparingly" >}}
Relying too much on global variables can make your code harder to debug and understand. It's usually better to pass values into functions using parameters and get results back using `return`.
{{< /callout >}}

---

## Interactive Practice

Think about a video game. The `player_score` might be global, but a `bonus_points` variable inside a "calculate_level_end" function should probably be local.

{{< mermaid >}}
flowchart TD
    Global[Global Scope: level_name, player_name]
    Global --> Function[Function Scope: enemy_hp, time_left]
    Function --> Hidden[Cannot see Global level_name?]
    Hidden -- No --> Access[Function CAN see Global]
    Global -- Can see Function items? --> No[No, Global CANNOT see local items]
{{< /mermaid >}}

{{< quiz >}}
