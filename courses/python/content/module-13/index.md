---
title: "Working with Files"
date: 2024-01-13
module: 13
weight: 13
draft: false
duration: "45 min"
difficulty: "beginner"
description: "Learn how to store data permanently by reading and writing text files"
objectives:
  - Open, read, and close text files
  - Write and append data to files
  - Use the 'with' statement for safe file handling
  - Understand different file modes (r, w, a)
prerequisites: [12]
tags: ["files", "persistence", "basics"]
---

## Persistent Data

Until now, all our data disappeared as soon as the program stopped. To save data for later, we need to use **Files**.

## Opening and Closing Files

Python has a built-in `open()` function. You must always `close()` a file when you are done to free up resources.

{{< code-file filename="manual_file.py" lang="python" >}}
file = open("test.txt", "r") # 'r' means read
content = file.read()
print(content)
file.close() # Don't forget this!
{{< /code-file >}}

## The `with` Statement (Recommended)

Closing files manually is risky—if an error happens, the file might stay open. The `with` statement handles this automatically.

{{< code-file filename="with_example.py" lang="python" >}}
with open("test.txt", "r") as file:
    content = file.read()
    print(content)
# File is automatically closed here!
{{< /code-file >}}

## File Modes

| Mode | Description |
| :--- | :--- |
| **`r`** | **Read** (Default). Error if file doesn't exist. |
| **`w`** | **Write**. Overwrites the file if it exists. Creates it if not. |
| **`a`** | **Append**. Adds to the end of the file. Creates it if not. |
| **`x`** | **Create**. Fails if the file already exists. |

## Writing to a File

{{< code-file filename="writing.py" lang="python" >}}
# Overwriting/Creating
with open("new_file.txt", "w") as f:
    f.write("Hello World!\n")
    f.write("This is a new line.")

# Appending
with open("new_file.txt", "a") as f:
    f.write("\nAdding one more line.")
{{< /code-file >}}

---

## Interactive Practice

Try writing a program that asks for a user's name and saves it to a file called `users.txt`.

{{< mermaid >}}
flowchart LR
    Input[Get User Name] --> Open[Open users.txt in 'a' mode]
    Open --> Write[write name + \n]
    Write --> Close[Close File automatically]
{{< /mermaid >}}

{{< quiz >}}
