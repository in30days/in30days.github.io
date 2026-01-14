---
title: "Data Structures - Dictionaries and Sets"
date: 2024-01-07
day: 7
weight: 7
draft: false
duration: "45 min"
difficulty: "beginner"
description: "Learn how to store key-value pairs and unique collections of data"
objectives:
  - Create and use Python dictionaries
  - Access, add, and remove dictionary items
  - Understand dictionary keys and values
  - Learn how to use Python sets for unique items
  - Perform basic set operations (union, intersection)
prerequisites: [6]
tags: ["basics", "data-structures", "dictionaries", "sets"]
---

## Key-Value Storage

Sometimes, you don't want to store items in a numbered list. Instead, you want to label them. For example, a "user" has a "name", an "email", and an "age". In Python, we use **Dictionaries** for this.

## Python Dictionaries

A **Dictionary** is a collection which is ordered (as of Python 3.7), changeable, and does not allow duplicates. Dictionaries are written with curly braces `{}` and have **keys** and **values**.

{{< code-file filename="dict_example.py" lang="python" >}}
user = {
  "name": "Alice",
  "age": 25,
  "email": "alice@example.com"
}

print(user["name"]) # Output: Alice
{{< /code-file >}}

### Modifying Dictionaries

{{< code-file filename="dict_mod.py" lang="python" >}}
user = {"name": "Alice"}

# Add or update
user["age"] = 26
user.update({"email": "alice@new.com"})

# Remove
user.pop("age")
del user["name"]
{{< /code-file >}}

## Python Sets

A **Set** is an unordered collection with **no duplicate elements**. Sets are useful for removing duplicates from other collections and performing mathematical operations.

{{< code-file filename="sets.py" lang="python" >}}
colors = {"red", "green", "blue", "red"}
print(colors) # Output: {"green", "blue", "red"} (duplicates removed!)

# Basic Operations
a = {1, 2, 3}
b = {3, 4, 5}

print(a.union(b))        # {1, 2, 3, 4, 5}
print(a.intersection(b)) # {3}
{{< /code-file >}}

---

## Interactive Practice

Try creating a dictionary representing your favorite car (brand, model, year).

{{< interactive-table >}}
| Feature | Dictionary `{k:v}` | Set `{}` |
| :--- | :--- | :--- |
| Access | via Key | No index/key |
| Mutable | Yes | Yes |
| Duplicates | Keys: No, Values: Yes | No |
| Order | Ordered (3.7+) | Unordered |
{{< /interactive-table >}}

{{< quiz >}}
