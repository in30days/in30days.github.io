---
title: "Data Structures - Lists and Tuples"
date: 2024-01-06
module: 6
weight: 6
draft: false
duration: "45 min"
difficulty: "beginner"
description: "Learn how to store collections of data using Python's most versatile data structures"
objectives:
  - Create and manipulate Python lists
  - Understand list indexing and slicing
  - Use common list methods (append, remove, sort)
  - Understand the difference between lists and tuples
  - Learn when to use immutable tuples
prerequisites: [5]
tags: ["basics", "data-structures", "lists", "tuples"]
---

## Collections of Data

Up until now, we've stored single values in variables. But in the real world, we often deal with collections: a list of users, a series of temperatures, or a shopping cart.

Python provides several built-in **Data Structures** to handle collections. Today we'll cover the two most common ones: **Lists** and **Tuples**.

## Python Lists

A **List** is an ordered, changeable collection of items. In Python, lists are written with square brackets `[]`.

{{< code-file filename="lists.py" lang="python" >}}
fruits = ["apple", "banana", "cherry"]
numbers = [1, 2, 3, 4, 5]
mixed = ["hello", 10, True] # Lists can store different types
{{< /code-file >}}

### Indexing and Slicing

Items in a list are indexed starting from **0**.

{{< code-file filename="indexing.py" lang="python" >}}
fruits = ["apple", "banana", "cherry"]

print(fruits[0])  # Output: apple
print(fruits[-1]) # Output: cherry (last item)

# Slicing: [start:stop]
print(fruits[0:2]) # Output: ["apple", "banana"]
{{< /code-file >}}

### Modifying Lists

Lists are **mutable**, meaning you can change them after they are created.

{{< code-file filename="list_methods.py" lang="python" >}}
fruits = ["apple", "banana"]

fruits.append("orange")   # Add to end
fruits.insert(1, "kiwi") # Add at index 1
fruits.remove("apple")    # Remove specific item
pop_item = fruits.pop()   # Remove and return last item

fruits[0] = "strawberry"  # Change item at index 0
{{< /code-file >}}

## Python Tuples

A **Tuple** is similar to a list, but it is **immutable**—it cannot be changed after creation. Tuples are written with parentheses `()`.

{{< code-file filename="tuples.py" lang="python" >}}
coordinates = (10, 20)
dimensions = (1920, 1080)

# dimensions[0] = 800 # This would cause an ERROR!
{{< /code-file >}}

### Why use Tuples?
1. **Safety:** Use them for data that should never change (like GPS coordinates).
2. **Performance:** Tuples are slightly faster than lists.
3. **Dictionary Keys:** Tuples can be used as keys in dictionaries (which we'll learn tomorrow).

---

## Interactive Practice

Try creating a list of your top 3 favorite movies, then add a 4th one to the list.

{{< interactive-table >}}
| Feature | List `[]` | Tuple `()` |
| :--- | :--- | :--- |
| Ordered | Yes | Yes |
| Mutable | Yes | No |
| Duplicates | Yes | Yes |
| Typical Use | Collection of items | Fixed data points |
{{< /interactive-table >}}

{{< quiz >}}
