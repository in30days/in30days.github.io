---
title: "Project: Library Management System"
date: 2024-01-21
day: 21
weight: 21
draft: false
duration: "90 min"
difficulty: "beginner"
description: "Combine classes, objects, and nested data structures to build a professional CLI tool."
objectives:
  - Model real-world entities using Classes
  - Manage a collection of objects
  - Implement complex logic with nested structures
  - Use datetime for tracking events
prerequisites: [20]
tags: ["project", "cli", "oop", "basics"]
---

## Week 3 Milestone

You've made it through the most challenging part of Python: **Object-Oriented Programming**. Now, let's combine your skills in classes, methods, and nested data to build a **Library Management System**.

## Project Requirements

Your application should allow a user to:
1. **Register** a new book (with title, author, and ISBN).
2. **Search** for books by title.
3. **Borrow/Return** books (updating their status).
4. **Log Transactions** (record when a book was borrowed using `datetime`).

## Step 1: Modeling the Book

{{< code-file filename="book.py" lang="python" >}}
from datetime import datetime

class Book:
    def __init__(self, title, author, isbn):
        self.title = title
        self.author = author
        self.isbn = isbn
        self.is_available = True
        self.history = [] # List to store borrowing dates

    def borrow(self):
        if self.is_available:
            self.is_available = False
            self.history.append(f"Borrowed on: {datetime.now()}")
            return True
        return False

    def __str__(self):
        status = "Available" if self.is_available else "Borrowed"
        return f"{self.title} by {self.author} [{status}]"
{{< /code-file >}}

## Step 2: The Library Class

Use a dictionary to store books, using their ISBN as a unique key.

{{< code-file filename="library.py" lang="python" >}}
class Library:
    def __init__(self):
        self.books = {} # ISBN -> Book Object

    def add_book(self, book):
        self.books[book.isbn] = book

    def list_books(self):
        for book in self.books.values():
            print(book)
{{< /code-file >}}

## Your Challenge

Complete the CLI interface in a `main()` function:
- Implement a loop that shows a menu (1. Add, 2. List, 3. Borrow, 4. Exit).
- Handle the logic for "Borrowing" a book by asking for its ISBN.
- **Bonus:** Add error handling to prevent the program from crashing if an ISBN isn't found.

---

## Interactive Practice

Visualize the relationship between the `Library` and its `Books`.

{{< mermaid >}}
erDiagram
    LIBRARY ||--o{ BOOK : contains
    BOOK {
        string title
        string author
        string isbn
        boolean is_available
        list history
    }
{{< /mermaid >}}

{{< quiz >}}
