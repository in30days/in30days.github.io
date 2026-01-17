---
title: "Variables and Mutability"
date: 2024-01-02
module: 2
weight: 2
draft: false
duration: "40 min"
difficulty: "intermediate"
description: "Learn how to declare variables, why they are immutable by default, and how to use constants"
objectives:
  - Declare variables with 'let'
  - Understand the difference between immutable and mutable variables
  - Learn about shadowing
  - Use constants
prerequisites: [1]
tags: ["variables", "mutability", "shadowing", "constants"]
---

## Immutable by Default

In most languages, you can change a variable's value after creating it. In Rust, variables are **immutable** by default. Once you bind a value to a name, you can't change it.

{{< code-file filename="main.rs" lang="rust" >}}
fn main() {
    let x = 5;
    println!("The value of x is: {}", x);
    // x = 6; // ERROR! Cannot assign twice to immutable variable
}
{{< /code-file >}}

### Why Immutable?
Immutability leads to safer, more predictable code. If you know a value won't change, you don't have to track how and where it might be modified across your program.

## Making Variables Mutable

To make a variable changeable, add the `mut` keyword:

{{< code-file filename="main.rs" lang="rust" >}}
fn main() {
    let mut x = 5;
    println!("The value of x is: {}", x);
    x = 6;
    println!("The value of x is now: {}", x);
}
{{< /code-file >}}

## Constants

Constants are similar to immutable variables, but with key differences:
1. You use `const` instead of `let`.
2. You **must** annotate the type.
3. They can be declared in any scope, including the global scope.
4. They must be set to a constant expression (something the compiler can calculate at build time).

{{< code-file filename="main.rs" lang="rust" >}}
const THREE_HOURS_IN_SECONDS: u32 = 60 * 60 * 3;

fn main() {
    println!("Constant value: {}", THREE_HOURS_IN_SECONDS);
}
{{< /code-file >}}

## Shadowing

In Rust, you can declare a new variable with the same name as a previous variable. This is called **shadowing**. The second variable "shadows" the first, taking its place.

{{< code-file filename="main.rs" lang="rust" >}}
fn main() {
    let x = 5;
    let x = x + 1; // x is now 6
    
    {
        let x = x * 2; // x is now 12 (only in this scope)
        println!("The value of x in the inner scope is: {}", x);
    }

    println!("The value of x in the outer scope is: {}", x); // still 6
}
{{< /code-file >}}

### Shadowing vs. mut
- **Shadowing**: We are creating a *new* variable. We can even change the data type of the variable while keeping the same name.
- **mut**: We are changing the *value* of the existing variable. We cannot change the type.

```rust
let spaces = "   ";
let spaces = spaces.len(); // Valid shadowing (String -> usize)

let mut spaces = "   ";
// spaces = spaces.len(); // ERROR! Cannot change type of mutable variable
```

## Summary

Today you learned:
- Variables are immutable by default for safety.
- Use `mut` to allow modification.
- Constants (`const`) are for values that never change and require type annotation.
- Shadowing allows you to reuse variable names with new values or types.

{{< progress-check id="day2-complete" >}}I understand variables and shadowing in Rust{{< /progress-check >}}

## Practice Exercise

1. Create a variable for your age, make it mutable, and increment it by 1.
2. Define a constant for the speed of light.
3. Use shadowing to convert a string `"42"` into an integer `42`.

## Next Steps

Tomorrow, we'll explore **Data Types**—and see how Rust handles numbers, booleans, and compound structures!
