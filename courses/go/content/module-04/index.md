---
title: "Control Flow - Conditionals"
date: 2024-01-04
module: 4
weight: 4
draft: false
duration: "50 min"
difficulty: "beginner"
description: "Learn to make decisions in your Go programs with if/else and switch statements"
objectives:
  - Write if, else if, and else statements
  - Use the switch statement for multiple conditions
  - Understand Go's unique if with initialization
  - Work with type switches
prerequisites: [3]
tags: ["conditionals", "if-else", "switch", "control-flow"]
---

## Making Decisions in Go

Conditional statements allow your program to make decisions and execute different code based on conditions. Go provides two main constructs: `if` statements and `switch` statements.

## The if Statement

The basic `if` statement executes code when a condition is true:

{{< code-file filename="main.go" lang="go" >}}
package main

import "fmt"

func main() {
    age := 20
    
    if age >= 18 {
        fmt.Println("You are an adult")
    }
}
{{< /code-file >}}

{{< callout type="info" title="No Parentheses Needed" >}}
Unlike C, Java, or JavaScript, Go does not require parentheses around the condition. However, braces `{}` are always required, even for single-line bodies.
{{< /callout >}}

## if-else Statement

Add an `else` block for code that runs when the condition is false:

{{< code-file filename="main.go" lang="go" >}}
package main

import "fmt"

func main() {
    temperature := 15
    
    if temperature > 25 {
        fmt.Println("It's hot outside")
    } else {
        fmt.Println("It's not too hot")
    }
}
{{< /code-file >}}

## if-else if-else Chain

Handle multiple conditions with `else if`:

{{< code-file filename="main.go" lang="go" >}}
package main

import "fmt"

func main() {
    score := 85
    
    if score >= 90 {
        fmt.Println("Grade: A")
    } else if score >= 80 {
        fmt.Println("Grade: B")
    } else if score >= 70 {
        fmt.Println("Grade: C")
    } else if score >= 60 {
        fmt.Println("Grade: D")
    } else {
        fmt.Println("Grade: F")
    }
}
{{< /code-file >}}

{{< mermaid >}}
flowchart TD
    A[Start] --> B{score >= 90?}
    B -->|Yes| C[Grade: A]
    B -->|No| D{score >= 80?}
    D -->|Yes| E[Grade: B]
    D -->|No| F{score >= 70?}
    F -->|Yes| G[Grade: C]
    F -->|No| H{score >= 60?}
    H -->|Yes| I[Grade: D]
    H -->|No| J[Grade: F]
{{< /mermaid >}}

## if with Initialization

Go allows you to include a short statement before the condition. The variable is scoped to the if block:

{{< code-file filename="main.go" lang="go" >}}
package main

import "fmt"

func main() {
    // Traditional way
    x := 10
    if x > 5 {
        fmt.Println("x is greater than 5")
    }
    
    // With initialization - y only exists inside the if block
    if y := 20; y > 15 {
        fmt.Println("y is greater than 15")
    }
    // fmt.Println(y)  // Error! y is not defined here
}
{{< /code-file >}}

{{< callout type="tip" title="When to Use" >}}
Initialization in if is particularly useful when working with functions that return a value and an error. You'll see this pattern often in Go code.
{{< /callout >}}

### Common Pattern with Error Handling

{{< code-file filename="main.go" lang="go" >}}
package main

import (
    "fmt"
    "strconv"
)

func main() {
    // Convert string to int
    if num, err := strconv.Atoi("42"); err == nil {
        fmt.Println("Converted number:", num)
    } else {
        fmt.Println("Conversion failed:", err)
    }
}
{{< /code-file >}}

## The switch Statement

The `switch` statement is a cleaner way to write multiple if-else conditions:

{{< code-file filename="main.go" lang="go" >}}
package main

import "fmt"

func main() {
    day := "Tuesday"
    
    switch day {
    case "Monday":
        fmt.Println("Start of work week")
    case "Tuesday", "Wednesday", "Thursday":
        fmt.Println("Midweek")
    case "Friday":
        fmt.Println("TGIF!")
    case "Saturday", "Sunday":
        fmt.Println("Weekend!")
    default:
        fmt.Println("Invalid day")
    }
}
{{< /code-file >}}

{{< callout type="info" title="No break Needed" >}}
Unlike C or JavaScript, Go's switch cases don't fall through by default. You don't need `break` statements - each case automatically ends.
{{< /callout >}}

### switch with Multiple Values

A single case can match multiple values:

{{< code-file filename="main.go" lang="go" >}}
package main

import "fmt"

func main() {
    char := 'a'
    
    switch char {
    case 'a', 'e', 'i', 'o', 'u':
        fmt.Println("Vowel")
    default:
        fmt.Println("Consonant")
    }
}
{{< /code-file >}}

### switch without Expression

A switch without an expression is like a series of if-else statements:

{{< code-file filename="main.go" lang="go" >}}
package main

import "fmt"

func main() {
    score := 85
    
    switch {
    case score >= 90:
        fmt.Println("Excellent!")
    case score >= 80:
        fmt.Println("Good job!")
    case score >= 70:
        fmt.Println("Not bad")
    default:
        fmt.Println("Keep trying")
    }
}
{{< /code-file >}}

### switch with Initialization

Like `if`, switch can have an initialization statement:

{{< code-file filename="main.go" lang="go" >}}
package main

import (
    "fmt"
    "time"
)

func main() {
    switch today := time.Now().Weekday(); today {
    case time.Saturday, time.Sunday:
        fmt.Println("It's the weekend!")
    default:
        fmt.Println("It's a weekday")
    }
}
{{< /code-file >}}

### fallthrough Keyword

If you need C-style fall-through behavior, use the `fallthrough` keyword:

{{< code-file filename="main.go" lang="go" >}}
package main

import "fmt"

func main() {
    num := 1
    
    switch num {
    case 1:
        fmt.Println("One")
        fallthrough
    case 2:
        fmt.Println("Two (or fell through from One)")
        fallthrough
    case 3:
        fmt.Println("Three (or fell through)")
    default:
        fmt.Println("Default")
    }
}
{{< /code-file >}}

{{< callout type="warning" title="Use fallthrough Carefully" >}}
The `fallthrough` keyword is rarely used in Go. It unconditionally falls through to the next case regardless of that case's condition. Consider if you really need it.
{{< /callout >}}

## Type Switch

Go has a special type switch for checking the type of an interface value:

{{< code-file filename="main.go" lang="go" >}}
package main

import "fmt"

func checkType(x interface{}) {
    switch v := x.(type) {
    case int:
        fmt.Printf("Integer: %d\n", v)
    case string:
        fmt.Printf("String: %s\n", v)
    case bool:
        fmt.Printf("Boolean: %t\n", v)
    case float64:
        fmt.Printf("Float: %f\n", v)
    default:
        fmt.Printf("Unknown type: %T\n", v)
    }
}

func main() {
    checkType(42)
    checkType("hello")
    checkType(true)
    checkType(3.14)
    checkType([]int{1, 2, 3})
}
{{< /code-file >}}

{{< callout type="info" title="interface{}" >}}
`interface{}` (or `any` in Go 1.18+) is the empty interface that can hold any type. We'll cover interfaces in detail later in the course.
{{< /callout >}}

## Nested Conditionals

You can nest if statements and switches:

{{< code-file filename="main.go" lang="go" >}}
package main

import "fmt"

func main() {
    age := 25
    hasLicense := true
    
    if age >= 18 {
        if hasLicense {
            fmt.Println("You can drive")
        } else {
            fmt.Println("Get a license first")
        }
    } else {
        fmt.Println("Too young to drive")
    }
}
{{< /code-file >}}

{{< callout type="tip" title="Avoid Deep Nesting" >}}
Deeply nested conditionals are hard to read. Consider using early returns or restructuring your logic.
{{< /callout >}}

### Better: Early Return Pattern

{{< code-file filename="main.go" lang="go" >}}
package main

import "fmt"

func canDrive(age int, hasLicense bool) string {
    if age < 18 {
        return "Too young to drive"
    }
    if !hasLicense {
        return "Get a license first"
    }
    return "You can drive"
}

func main() {
    fmt.Println(canDrive(25, true))
    fmt.Println(canDrive(25, false))
    fmt.Println(canDrive(16, true))
}
{{< /code-file >}}

## No Ternary Operator

{{< callout type="warning" title="Go Design Choice" >}}
Go does not have a ternary operator (`condition ? value1 : value2`). Use an if-else statement instead. This keeps Go code explicit and readable.
{{< /callout >}}

{{< code-file filename="main.go" lang="go" >}}
package main

import "fmt"

func main() {
    age := 20
    
    // This won't work in Go:
    // status := age >= 18 ? "adult" : "minor"
    
    // Instead, use if-else:
    var status string
    if age >= 18 {
        status = "adult"
    } else {
        status = "minor"
    }
    fmt.Println(status)
}
{{< /code-file >}}

## Summary

Today you learned:

- Basic `if`, `else if`, and `else` statements
- Go's unique `if` with initialization syntax
- The `switch` statement for cleaner multiple conditions
- Switch without expression for range comparisons
- Type switches for checking interface types
- Why Go doesn't have a ternary operator

{{< progress-check id="day4-complete" >}}I understand conditionals in Go{{< /progress-check >}}

## Practice Exercise

1. Write a program that determines if a year is a leap year
2. Create a simple calculator that uses switch to handle different operations
3. Write a function that returns the name of a month given its number (1-12)
4. Implement a grade calculator using both if-else and switch

## Next Steps

Tomorrow, we'll explore **loops** - the only loop construct in Go: the versatile `for` loop!

Now, complete the quiz below to test your knowledge and unlock Day 5!
