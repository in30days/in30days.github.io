---
title: "Understanding Inheritance"
date: 2024-01-17
day: 17
weight: 17
draft: false
duration: "45 min"
difficulty: "beginner"
description: "Learn how to reuse and extend code by creating subclasses."
objectives:
  - Understand the Parent-Child relationship in classes
  - Create a subclass that inherits from a parent class
  - Override methods to change behavior
  - Use the `super()` function
prerequisites: [16]
tags: ["oop", "inheritance", "basics"]
---

## Reusing Code

One of the greatest strengths of OOP is **Inheritance**. It allows a new class to take on the attributes and methods of an existing class.

This helps avoid repeating code. For example, both a `Cat` and a `Dog` are `Animals`. Instead of writing "eating" logic for both, we can write it once in an `Animal` class.

## Parent and Child Classes

- **Parent Class (Base Class):** The existing class you are inheriting from.
- **Child Class (Derived Class):** The new class that inherits from the parent.

{{< code-file filename="inheritance.py" lang="python" >}}
class Animal:
    def __init__(self, name):
        self.name = name

    def eat(self):
        print(f"{self.name} is eating...")

# Dog inherits from Animal
class Dog(Animal):
    def bark(self):
        print("Woof!")

my_dog = Dog("Buddy")
my_dog.eat()  # Inherited from Animal
my_dog.bark() # Defined in Dog
{{< /code-file >}}

## Overriding Methods

A child class can provide its own version of a method that already exists in the parent. This is called **Overriding**.

{{< code-file filename="override.py" lang="python" >}}
class Animal:
    def make_sound(self):
        print("Generic animal sound")

class Cat(Animal):
    def make_sound(self):
        print("Meow!")

my_cat = Cat()
my_cat.make_sound() # Prints "Meow!"
{{< /code-file >}}

## Using `super()`

Sometimes you want to keep the parent's logic but add something extra to it. The `super()` function allows you to call methods from the parent class.

{{< code-file filename="super_example.py" lang="python" >}}
class Animal:
    def __init__(self, name):
        self.name = name

class Dog(Animal):
    def __init__(self, name, breed):
        super().__init__(name) # Calls parent __init__
        self.breed = breed

my_dog = Dog("Rex", "Husky")
print(my_dog.name)
{{< /code-file >}}

---

## Interactive Practice

Think of a `Vehicle` parent class. What child classes could it have? (`Car`, `Bicycle`, `Plane`). What methods would they share (e.g., `move`) and which would be unique (e.g., `fly`)?

{{< mermaid >}}
classDiagram
    Animal <|-- Dog
    Animal <|-- Cat
    Animal : +name
    Animal : +eat()
    Dog : +bark()
    Cat : +meow()
{{< /mermaid >}}

{{< quiz >}}
