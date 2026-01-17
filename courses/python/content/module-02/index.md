---
title: "Variables and Data Types"
date: 2024-01-02
module: 2
weight: 2
draft: false
duration: "50 min"
difficulty: "beginner"
description: "Learn how to store and work with different types of data"
objectives:
  - Create and use variables in Python
  - Understand Python's basic data types
  - Convert between different data types
  - Use meaningful variable names
prerequisites: [1]
tags: ["variables", "data-types", "fundamentals"]
---

## What are Variables?

Variables are like labeled containers that store data in your program. Think of them as boxes with names where you can put values.

{{< mermaid >}}
flowchart LR
    subgraph Variables
        A[name] --> |stores| B["'Alice'"]
        C[age] --> |stores| D[25]
        E[is_student] --> |stores| F[True]
    end
{{< /mermaid >}}

## Creating Variables

In Python, you create a variable by simply assigning a value to a name:

{{< code-file filename="variables.py" lang="python" >}}
# Creating variables
name = "Alice"
age = 25
height = 5.6
is_student = True

# Using variables
print(name)        # Output: Alice
print(age)         # Output: 25
{{< /code-file >}}

{{< callout type="info" title="No Declaration Needed" >}}
Unlike some other languages, Python doesn't require you to declare a variable's type. Python figures it out automatically!
{{< /callout >}}

### Variable Naming Rules

{{< interactive-table >}}
| Rule | Valid Examples | Invalid Examples |
|------|----------------|------------------|
| Must start with letter or underscore | `name`, `_count` | `1name`, `@value` |
| Can contain letters, numbers, underscores | `user_1`, `total_sum` | `user-1`, `total.sum` |
| Case-sensitive | `Name` ≠ `name` | - |
| Cannot be Python keywords | `my_class` | `class`, `if`, `for` |
{{< /interactive-table >}}

### Naming Conventions

Python programmers follow these conventions:

{{< code-file filename="naming.py" lang="python" >}}
# Good variable names (snake_case)
first_name = "John"
total_price = 99.99
is_active = True
user_count = 42

# Avoid these styles in Python
firstName = "John"    # This is camelCase (used in other languages)
TOTALITEMS = 10       # ALL CAPS is for constants
x = "John"            # Too short, not descriptive
{{< /code-file >}}

{{< callout type="tip" title="Best Practice" >}}
Use descriptive names that explain what the variable holds. `user_age` is much better than `x` or `ua`.
{{< /callout >}}

## Python Data Types

Python has several built-in data types. Let's explore the most common ones:

{{< mermaid >}}
flowchart TB
    A[Python Data Types] --> B[Numeric]
    A --> C[Text]
    A --> D[Boolean]
    A --> E[None]
    
    B --> F[int - integers]
    B --> G[float - decimals]
    
    C --> H[str - strings]
    
    D --> I[True/False]
{{< /mermaid >}}

### Integers (int)

Whole numbers without decimal points:

{{< code-file filename="integers.py" lang="python" >}}
age = 25
year = 2024
negative_number = -10
large_number = 1_000_000  # Underscores for readability

print(type(age))  # Output: <class 'int'>
{{< /code-file >}}

### Floating-Point Numbers (float)

Numbers with decimal points:

{{< code-file filename="floats.py" lang="python" >}}
price = 19.99
temperature = -3.5
pi = 3.14159
scientific = 1.5e10  # Scientific notation: 15000000000

print(type(price))  # Output: <class 'float'>
{{< /code-file >}}

{{< callout type="warning" title="Float Precision" >}}
Floats can have precision issues. `0.1 + 0.2` equals `0.30000000000000004`, not `0.3`. For financial calculations, use the `decimal` module.
{{< /callout >}}

### Strings (str)

Text data enclosed in quotes:

{{< code-file filename="strings.py" lang="python" >}}
# Single or double quotes work the same
name = 'Alice'
greeting = "Hello, World!"

# Triple quotes for multi-line strings
message = """This is a
multi-line
string."""

# String with quotes inside
quote = "She said 'Hello'"
another = 'He replied "Hi"'

print(type(name))  # Output: <class 'str'>
{{< /code-file >}}

### Booleans (bool)

True or False values:

{{< code-file filename="booleans.py" lang="python" >}}
is_active = True
is_logged_in = False

# Booleans from comparisons
is_adult = age >= 18  # True if age is 18 or more
has_permission = True and is_active

print(type(is_active))  # Output: <class 'bool'>
{{< /code-file >}}

### None Type

Represents the absence of a value:

{{< code-file filename="none.py" lang="python" >}}
result = None  # Variable exists but has no value yet

print(type(result))  # Output: <class 'NoneType'>
{{< /code-file >}}

## Type Checking

Use `type()` to check a variable's type:

{{< code-file filename="type_checking.py" lang="python" >}}
name = "Alice"
age = 25
height = 5.6
is_student = True

print(type(name))       # <class 'str'>
print(type(age))        # <class 'int'>
print(type(height))     # <class 'float'>
print(type(is_student)) # <class 'bool'>
{{< /code-file >}}

## Type Conversion

Convert between types using built-in functions:

{{< code-file filename="type_conversion.py" lang="python" >}}
# String to Integer
age_str = "25"
age_int = int(age_str)
print(age_int + 5)  # Output: 30

# Integer to String
number = 42
number_str = str(number)
print("The answer is " + number_str)

# String to Float
price_str = "19.99"
price_float = float(price_str)
print(price_float * 2)  # Output: 39.98

# Float to Integer (truncates decimal)
temperature = 23.7
temp_int = int(temperature)
print(temp_int)  # Output: 23 (not rounded!)
{{< /code-file >}}

{{< callout type="warning" title="Conversion Errors" >}}
Not all conversions work! `int("hello")` will cause an error because "hello" isn't a valid number.
{{< /callout >}}

### Conversion Reference

{{< interactive-table >}}
| Function | Converts To | Example |
|----------|-------------|---------|
| `int()` | Integer | `int("42")` → `42` |
| `float()` | Float | `float("3.14")` → `3.14` |
| `str()` | String | `str(100)` → `"100"` |
| `bool()` | Boolean | `bool(1)` → `True` |
{{< /interactive-table >}}

## Working with Strings

Strings are one of the most used data types. Here are some common operations:

### String Concatenation

{{< code-file filename="string_concat.py" lang="python" >}}
first_name = "John"
last_name = "Doe"

# Using + operator
full_name = first_name + " " + last_name
print(full_name)  # Output: John Doe

# Using f-strings (recommended!)
greeting = f"Hello, {first_name} {last_name}!"
print(greeting)  # Output: Hello, John Doe!
{{< /code-file >}}

### F-Strings (Formatted String Literals)

{{< code-file filename="fstrings.py" lang="python" >}}
name = "Alice"
age = 25
height = 5.6

# Embed variables directly in strings
message = f"My name is {name}, I'm {age} years old."
print(message)

# You can even do calculations
print(f"In 10 years, I'll be {age + 10}")

# Format numbers
price = 19.999
print(f"Price: ${price:.2f}")  # Output: Price: $19.99
{{< /code-file >}}

{{< callout type="tip" title="Use F-Strings!" >}}
F-strings (introduced in Python 3.6) are the modern way to format strings. They're readable and efficient.
{{< /callout >}}

## Multiple Assignment

Python lets you assign multiple variables at once:

{{< code-file filename="multiple_assignment.py" lang="python" >}}
# Assign same value to multiple variables
x = y = z = 0
print(x, y, z)  # Output: 0 0 0

# Assign different values in one line
name, age, city = "Alice", 25, "New York"
print(name)  # Output: Alice
print(age)   # Output: 25
print(city)  # Output: New York

# Swap variables (Python magic!)
a = 1
b = 2
a, b = b, a
print(a, b)  # Output: 2 1
{{< /code-file >}}

## Summary

Today you learned:

- Variables store data with meaningful names
- Python has several data types: int, float, str, bool, None
- Use `type()` to check data types
- Convert between types with `int()`, `float()`, `str()`, `bool()`
- F-strings are the best way to format strings

{{< progress-check id="day2-summary" >}}I understand variables and data types{{< /progress-check >}}

## Practice Exercise

Try creating these variables:

1. Your name as a string
2. Your age as an integer  
3. Your height in meters as a float
4. Whether you're a student as a boolean
5. Use an f-string to print all information

## Next Steps

Tomorrow, we'll learn about **operators and expressions** - how to perform calculations and make comparisons in Python.

Complete the quiz below to test your knowledge!
