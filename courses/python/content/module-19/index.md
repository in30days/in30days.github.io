---
title: "Nested Data Structures"
date: 2024-01-19
module: 19
weight: 19
draft: false
duration: "45 min"
difficulty: "beginner"
description: "Learn how to combine lists and dictionaries to model complex real-world data."
objectives:
  - Create and access data in nested lists
  - Work with lists of dictionaries
  - Understand how to model complex information
  - Iterate through multi-level structures
prerequisites: [18]
tags: ["data-structures", "nesting", "basics"]
---

## Modeling the Real World

In simple programs, a list of names is enough. But what if you are building an app for a school? You need to store students, and for each student, you need their name, age, and a list of their grades.

To handle this, we **nest** data structures inside each other.

## Lists of Dictionaries

This is the most common way to store a "database" of items in Python.

{{< code-file filename="students.py" lang="python" >}}
students = [
    {"name": "Alice", "age": 20, "grades": [85, 90, 88]},
    {"name": "Bob", "age": 22, "grades": [70, 75, 80]},
    {"name": "Charlie", "age": 21, "grades": [95, 98, 92]}
]

# Accessing Bob's age
print(students[1]["age"]) # 22

# Accessing Alice's first grade
print(students[0]["grades"][0]) # 85
{{< /code-file >}}

## Dictionaries of Dictionaries

Useful when you want to look up an item by a unique key (like a username or ID).

{{< code-file filename="users.py" lang="python" >}}
users = {
    "jdoe": {"full_name": "John Doe", "active": True},
    "asmith": {"full_name": "Anne Smith", "active": False}
}

print(users["jdoe"]["full_name"]) # John Doe
{{< /code-file >}}

## Iterating through Nested Data

To access everything, we often use **nested loops**.

{{< code-file filename="iteration.py" lang="python" >}}
for student in students:
    print(f"Name: {student['name']}")
    # Nested loop to print grades
    for grade in student['grades']:
        print(f"  - Grade: {grade}")
{{< /code-file >}}

---

## Interactive Practice

Think of a menu for a restaurant. You might have a dictionary where keys are categories (`"Appetizers"`, `"Main Course"`) and values are lists of dish names.

{{< interactive-table >}}
| Concept | Example | Access Logic |
| :--- | :--- | :--- |
| List of Lists | `matrix[0][1]` | `[row][column]` |
| List of Dicts | `users[0]['id']` | `[index]['key']` |
| Dict of Lists | `catalog['books'][0]` | `['key'][index]` |
{{< /interactive-table >}}

{{< quiz >}}
