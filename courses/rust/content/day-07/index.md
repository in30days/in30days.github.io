---
title: "Week 1 Review & Practice"
date: 2024-01-07
day: 7
weight: 7
draft: false
duration: "90 min"
difficulty: "intermediate"
description: "Review the fundamentals of Rust and build a CLI tool to practice everything you've learned so far."
objectives:
  - Review variables, types, and functions
  - Practice ownership and control flow
  - Build a 'Basic Geometry Calculator' CLI tool
prerequisites: [6]
tags: ["review", "practice", "cli", "project"]
---

## Week 1 Wrap-up

Congratulations on finishing your first week with Rust! You've navigated the most challenging part of the learning curve: understanding how Rust thinks about memory and safety.

### What We've Covered
- **Day 1**: Installation and Cargo.
- **Day 2**: Immutability vs. Mutability and Shadowing.
- **Day 3**: Scalars (i32, char) and Compounds (Tuples, Arrays).
- **Day 4**: Functions, Statements vs. Expressions.
- **Day 5**: If/Else as expressions and Loop types.
- **Day 6**: The 3 Rules of Ownership.

---

## Practice Project: Geometry CLI

Today, you'll build a CLI tool that calculates the area of different shapes. This will practice variables, functions, control flow, and user input.

### Step 1: Create the Project
```bash
cargo new shape_calc
cd shape_calc
```

### Step 2: Getting User Input
To read from the terminal, we'll use the standard library `io`.

{{< code-file filename="src/main.rs" lang="rust" >}}
use std::io;

fn main() {
    println!("Welcome to Shape Calc!");
    
    loop {
        println!("\nSelect a shape: (1) Rectangle (2) Circle (3) Exit");
        
        let mut choice = String::new();
        io::stdin()
            .read_line(&mut choice)
            .expect("Failed to read line");

        let choice: u32 = match choice.trim().parse() {
            Ok(num) => num,
            Err(_) => continue,
        };

        if choice == 1 {
            calculate_rectangle();
        } else if choice == 2 {
            calculate_circle();
        } else if choice == 3 {
            break;
        }
    }
}

fn calculate_rectangle() {
    // Your code here: Get width/height and print area
}

fn calculate_circle() {
    // Your code here: Get radius and print area (Area = 3.14 * r * r)
}
{{< /code-file >}}

### Project Requirements
1. Implement `calculate_rectangle` and `calculate_circle`.
2. Use functions that return values for the actual math.
3. Handle invalid input (like letters instead of numbers) using `match` (don't worry about the details of match yet, just use the pattern in the example).

## Self-Check Quiz
1. Can I explain why `let x = 5; x = 6;` fails?
2. Do I know when to use a Tuple vs. an Array?
3. Can I identify an Expression vs. a Statement?
4. Do I understand why `let s2 = s1` might make `s1` unusable?

## Summary
You've built a solid foundation. While Ownership might still feel a bit "mystical," it will become second nature as we dive into **Borrowing and References** next week.

{{< progress-check id="week1-complete" >}}I have completed Week 1 and the Geometry Project{{< /progress-check >}}

## Next Steps
In Week 2, we solve the "Ownership problem" with **Borrowing and References**, learn about **Slices**, and start organizing data with **Structs**!
