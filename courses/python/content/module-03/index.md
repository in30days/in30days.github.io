---
title: "Operators and Expressions"
date: 2024-01-03
module: 3
weight: 3
draft: false
duration: "45 min"
difficulty: "beginner"
description: "Master arithmetic, comparison, and logical operators"
objectives:
  - Use arithmetic operators for calculations
  - Compare values with comparison operators
  - Combine conditions with logical operators
  - Understand operator precedence
prerequisites: [1, 2]
tags: ["operators", "expressions", "comparisons"]
---

## What are Operators?

Operators are special symbols that perform operations on values (operands). Python supports several types of operators:

{{< mermaid >}}
flowchart TB
    A[Python Operators] --> B[Arithmetic]
    A --> C[Comparison]
    A --> D[Logical]
    A --> E[Assignment]
    
    B --> B1[+ - * / // % **]
    C --> C1[== != < > <= >=]
    D --> D1[and or not]
    E --> E1[= += -= *= /=]
{{< /mermaid >}}

## Arithmetic Operators

Use these for mathematical calculations:

{{< interactive-table >}}
| Operator | Name | Example | Result |
|----------|------|---------|--------|
| `+` | Addition | `5 + 3` | `8` |
| `-` | Subtraction | `10 - 4` | `6` |
| `*` | Multiplication | `6 * 7` | `42` |
| `/` | Division | `15 / 4` | `3.75` |
| `//` | Floor Division | `15 // 4` | `3` |
| `%` | Modulus (Remainder) | `17 % 5` | `2` |
| `**` | Exponentiation | `2 ** 3` | `8` |
{{< /interactive-table >}}

### Examples in Action

{{< code-file filename="arithmetic.py" lang="python" >}}
# Basic arithmetic
a = 10
b = 3

print(f"Addition: {a} + {b} = {a + b}")         # 13
print(f"Subtraction: {a} - {b} = {a - b}")      # 7
print(f"Multiplication: {a} * {b} = {a * b}")   # 30
print(f"Division: {a} / {b} = {a / b}")         # 3.333...
print(f"Floor Division: {a} // {b} = {a // b}") # 3
print(f"Modulus: {a} % {b} = {a % b}")          # 1
print(f"Exponent: {a} ** {b} = {a ** b}")       # 1000
{{< /code-file >}}

### Division Types Explained

{{< mermaid >}}
flowchart LR
    A["15 / 4"] --> B["3.75"]
    C["15 // 4"] --> D["3"]
    E["15 % 4"] --> F["3"]
    
    A -.- G["Regular division\n(always float)"]
    C -.- H["Floor division\n(integer part)"]
    E -.- I["Modulus\n(remainder)"]
{{< /mermaid >}}

{{< code-file filename="division.py" lang="python" >}}
# Division returns a float
result = 10 / 3
print(result)       # 3.333...
print(type(result)) # <class 'float'>

# Floor division returns an integer (rounded down)
floor_result = 10 // 3
print(floor_result) # 3

# Modulus returns the remainder
remainder = 10 % 3
print(remainder)    # 1 (because 10 = 3*3 + 1)
{{< /code-file >}}

{{< callout type="tip" title="Practical Uses" >}}
**Floor division** is useful for integer calculations like dividing items into groups.
**Modulus** helps check if a number is even/odd (`n % 2 == 0` means even) or for wrapping values.
{{< /callout >}}

## Comparison Operators

These compare values and return `True` or `False`:

{{< interactive-table >}}
| Operator | Name | Example | Result |
|----------|------|---------|--------|
| `==` | Equal to | `5 == 5` | `True` |
| `!=` | Not equal to | `5 != 3` | `True` |
| `>` | Greater than | `7 > 3` | `True` |
| `<` | Less than | `2 < 8` | `True` |
| `>=` | Greater than or equal | `5 >= 5` | `True` |
| `<=` | Less than or equal | `4 <= 3` | `False` |
{{< /interactive-table >}}

{{< callout type="warning" title="Common Mistake" >}}
Don't confuse `=` (assignment) with `==` (comparison)!
- `x = 5` assigns the value 5 to x
- `x == 5` checks if x equals 5
{{< /callout >}}

### Examples

{{< code-file filename="comparison.py" lang="python" >}}
age = 25
min_age = 18
max_age = 65

# Comparisons
print(age == 25)      # True
print(age != 30)      # True
print(age > min_age)  # True
print(age < max_age)  # True
print(age >= 25)      # True
print(age <= 24)      # False

# Comparing strings (alphabetical order)
print("apple" < "banana")  # True
print("A" < "a")           # True (uppercase comes first)
{{< /code-file >}}

### Chained Comparisons

Python allows elegant chained comparisons:

{{< code-file filename="chained.py" lang="python" >}}
age = 25

# Instead of: age >= 18 and age <= 65
# You can write:
print(18 <= age <= 65)  # True

# This also works
x = 5
print(1 < x < 10)       # True
print(1 < x < 3)        # False
{{< /code-file >}}

## Logical Operators

Combine multiple conditions:

{{< interactive-table >}}
| Operator | Description | Example | Result |
|----------|-------------|---------|--------|
| `and` | Both must be True | `True and False` | `False` |
| `or` | At least one True | `True or False` | `True` |
| `not` | Inverts the value | `not True` | `False` |
{{< /interactive-table >}}

### Truth Tables

{{< mermaid >}}
flowchart TB
    subgraph AND["and"]
        A1["True and True"] --> B1["True"]
        A2["True and False"] --> B2["False"]
        A3["False and True"] --> B3["False"]
        A4["False and False"] --> B4["False"]
    end
    
    subgraph OR["or"]
        C1["True or True"] --> D1["True"]
        C2["True or False"] --> D2["True"]
        C3["False or True"] --> D3["True"]
        C4["False or False"] --> D4["False"]
    end
{{< /mermaid >}}

### Practical Examples

{{< code-file filename="logical.py" lang="python" >}}
age = 25
has_license = True
is_insured = False

# AND: Both conditions must be true
can_drive = age >= 18 and has_license
print(f"Can drive: {can_drive}")  # True

# OR: At least one condition must be true
can_rent_car = age >= 25 or has_license
print(f"Can rent car: {can_rent_car}")  # True

# NOT: Inverts the condition
needs_insurance = not is_insured
print(f"Needs insurance: {needs_insurance}")  # True

# Complex conditions
can_work = age >= 18 and (has_license or is_insured)
print(f"Can work: {can_work}")  # True
{{< /code-file >}}

{{< callout type="info" title="Short-Circuit Evaluation" >}}
Python is smart! With `and`, if the first condition is False, it doesn't check the second. With `or`, if the first is True, it doesn't check the second.
{{< /callout >}}

## Assignment Operators

Shorthand for updating variables:

{{< interactive-table >}}
| Operator | Example | Equivalent To |
|----------|---------|---------------|
| `=` | `x = 5` | `x = 5` |
| `+=` | `x += 3` | `x = x + 3` |
| `-=` | `x -= 2` | `x = x - 2` |
| `*=` | `x *= 4` | `x = x * 4` |
| `/=` | `x /= 2` | `x = x / 2` |
| `//=` | `x //= 3` | `x = x // 3` |
| `%=` | `x %= 2` | `x = x % 2` |
| `**=` | `x **= 2` | `x = x ** 2` |
{{< /interactive-table >}}

{{< code-file filename="assignment.py" lang="python" >}}
score = 0

# Increment
score += 10
print(score)  # 10

# Multiply
score *= 2
print(score)  # 20

# Subtract
score -= 5
print(score)  # 15

# This is cleaner than:
# score = score + 10
# score = score * 2
# score = score - 5
{{< /code-file >}}

## Operator Precedence

When multiple operators are in one expression, Python follows this order:

{{< mermaid >}}
flowchart TB
    A["Highest Priority"] --> B["()  Parentheses"]
    B --> C["**  Exponentiation"]
    C --> D["* / // %  Multiplication/Division"]
    D --> E["+ -  Addition/Subtraction"]
    E --> F["< > <= >= == !=  Comparisons"]
    F --> G["not  Logical NOT"]
    G --> H["and  Logical AND"]
    H --> I["or  Logical OR"]
    I --> J["Lowest Priority"]
{{< /mermaid >}}

### Examples

{{< code-file filename="precedence.py" lang="python" >}}
# Without parentheses
result = 2 + 3 * 4
print(result)  # 14 (not 20!)
# Python does: 2 + (3 * 4) = 2 + 12 = 14

# With parentheses to change order
result = (2 + 3) * 4
print(result)  # 20

# Complex expression
x = 10
y = 5
z = 2

result = x + y * z ** 2  # x + (y * (z ** 2))
print(result)  # 10 + (5 * 4) = 10 + 20 = 30

# Boolean precedence
a = True
b = False
c = True

result = a or b and c  # a or (b and c)
print(result)  # True (because 'and' before 'or')
{{< /code-file >}}

{{< callout type="tip" title="When in Doubt, Use Parentheses!" >}}
Parentheses make your code clearer and ensure the order you want. `(a + b) * c` is easier to understand than relying on precedence rules.
{{< /callout >}}

## Practical Example: Calculator

Let's build a simple calculator:

{{< code-file filename="calculator.py" lang="python" >}}
# Simple calculator
num1 = 15
num2 = 4

print("Calculator Results")
print("=" * 30)
print(f"{num1} + {num2} = {num1 + num2}")
print(f"{num1} - {num2} = {num1 - num2}")
print(f"{num1} * {num2} = {num1 * num2}")
print(f"{num1} / {num2} = {num1 / num2:.2f}")
print(f"{num1} // {num2} = {num1 // num2}")
print(f"{num1} % {num2} = {num1 % num2}")
print(f"{num1} ** {num2} = {num1 ** num2}")
{{< /code-file >}}

## Summary

Today you learned:

- **Arithmetic operators**: `+`, `-`, `*`, `/`, `//`, `%`, `**`
- **Comparison operators**: `==`, `!=`, `>`, `<`, `>=`, `<=`
- **Logical operators**: `and`, `or`, `not`
- **Assignment operators**: `=`, `+=`, `-=`, `*=`, `/=`
- **Operator precedence**: Parentheses first, then exponents, then multiplication/division, then addition/subtraction

{{< progress-check id="day3-summary" >}}I understand Python operators{{< /progress-check >}}

## Practice Exercise

Calculate and print:
1. The area of a rectangle (width=5, height=3)
2. Whether a number is even (hint: use modulus)
3. Whether a person can vote (age >= 18) AND is a citizen
4. The result of `2 + 3 * 4 - 1` and explain why

## Next Steps

Tomorrow, we'll learn about **control flow** - how to make decisions in your code with `if`, `elif`, and `else` statements.

Complete the quiz below to unlock Day 4!
