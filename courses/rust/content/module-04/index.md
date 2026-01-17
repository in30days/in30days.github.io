---
title: "Functions"
date: 2024-01-04
module: 4
weight: 4
draft: false
duration: "45 min"
difficulty: "intermediate"
description: "Master defining functions, using parameters, and understanding the difference between statements and expressions"
objectives:
  - Define functions with the 'fn' keyword
  - Pass parameters with type annotations
  - Understand the difference between Statements and Expressions
  - Return values from functions
prerequisites: [3]
tags: ["functions", "parameters", "expressions", "return-values"]
---

## Function Basics

Rust code uses **snake_case** for function and variable names. You define a function with the `fn` keyword.

{{< code-file filename="main.rs" lang="rust" >}}
fn main() {
    println!("Hello from main!");
    another_function();
}

fn another_function() {
    println!("Hello from another function!");
}
{{< /code-file >}}

Note: It doesn't matter where you define your functions, as long as they are defined somewhere the compiler can see.

## Parameters

In function signatures, you **must** declare the type of each parameter. This is a deliberate design choice in Rust.

{{< code-file filename="main.rs" lang="rust" >}}
fn main() {
    print_labeled_measurement(5, 'h');
}

fn print_labeled_measurement(value: i32, unit_label: char) {
    println!("The measurement is: {}{}", value, unit_label);
}
{{< /code-file >}}

---

## Statements vs. Expressions

This is one of the most important concepts in Rust.

- **Statements** are instructions that perform some action and **do not return a value**.
  - `let y = 6;` is a statement.
  - You cannot do `let x = (let y = 6);`.
- **Expressions** evaluate to a resulting value.
  - `5 + 6` is an expression that evaluates to `11`.
  - Calling a function is an expression.
  - A block `{}` is an expression.

{{< code-file filename="main.rs" lang="rust" >}}
fn main() {
    let y = {
        let x = 3;
        x + 1 // No semicolon! This makes it an expression
    };

    println!("The value of y is: {}", y); // y is 4
}
{{< /code-file >}}

{{< callout type="warning" title="Watch the Semicolon" >}}
If you add a semicolon to the end of an expression, you turn it into a statement, and it will no longer return a value.
{{< /callout >}}

## Functions with Return Values

We declare the return type after an arrow `->`.

In Rust, the return value of a function is synonymous with the value of the **final expression** in the block of the body of the function.

{{< code-file filename="main.rs" lang="rust" >}}
fn five() -> i32 {
    5 // Final expression, no semicolon
}

fn main() {
    let x = five();
    println!("The value of x is: {}", x);
}
{{< /code-file >}}

You can also use the `return` keyword for early returns, but most Rustaceans prefer the expression style.

{{< code-file filename="main.rs" lang="rust" >}}
fn plus_one(x: i32) -> i32 {
    if x > 100 {
        return x; // Early return requires 'return' and ';'
    }
    x + 1 // Implicit return
}
{{< /code-file >}}

## Summary

Today you learned:
- How to define functions with `fn` and parameters.
- **Statements** do actions; **Expressions** return values.
- Function return values are usually the last expression in the body (no semicolon).

{{< progress-check id="day4-complete" >}}I understand how to write and use functions in Rust{{< /progress-check >}}

## Practice Exercise

1. Write a function `multiply(a: i32, b: i32) -> i32` that returns the product of two numbers.
2. Create a function that takes a temperature in Celsius and returns it in Fahrenheit.
3. What happens if you add a semicolon to the last line of a function that is supposed to return a value? Try it and read the error message.

## Next Steps

Tomorrow, we'll learn about **Control Flow**—making decisions with `if` and repeating tasks with `loop`, `while`, and `for`!
