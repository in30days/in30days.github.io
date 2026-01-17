---
title: "Error and Exception Handling"
date: 2024-01-12
module: 12
weight: 12
draft: false
duration: "45 min"
difficulty: "beginner"
description: "Learn how to handle mistakes and crashes gracefully in your code"
objectives:
  - Understand the difference between Syntax Errors and Exceptions
  - Use try and except blocks to handle errors
  - Use the finally block for cleanup tasks
  - Prevent your program from crashing on unexpected input
prerequisites: [11]
tags: ["exceptions", "error-handling", "basics"]
---

## When things go wrong

No matter how good a programmer you are, things will go wrong. A user might enter a string when you expected a number, or your code might try to open a file that doesn't exist.

Without error handling, your program will "crash" (stop immediately and show an ugly error message). Today, we learn how to handle these mistakes gracefully.

## Syntax Errors vs. Exceptions

- **Syntax Errors:** These are "typos" in your code. Python won't even start running the program. (e.g., forgetting a colon).
- **Exceptions:** These occur while the program is **running**. The code is valid, but an operation failed. (e.g., dividing by zero).

## The `try...except` Block

In Python, we handle exceptions using the `try` and `except` keywords.

{{< code-file filename="try_except.py" lang="python" >}}
try:
    number = int(input("Enter a number: "))
    result = 10 / number
    print(f"Result is {result}")
except ZeroDivisionError:
    print("Error: You cannot divide by zero!")
except ValueError:
    print("Error: That wasn't a valid number.")
{{< /code-file >}}

### How it works:
1. Python tries to run the code in the `try` block.
2. If an error occurs, it jumps to the `except` block that matches that error type.
3. If no error occurs, the `except` blocks are skipped.

## The `finally` Block

The `finally` block runs **no matter what**, whether an error occurred or not. It is typically used for "cleanup" (like closing a database connection).

{{< code-file filename="finally_example.py" lang="python" >}}
try:
    print("Connecting to database...")
    # Code that might fail
except:
    print("An error occurred.")
finally:
    print("Closing database connection.") # Always runs!
{{< /code-file >}}

## Handling "Any" Error

If you don't know exactly what error might happen, you can use a generic `except`:

```python
try:
    # risky code
except Exception as e:
    print(f"Something went wrong: {e}")
```

---

## Interactive Practice

Imagine a calculator app. If a user tries to divide by zero, instead of crashing, the app should show a friendly "Oops!" message.

{{< mermaid >}}
flowchart TD
    Start([Start]) --> Try[Try Operation]
    Try -- Error? --> Except[Except Block: Print Friendy Error]
    Try -- No Error --> Success[Print Result]
    Except --> End([End])
    Success --> End
{{< /mermaid >}}

{{< quiz >}}
