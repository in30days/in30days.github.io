---
title: "The Art of Clean Code"
date: 2024-01-29
day: 29
weight: 29
draft: false
duration: "45 min"
difficulty: "beginner"
description: "Learn the official style guide for Python and how to write professional-quality code."
objectives:
  - Understand the PEP 8 style guide
  - Learn professional naming conventions
  - Practice writing readable and maintainable code
  - Understand why code consistency matters in teams
prerequisites: [28]
tags: ["pep8", "best-practices", "basics"]
---

## Making Your Code Shine

You can write code that works, but is it **Professional**? In Python, we have an official style guide called **PEP 8**. Following these rules makes your code easier for others to read and easier for you to maintain.

## Key PEP 8 Rules

### 1. Naming Conventions
- **Variables & Functions:** Use `snake_case` (lowercase with underscores).
- **Classes:** Use `PascalCase` (Capitalize every word).
- **Constants:** Use `UPPERCASE_WITH_UNDERSCORES`.

### 2. Indentation & Spacing
- Always use **4 spaces** for indentation.
- Surround top-level functions and classes with **two blank lines**.
- Use **one blank line** between methods inside a class.

### 3. Maximum Line Length
Limit all lines to a maximum of **79 characters**. This ensures code can be read easily on small screens or in side-by-side windows.

## The Zen of Python

Python has a set of guiding principles. You can see them by running `import this` in any Python terminal.

> "Simple is better than complex."
> "Readability counts."
> "Beautiful is better than ugly."

## Professional Tooling

Pro developers don't memorize every rule; they use tools called **Linters** (like `flake8` or `pylint`) and **Formatters** (like `Black`) that automatically check and fix their code style.

---

## Interactive Practice

Which of these is more "Pythonic"?
1. `def calculateArea(r): return 3.14*r**2`
2. `def calculate_area(radius): return 3.14 * (radius ** 2)`

{{< interactive-table >}}
| Entity | Style | Example |
| :--- | :--- | :--- |
| Variable | snake_case | `user_id` |
| Function | snake_case | `get_data()` |
| Class | PascalCase | `UserManager` |
| Constant | ALL_CAPS | `MAX_VALUE` |
{{< /interactive-table >}}

{{< quiz >}}
