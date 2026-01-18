---
title: "Introduction to Python"
date: 2024-01-01
module: 1
weight: 1
draft: false
duration: "45 min"
difficulty: "beginner"
description: "Learn what Python is and set up your development environment"
objectives:
  - Understand what Python is and why it's popular
  - Install Python on your computer
  - Write and run your first Python program
  - Use the Python REPL for interactive coding
prerequisites: []
tags: ["basics", "setup", "hello-world"]
---

## What is Python?

Python is a high-level, interpreted programming language created by Guido van Rossum and first released in 1991. It's known for its clean syntax and readability, making it an excellent choice for beginners.

{{< callout type="info" title="Fun Fact" >}}
Python is named after the British comedy group Monty Python, not the snake!
{{< /callout >}}

### Why Learn Python?

Python is one of the most popular programming languages in the world. Here's why:

{{< mermaid >}}
mindmap
  root((Python))
    Easy to Learn
      Clean syntax
      Readable code
      Great for beginners
    Versatile
      Web development
      Data science
      Machine learning
      Automation
    Large Community
      Lots of libraries
      Great documentation
      Active support
    Career Opportunities
      High demand
      Good salaries
      Remote work
{{< /mermaid >}}

### Python's Key Features

{{< interactive-table >}}
| Feature | Description |
|---------|-------------|
| Interpreted | Code runs line by line, no compilation needed |
| Dynamically Typed | No need to declare variable types |
| High-Level | Abstracts complex details from the programmer |
| Object-Oriented | Supports classes and objects |
| Cross-Platform | Runs on Windows, macOS, and Linux |
| Extensive Libraries | Thousands of packages available |
{{< /interactive-table >}}

## Setting Up Your Environment

Let's get Python installed on your computer.

{{< video id="YYXdXT2l-Gg" title="Python Installation Guide" >}}

### Step 1: Download Python

1. Go to [python.org](https://www.python.org/downloads/)
2. Click the "Download Python" button
3. The website will detect your operating system automatically

{{< callout type="warning" title="Windows Users" >}}
Make sure to check the box that says **"Add Python to PATH"** during installation. This is very important!
{{< /callout >}}

### Step 2: Verify Installation

Open your terminal (Command Prompt on Windows, Terminal on macOS/Linux) and type:

{{< code-file filename="terminal" lang="bash" >}}
python --version
{{< /code-file >}}

You should see something like:

```
Python 3.12.0
```

{{< callout type="tip" title="Troubleshooting" >}}
If you see an error, try `python3 --version` instead. On some systems, Python 3 is accessed with the `python3` command.
{{< /callout >}}

## Your First Python Program

Let's write the classic "Hello, World!" program.

### Using the Interactive Shell (REPL)

The REPL (Read-Eval-Print Loop) lets you run Python code interactively:

1. Open your terminal
2. Type `python` (or `python3`) and press Enter
3. You'll see the Python prompt `>>>`

Now type:

{{< code-file filename="python-repl" lang="python" >}}
print("Hello, World!")
{{< /code-file >}}

Press Enter, and you'll see:

```
Hello, World!
```

Congratulations! You've just run your first Python code!

### Creating a Python File

For longer programs, we write code in files with the `.py` extension.

1. Create a new file called `hello.py`
2. Add this code:

{{< code-file filename="hello.py" lang="python" >}}
# My first Python program
print("Hello, World!")
print("Welcome to Python in 30 Days!")
{{< /code-file >}}

3. Run it from the terminal:

```bash
python hello.py
```

### Understanding the Code

Let's break down what we wrote:

{{< mermaid >}}
flowchart LR
    A["print()"] --> B["Function that outputs text"]
    C["'Hello, World!'"] --> D["String - text in quotes"]
    E["# Comment"] --> F["Ignored by Python"]
{{< /mermaid >}}

- `print()` is a **function** - it performs an action (displaying text)
- Text inside quotes is called a **string**
- Lines starting with `#` are **comments** - notes for humans that Python ignores

## The Python REPL

The REPL is perfect for experimenting with Python:

{{< code-file filename="python-repl" lang="python" >}}
>>> 2 + 2
4
>>> "Hello" + " " + "World"
'Hello World'
>>> len("Python")
6
{{< /code-file >}}

### Useful REPL Commands

{{< interactive-table >}}
| Command | Description |
|---------|-------------|
| `help()` | Access Python's help system |
| `exit()` | Exit the REPL |
| `dir()` | List available names/functions |
| `type(x)` | Check the type of x |
{{< /interactive-table >}}

## Choosing a Code Editor

While you can write Python in any text editor, these make coding easier:

1. **VS Code** (Recommended) - Free, powerful, lots of extensions
2. **PyCharm** - Professional Python IDE
3. **Sublime Text** - Fast and lightweight
4. **IDLE** - Comes with Python, good for beginners

{{< callout type="tip" title="Recommendation" >}}
We recommend **Visual Studio Code** with the Python extension. It's free, works on all platforms, and provides excellent Python support.
{{< /callout >}}

## Summary

Today you learned:

- Python is a versatile, beginner-friendly language
- How to install Python on your computer
- How to write and run Python code
- How to use the Python REPL

{{< progress-check id="day1-summary" >}}I've installed Python and can run code{{< /progress-check >}}

## Next Steps

Tomorrow, we'll dive into **variables and data types** - the building blocks of any Python program.

Now, complete the quiz below to test your knowledge and unlock Module 2!
