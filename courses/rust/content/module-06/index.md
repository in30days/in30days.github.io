---
title: "Ownership Basics"
date: 2024-01-06
module: 6
weight: 6
draft: false
duration: "60 min"
difficulty: "intermediate"
description: "Understand the core concept that makes Rust unique: Ownership. Learn how Rust manages memory without a garbage collector."
objectives:
  - Understand the three rules of Ownership
  - Learn about Variable Scope
  - Understand the difference between Copy and Move
  - Introduction to the Stack vs. the Heap
prerequisites: [5]
tags: ["ownership", "memory", "scope", "move", "copy"]
---

## What is Ownership?

Ownership is Rust’s most unique feature, and it enables Rust to make memory safety guarantees without needing a garbage collector.

### The Stack vs. The Heap
To understand ownership, you first need to know how Rust uses memory:
- **The Stack**: Fast, fixed-size data (like integers, booleans, and characters).
- **The Heap**: Slower, but can hold data that grows in size (like `String` or `Vec`).

## The Three Rules of Ownership

1. Each value in Rust has a variable that’s called its **owner**.
2. There can only be **one owner** at a time.
3. When the owner goes **out of scope**, the value will be dropped (removed from memory).

---

## Variable Scope
A scope is the range within a program for which an item is valid.

```rust
{                      // s is not valid here, it’s not yet declared
    let s = "hello";   // s is valid from this point forward
    // do stuff with s
}                      // this scope is now over, and s is no longer valid
```

## Data Interaction: Move

When we assign one variable to another, Rust does something different depending on the data type.

### Simple Types (Copy)
For types with a fixed size (on the Stack), Rust copies the value.

```rust
let x = 5;
let y = x; // x is still valid
```

### Complex Types (Move)
For types on the Heap (like `String`), Rust **moves** the ownership. The first variable is no longer valid!

{{< code-file filename="main.rs" lang="rust" >}}
fn main() {
    let s1 = String::from("hello");
    let s2 = s1; // The data was moved to s2. s1 is now invalid!

    // println!("{}, world!", s1); // ERROR! value borrowed here after move
}
{{< /code-file >}}

**Why?** To prevent "double free" errors. If both variables owned the same memory, they would both try to clean it up when they go out of scope, causing a crash.

## Ownership and Functions

Passing a value to a function will move or copy it, just as assignment does.

{{< code-file filename="main.rs" lang="rust" >}}
fn main() {
    let s = String::from("hello");  // s comes into scope
    takes_ownership(s);             // s's value moves into the function...
                                    // ... and so is no longer valid here

    let x = 5;                      // x comes into scope
    makes_copy(x);                  // x would move into the function,
                                    // but i32 is Copy, so it’s okay to still
                                    // use x afterward
} 
{{< /code-file >}}

## Summary

Today you learned:
- The 3 Rules of Ownership.
- Fixed-size data is **Copied** (Stack).
- Dynamic-size data is **Moved** (Heap).
- Ownership prevents memory leaks and double-free bugs without a garbage collector.

{{< progress-check id="day6-complete" >}}I understand the basics of Ownership in Rust{{< /progress-check >}}

## Practice Exercise

1. Create a `String` and try to pass it to two different functions sequentially. What happens?
2. How can you use a `String` again after passing it to a function? (Hint: The function could return it back, but we'll learn a better way—Borrowing—next week!)
3. Use the `.clone()` method to manually copy a `String` instead of moving it.

## Next Steps

Tomorrow, we'll wrap up Week 1 with a **Review and Practice Project**!
