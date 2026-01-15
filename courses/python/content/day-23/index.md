---
title: "The File System (OS & Pathlib)"
date: 2024-01-23
day: 23
weight: 23
draft: false
duration: "45 min"
difficulty: "beginner"
description: "Learn how to interact with your operating system to manage files and directories."
objectives:
  - Understand the role of the OS module
  - Manage directories (create, list, delete)
  - Work with paths using pathlib
  - Build scripts that automate file management
prerequisites: [22]
tags: ["os", "pathlib", "automation", "basics"]
---

## Communicating with the OS

So far, we've only modified data *inside* our scripts. But Python is world-famous for **Automation**. To automate tasks, we need to interact with the Operating System (OS).

## The `os` Module

The classic module for interacting with files and folders.

{{< code-file filename="os_examples.py" lang="python" >}}
import os

# Get current directory
print(f"Current folder: {os.getcwd()}")

# List files in the current folder
print(f"Files: {os.listdir('.')}")

# Create a new folder
if not os.path.exists("my_backup"):
    os.mkdir("my_backup")
{{< /code-file >}}

## The `pathlib` Module (Modern Way)

While `os` is powerful, the newer `pathlib` module treats paths as objects, making them much easier and safer to use.

{{< code-file filename="pathlib_examples.py" lang="python" >}}
from pathlib import Path

# Create a path object
current_path = Path.cwd()
print(current_path)

# Creating a reference to a specific file
my_file = Path("data.txt")

# Check properties
print(f"Exists? {my_file.exists()}")
print(f"Filename: {my_file.name}")
print(f"Extension: {my_file.suffix}")

# Read content without using 'open'
if my_file.exists():
    content = my_file.read_text()
    print(content)
{{< /code-file >}}

## Automation Task

Professional developers often use these modules to organize thousands of files at once (e.g., "Move all .jpg files to a folder called Photos").

---

## Interactive Practice

Try writing a script that creates a folder called `Project_Data` and then creates a blank file inside it called `log.txt`.

{{< interactive-table >}}
| Task | OS Module | Pathlib |
| :--- | :--- | :--- |
| Get CWD | `os.getcwd()` | `Path.cwd()` |
| Join Path | `os.path.join(a, b)` | `a / b` |
| Create Dir | `os.mkdir('x')` | `Path('x').mkdir()` |
{{< /interactive-table >}}

{{< quiz >}}
