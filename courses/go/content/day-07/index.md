---
title: "Week 1 Review & Practice"
date: 2024-01-07
day: 7
weight: 7
draft: false
duration: "90 min"
difficulty: "beginner"
description: "Review your progress from Week 1 and build a small CLI tool to practice everything you've learned"
objectives:
  - Review basic Go syntax, variables, and types
  - Practice using control structures (if, switch, for)
  - Implement logic using functions with multiple returns
  - Build a comprehensive "Calculator & Unit Converter" CLI tool
prerequisites: [6]
tags: ["review", "practice", "cli-tool", "week-1"]
---

## Week 1 Wrap-up

Congratulations! You've completed the first week of **Go Basics in 30 Days**. You've gone from "Hello World" to understanding the core syntax that makes Go unique.

### What We've Covered

- **Day 1**: Introduction to Go, environment setup, and your first program.
- **Day 2**: Variables, constants, and basic data types (int, float, string, bool).
- **Day 3**: Operators (arithmetic, comparison, logical) and expressions.
- **Day 4**: Conditionals with `if`, `else if`, `else`, and `switch`.
- **Day 5**: The versatile `for` loop, `break`, `continue`, and `range`.
- **Day 6**: Functions, multiple return values, and variadic functions.

## Practice Project: The Multi-Tool CLI

To solidify your knowledge, we're going to build a small command-line tool that performs various calculations and conversions. This project will use everything you've learned so far.

### Project Requirements

Create a program that:
1. Shows a menu of options to the user.
2. Accepts user input for choices and values.
3. Implements the following features:
   - **Temperature Converter**: Celsius to Fahrenheit and vice versa.
   - **Basic Calculator**: Addition, subtraction, multiplication, and division.
   - **Grade Calculator**: Takes a numeric score and returns a letter grade.
   - **Leap Year Checker**: Determines if a year is a leap year.
4. Uses functions for each feature.
5. Uses a loop to allow the user to perform multiple operations until they choose to exit.

### Implementation Guide

Here's a starting point for your `main.go`:

{{< code-file filename="main.go" lang="go" >}}
package main

import (
    "fmt"
)

func showMenu() {
    fmt.Println("\n--- Week 1 Multi-Tool ---")
    fmt.Println("1. Temperature Converter")
    fmt.Println("2. Basic Calculator")
    fmt.Println("3. Grade Calculator")
    fmt.Println("4. Leap Year Checker")
    fmt.Println("0. Exit")
    fmt.Print("Choose an option: ")
}

func main() {
    for {
        showMenu()
        
        var choice int
        fmt.Scan(&choice)
        
        if choice == 0 {
            fmt.Println("Goodbye!")
            break
        }
        
        switch choice {
        case 1:
            runTempConverter()
        case 2:
            runCalculator()
        case 3:
            runGradeCalculator()
        case 4:
            runLeapYearChecker()
        default:
            fmt.Println("Invalid choice, try again.")
        }
    }
}

// Implement the run... functions below!
{{< /code-file >}}

### Tips for Implementation

- Use `fmt.Scan(&variable)` to get user input.
- For the calculator, return an error if the user tries to divide by zero.
- Use `switch` for the menu and the calculator operations.
- Remember to use `float64` for temperature and division results.

## Self-Check Quiz

Before you move on to Week 2, ask yourself:

1. Can I declare variables using both `var` and `:=`?
2. Do I understand when to use `int` vs `float64` vs `string`?
3. Can I write a loop that skips even numbers?
4. Do I feel comfortable returning multiple values from a function?
5. Can I handle basic user input using `fmt.Scan`?

If you answered "Yes" to all, you're ready for Week 2!

## Summary

This week was all about the foundations. While you haven't seen everything Go has to offer yet, you now have the tools to write basic functional programs.

{{< progress-check id="week1-complete" >}}I have completed Week 1 and the practice project{{< /progress-check >}}

## Next Steps

In Week 2, we'll dive into **Data Structures**. We'll move beyond simple variables and learn about:
- Arrays and Slices (dynamic arrays)
- Maps (key-value pairs)
- Structs (custom data types)
- Pointers (memory addresses)

Complete the final Week 1 review quiz to unlock Week 2!
