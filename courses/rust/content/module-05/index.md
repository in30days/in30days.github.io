---
title: "Control Flow"
date: 2024-01-05
module: 5
weight: 5
draft: false
duration: "50 min"
difficulty: "intermediate"
description: "Learn to make decisions with if expressions and repeat tasks with various loop types"
objectives:
  - Use 'if' expressions (and learn why they are expressions)
  - Understand 'loop', 'while', and 'for' loops
  - Iterate through collections with 'for' and 'range'
prerequisites: [4]
tags: ["control-flow", "if", "loops", "for", "while"]
---

## if Expressions

In Rust, `if` is an **expression**, not just a statement. This means it returns a value.

{{< code-file filename="main.rs" lang="rust" >}}
fn main() {
    let number = 3;

    if number < 5 {
        println!("condition was true");
    } else {
        println!("condition was false");
    }
}
{{< /code-file >}}

### Using if in a let Statement
Since `if` is an expression, we can use it on the right side of a `let` statement:

```rust
let condition = true;
let number = if condition { 5 } else { 6 };
```

{{< callout type="warning" title="Type Matching" >}}
The values in the `if` and `else` arms must have the same type. You cannot return an integer from one and a string from the other.
{{< /callout >}}

---

## Repetition with Loops

Rust has three kinds of loops: `loop`, `while`, and `for`.

### 1. The loop
`loop` tells Rust to execute a block of code over and over again forever or until you explicitly tell it to stop.

{{< code-file filename="main.rs" lang="rust" >}}
fn main() {
    let mut count = 0;
    loop {
        count += 1;
        if count == 3 {
            break; // Stop the loop
        }
    }
}
{{< /code-file >}}

**Returning values from loops:**
You can add a value after `break` to return it from the loop:
```rust
let result = loop {
    counter += 1;
    if counter == 10 {
        break counter * 2;
    }
};
```

### 2. The while Loop
Runs as long as a condition is true.

```rust
let mut number = 3;
while number != 0 {
    println!("{}!", number);
    number -= 1;
}
```

### 3. The for Loop
The most common loop in Rust. It's used to iterate over a collection or a range.

{{< code-file filename="main.rs" lang="rust" >}}
fn main() {
    let a = [10, 20, 30, 40, 50];

    for element in a {
        println!("the value is: {}", element);
    }

    // Using a range (1 to 3, excluding 4)
    for number in 1..4 {
        println!("{}!", number);
    }
}
{{< /code-file >}}

{{< callout type="tip" title="Ranges" >}}
`1..4` is a range from 1 to 3.
`1..=4` is a range from 1 to 4.
{{< /callout >}}

## Summary

Today you learned:
- `if` is an expression and can be used to assign values.
- `loop` is for infinite repetition (can return values via `break`).
- `while` is for conditional repetition.
- `for` is the safest and most common way to iterate through collections and ranges.

{{< progress-check id="day5-complete" >}}I understand control flow in Rust{{< /progress-check >}}

## Practice Exercise

1. Write a program that prints numbers from 1 to 20, but for multiples of 3 print "Fizz" and for multiples of 5 print "Buzz" (FizzBuzz!).
2. Use a `for` loop to reverse an array.
3. Use `loop` to find the first power of 2 greater than 1000.

## Next Steps

Tomorrow, we'll cover the **most important concept in Rust**: **Ownership**! This is what makes Rust different from every other language.
