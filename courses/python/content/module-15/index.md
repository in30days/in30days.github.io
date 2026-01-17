---
title: "Introduction to Classes and Objects"
date: 2024-01-15
module: 15
weight: 15
draft: false
duration: "45 min"
difficulty: "beginner"
description: "Start thinking in objects. Learn the basics of Object-Oriented Programming (OOP) in Python."
objectives:
  - Understand the concept of Classes and Objects
  - Define a basic class in Python
  - Create objects from a class
  - Understand attributes (data) and methods (behavior)
prerequisites: [14]
tags: ["oop", "basics", "classes"]
---

## Thinking in Objects

Until now, we've focused on **Procedural Programming**—writing a list of instructions for the computer to follow. As programs grow, it becomes easier to organize code around "things" (Objects) rather than just "actions".

**Object-Oriented Programming (OOP)** allows us to group data (attributes) and functionality (methods) together into a single unit called an **Object**.

## Classes vs. Objects

Think of a **Class** as a blueprint or a recipe. It describes what something *is* and what it *can do*.
An **Object** is an actual instance created from that blueprint.

- **Class:** Dog (The concept)
- **Object:** Your pet "Rex" (The real dog)

## Defining a Class

In Python, we use the `class` keyword.

{{< code-file filename="dog_class.py" lang="python" >}}
class Dog:
    pass # Empty class for now

# Creating an object (instantiating)
my_dog = Dog()
print(my_dog)
{{< /code-file >}}

## Attributes (Data)

Objects can store data. These are called **Attributes**. We can assign them directly to an object.

{{< code-file filename="attributes.py" lang="python" >}}
class Dog:
    pass

rex = Dog()
rex.name = "Rex"
rex.breed = "German Shepherd"

print(f"My dog's name is {rex.name}")
{{< /code-file >}}

## Methods (Behavior)

Functions defined inside a class are called **Methods**. They define what the object can do.

{{< code-file filename="methods.py" lang="python" >}}
class Dog:
    def bark(self):
        print("Woof! Woof!")

rex = Dog()
rex.bark()
{{< /code-file >}}

### What is `self`?
Notice the `self` parameter in the method. `self` refers to the **specific instance** of the object that is calling the method. It allows the function to access that object's own data.

---

## Interactive Practice

Imagine you are building a game. You might have a `Player` class. What attributes (like `health` or `name`) and methods (like `jump` or `attack`) would it have?

{{< mermaid >}}
classDiagram
    class Dog {
        +name: str
        +breed: str
        +bark()
        +eat()
    }
    class Player {
        +username: str
        +score: int
        +move()
        +level_up()
    }
{{< /mermaid >}}

{{< quiz >}}
