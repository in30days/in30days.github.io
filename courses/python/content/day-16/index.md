---
title: "Constructors and Instance Methods"
date: 2024-01-16
day: 16
weight: 16
draft: false
duration: "45 min"
difficulty: "beginner"
description: "Learn how to initialize objects with data using the __init__ method."
objectives:
  - Understand and use the `__init__` constructor
  - Create objects with unique data
  - Write methods that use object attributes
  - Understand the life cycle of an object
prerequisites: [15]
tags: ["oop", "constructor", "init"]
---

## Initializing Objects

Yesterday, we created an empty object and added attributes manually. In professional code, we use a **Constructor** to set up an object's data as soon as it is created.

## The `__init__` Method

In Python, the constructor is a special method called `__init__` (short for initialization). It runs automatically when you create a new object.

{{< code-file filename="constructor.py" lang="python" >}}
class Dog:
    def __init__(self, name, breed):
        self.name = name   # Assigning param to object attribute
        self.breed = breed
        print(f"{self.name} has been created!")

# Now we pass data during creation
my_dog = Dog("Rex", "German Shepherd")
friend_dog = Dog("Bella", "Poodle")

print(my_dog.name)
print(friend_dog.name)
{{< /code-file >}}

## Instance Methods

Methods can use the data stored in the object to perform specific tasks.

{{< code-file filename="methods_with_data.py" lang="python" >}}
class Dog:
    def __init__(self, name, age):
        self.name = name
        self.age = age

    def introduce(self):
        print(f"Hi, I'm {self.name} and I am {self.age} years old.")

    def human_years(self):
        return self.age * 7

rex = Dog("Rex", 3)
rex.introduce()
print(f"In human years, Rex is {rex.human_years()}")
{{< /code-file >}}

## Why use `self`?

Remember, `self` is how the method knows *which* object's data to use. If you have two dogs, `self.name` ensures Rex says "Rex" and Bella says "Bella".

---

## Interactive Practice

Try building a `Book` class that takes `title` and `author` as arguments in the `__init__` method. Add a method called `get_description` that returns a string like "Title by Author".

{{< mermaid >}}
flowchart TD
    Create[Create: Dog 'Rex'] --> Init[__init__ runs]
    Init --> Set[Set self.name = 'Rex']
    Set --> Done[Object is ready to use]
{{< /mermaid >}}

{{< quiz >}}
