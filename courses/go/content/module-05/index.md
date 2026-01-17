---
title: "Control Flow - Loops"
date: 2024-01-05
module: 5
weight: 5
draft: false
duration: "45 min"
difficulty: "beginner"
description: "Master the only loop construct in Go: the versatile for loop"
objectives:
  - Use the standard three-component for loop
  - Implement while-style loops using for
  - Create infinite loops
  - Use break and continue to control loop flow
  - Introduction to the range keyword
prerequisites: [4]
tags: ["loops", "for", "range", "control-flow"]
---

## The One and Only: for Loop

In many languages, you have `for`, `while`, and `do-while` loops. Go takes a simpler approach: it only has the `for` loop. However, this single construct is versatile enough to handle all looping needs.

## Standard Three-Component Loop

The most common form is similar to C or Java:

{{< code-file filename="main.go" lang="go" >}}
package main

import "fmt"

func main() {
    // init; condition; post
    for i := 0; i < 5; i++ {
        fmt.Println("Iteration:", i)
    }
}
{{< /code-file >}}

1. **Init statement**: executed before the first iteration (usually `i := 0`)
2. **Condition expression**: evaluated before every iteration. If false, the loop stops.
3. **Post statement**: executed at the end of every iteration (usually `i++`)

{{< callout type="info" title="No Parentheses" >}}
Just like `if`, the `for` loop does not use parentheses around its components, but braces `{}` are required.
{{< /callout >}}

## for as a "while" Loop

If you omit the init and post statements, the `for` loop behaves like a `while` loop:

{{< code-file filename="main.go" lang="go" >}}
package main

import "fmt"

func main() {
    count := 1
    
    // Only condition is provided
    for count <= 5 {
        fmt.Println("Count is:", count)
        count++
    }
}
{{< /code-file >}}

## Infinite Loops

If you omit the condition as well, you get an infinite loop:

{{< code-file filename="main.go" lang="go" >}}
package main

import "fmt"

func main() {
    for {
        fmt.Println("This runs forever...")
        break // ...unless we break out of it!
    }
}
{{< /code-file >}}

## Loop Control: break and continue

- `break`: Immediately exits the loop.
- `continue`: Skips the rest of the current iteration and starts the next one.

{{< code-file filename="main.go" lang="go" >}}
package main

import "fmt"

func main() {
    for i := 1; i <= 10; i++ {
        if i%2 == 0 {
            continue // Skip even numbers
        }
        if i > 7 {
            break // Stop if number is greater than 7
        }
        fmt.Println("Odd number:", i)
    }
}
{{< /code-file >}}

## Iterating with range

The `range` keyword is used to iterate over elements in a variety of data structures (arrays, slices, maps, strings, and channels). We'll cover these structures in detail later, but here's a sneak peek with a string:

{{< code-file filename="main.go" lang="go" >}}
package main

import "fmt"

func main() {
    message := "Go"
    
    // range returns index and value
    for i, char := range message {
        fmt.Printf("Index %d has character %c\n", i, char)
    }
    
    // Use _ if you don't need the index
    for _, char := range "Hello" {
        fmt.Printf("%c ", char)
    }
}
{{< /code-file >}}

## Nested Loops

You can put loops inside loops:

{{< code-file filename="main.go" lang="go" >}}
package main

import "fmt"

func main() {
    for i := 1; i <= 3; i++ {
        for j := 1; j <= 3; j++ {
            fmt.Printf("(%d, %d) ", i, j)
        }
        fmt.Println()
    }
}
{{< /code-file >}}

## Labelled break and continue

When dealing with nested loops, you can use labels to `break` or `continue` an outer loop:

{{< code-file filename="main.go" lang="go" >}}
package main

import "fmt"

func main() {
OuterLoop:
    for i := 1; i <= 3; i++ {
        for j := 1; j <= 3; j++ {
            if i == 2 && j == 2 {
                break OuterLoop // Breaks the outer loop
            }
            fmt.Printf("(%d, %d) ", i, j)
        }
        fmt.Println()
    }
}
{{< /code-file >}}

## Summary

Today you learned:

- Go only has one loop keyword: `for`
- The three forms of `for`: standard, while-style, and infinite
- How to use `break` and `continue`
- How to use `range` for basic iteration
- Using labels to control nested loops

{{< progress-check id="day5-complete" >}}I master loops in Go{{< /progress-check >}}

## Practice Exercise

1. Write a program that prints the multiplication table for a given number (1 to 10).
2. Write a program that finds all prime numbers between 1 and 50 using nested loops.
3. Use a `for` loop to reverse a string (Hint: iterate backwards or use `range`).
4. Implement a "Guess the Number" game where the user has limited attempts to guess a number, using `for` and `break`.

## Next Steps

Tomorrow, we'll dive into **Functions** - the building blocks of Go programs!

Now, test your loop knowledge with the quiz!
