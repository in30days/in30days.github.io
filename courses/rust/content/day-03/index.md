---
title: "Data Types"
date: 2024-01-03
day: 3
weight: 3
draft: false
duration: "50 min"
difficulty: "intermediate"
description: "Explore Rust's scalar and compound data types, from integers to tuples and arrays"
objectives:
  - Understand Scalar types: integers, floats, booleans, and characters
  - Work with Compound types: tuples and arrays
  - Learn about type inference and explicit annotation
prerequisites: [2]
tags: ["data-types", "scalars", "compound-types", "tuples", "arrays"]
---

## Strong and Static

Every value in Rust is of a certain data type. Since Rust is **statically typed**, it must know the types of all variables at compile time.

Usually, the compiler can **infer** the type based on the value. But sometimes, we need to provide a type annotation:

```rust
let x: u32 = 42;
```

## Scalar Types

A scalar type represents a single value. Rust has four primary scalar types.

### 1. Integers
Integers are numbers without fractional components.

| Length | Signed | Unsigned |
|--------|--------|----------|
| 8-bit  | `i8`   | `u8`     |
| 16-bit | `i16`  | `u16`    |
| 32-bit | `i32`  | `u32`    |
| 64-bit | `i64`  | `u64`    |
| 128-bit| `i128` | `u128`   |
| arch   | `isize`| `usize`  |

- **Signed** (`i`): Can be positive or negative.
- **Unsigned** (`u`): Only positive.
- **arch**: Depends on the computer's architecture (64-bit or 32-bit).

{{< callout type="tip" title="Default Integer" >}}
If you don't specify, Rust defaults to `i32`.
{{< /callout >}}

### 2. Floating-Point
Numbers with decimal points. Rust has two: `f32` and `f64` (default).

```rust
let x = 2.0; // f64
let y: f32 = 3.0; // f32
```

### 3. Boolean
`true` and `false`. Booleans are 1 byte in size.

```rust
let f: bool = false;
```

### 4. Character
The `char` type represents a single Unicode scalar value. Note: we use **single quotes** for chars and **double quotes** for strings.

```rust
let c = 'z';
let heart_eyed_cat = '😻';
```

---

## Compound Types

Compound types can group multiple values into one type.

### 1. The Tuple
A tuple is a way of grouping together a number of values with a variety of types into one compound type. Tuples have a **fixed length**.

{{< code-file filename="main.rs" lang="rust" >}}
fn main() {
    let tup: (i32, f64, u8) = (500, 6.4, 1);

    // Destructuring
    let (x, y, z) = tup;
    println!("The value of y is: {}", y);

    // Accessing by index
    let five_hundred = tup.0;
    println!("First element: {}", five_hundred);
}
{{< /code-file >}}

### 2. The Array
Unlike a tuple, every element of an array must have the **same type**. Arrays in Rust have a **fixed length** (if you need a list that grows, use a *Vector*—which we'll cover later).

{{< code-file filename="main.rs" lang="rust" >}}
fn main() {
    let a = [1, 2, 3, 4, 5];
    let months = ["January", "February", "March"];
    
    // Explicit type and length [type; length]
    let b: [i32; 5] = [1, 2, 3, 4, 5];

    // Initialize with same value: [value; length]
    let c = [3; 5]; // [3, 3, 3, 3, 3]

    println!("First element: {}", a[0]);
}
{{< /code-file >}}

## Summary

Today you learned:
- **Scalar types**: i32, f64, bool, char.
- **Compound types**: Tuples (different types) and Arrays (same types, fixed length).
- How to access tuple elements (`.0`) and array elements (`[0]`).

{{< progress-check id="day3-complete" >}}I understand Rust's basic and compound data types{{< /progress-check >}}

## Practice Exercise

1. Create a tuple that holds your name (string), age (integer), and height (float).
2. Create an array of 5 integers and print the 3rd element.
3. What happens if you try to access an index outside the array's range (e.g., `a[10]`)? Try it!

## Next Steps

Tomorrow, we'll learn about **Functions**—how to organize code into reusable blocks and handle return values!
