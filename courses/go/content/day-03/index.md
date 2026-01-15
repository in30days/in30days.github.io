---
title: "Operators and Expressions"
date: 2024-01-03
day: 3
weight: 3
draft: false
duration: "45 min"
difficulty: "beginner"
description: "Master arithmetic, comparison, logical, and assignment operators in Go"
objectives:
  - Use arithmetic operators for calculations
  - Compare values with comparison operators
  - Combine conditions with logical operators
  - Understand operator precedence
prerequisites: [2]
tags: ["operators", "expressions", "arithmetic"]
---

## Operators in Go

Operators are symbols that perform operations on values. Go provides several categories of operators for different purposes.

{{< mermaid >}}
mindmap
  root((Operators))
    Arithmetic
      + - * / %
      ++ --
    Comparison
      == !=
      < > <= >=
    Logical
      && || !
    Assignment
      = += -= *= /=
    Bitwise
      & | ^ << >>
{{< /mermaid >}}

## Arithmetic Operators

Arithmetic operators perform mathematical calculations:

{{< interactive-table >}}
| Operator | Name | Example |
|----------|------|---------|
| + | Addition | 5 + 3 = 8 |
| - | Subtraction | 5 - 3 = 2 |
| * | Multiplication | 5 * 3 = 15 |
| / | Division | 10 / 3 = 3 |
| % | Modulus (remainder) | 10 % 3 = 1 |
{{< /interactive-table >}}

{{< code-file filename="main.go" lang="go" >}}
package main

import "fmt"

func main() {
    a, b := 10, 3
    
    fmt.Println("Addition:", a + b)       // 13
    fmt.Println("Subtraction:", a - b)    // 7
    fmt.Println("Multiplication:", a * b) // 30
    fmt.Println("Division:", a / b)       // 3 (integer division)
    fmt.Println("Modulus:", a % b)        // 1
}
{{< /code-file >}}

{{< callout type="warning" title="Integer Division" >}}
When dividing two integers, Go performs integer division and truncates the decimal part. Use float64 if you need decimal results.
{{< /callout >}}

### Float Division

{{< code-file filename="main.go" lang="go" >}}
package main

import "fmt"

func main() {
    // Integer division
    fmt.Println(10 / 3)       // 3
    
    // Float division
    fmt.Println(10.0 / 3.0)   // 3.3333...
    
    // Mixed - convert to float first
    a, b := 10, 3
    fmt.Println(float64(a) / float64(b))  // 3.3333...
}
{{< /code-file >}}

### Increment and Decrement

Go has `++` and `--` operators, but they're statements, not expressions:

{{< code-file filename="main.go" lang="go" >}}
package main

import "fmt"

func main() {
    x := 5
    x++           // x is now 6
    fmt.Println(x)
    
    x--           // x is now 5
    fmt.Println(x)
    
    // Note: These don't work in Go:
    // y := x++   // Error! ++ is a statement, not an expression
    // ++x        // Error! No prefix increment in Go
}
{{< /code-file >}}

{{< callout type="info" title="Go Simplicity" >}}
Go only has postfix `x++` and `x--`. There's no prefix `++x` or `--x`, and you can't use them in expressions. This prevents confusing code!
{{< /callout >}}

## Comparison Operators

Comparison operators compare two values and return a boolean:

{{< interactive-table >}}
| Operator | Name | Example |
|----------|------|---------|
| == | Equal to | 5 == 5 is true |
| != | Not equal to | 5 != 3 is true |
| < | Less than | 3 < 5 is true |
| > | Greater than | 5 > 3 is true |
| <= | Less than or equal | 3 <= 3 is true |
| >= | Greater than or equal | 5 >= 5 is true |
{{< /interactive-table >}}

{{< code-file filename="main.go" lang="go" >}}
package main

import "fmt"

func main() {
    a, b := 10, 20
    
    fmt.Println("a == b:", a == b)  // false
    fmt.Println("a != b:", a != b)  // true
    fmt.Println("a < b:", a < b)    // true
    fmt.Println("a > b:", a > b)    // false
    fmt.Println("a <= b:", a <= b)  // true
    fmt.Println("a >= b:", a >= b)  // false
}
{{< /code-file >}}

### Comparing Strings

Strings are compared lexicographically (dictionary order):

{{< code-file filename="main.go" lang="go" >}}
package main

import "fmt"

func main() {
    s1 := "apple"
    s2 := "banana"
    s3 := "apple"
    
    fmt.Println(s1 == s3)  // true
    fmt.Println(s1 < s2)   // true ("apple" comes before "banana")
    fmt.Println(s1 > s2)   // false
}
{{< /code-file >}}

## Logical Operators

Logical operators combine boolean expressions:

{{< interactive-table >}}
| Operator | Name | Description |
|----------|------|-------------|
| && | AND | True if both operands are true |
| \|\| | OR | True if at least one operand is true |
| ! | NOT | Inverts the boolean value |
{{< /interactive-table >}}

{{< code-file filename="main.go" lang="go" >}}
package main

import "fmt"

func main() {
    a, b := true, false
    
    fmt.Println("a && b:", a && b)  // false
    fmt.Println("a || b:", a || b)  // true
    fmt.Println("!a:", !a)          // false
    fmt.Println("!b:", !b)          // true
}
{{< /code-file >}}

### Short-Circuit Evaluation

Go uses short-circuit evaluation for logical operators:

{{< code-file filename="main.go" lang="go" >}}
package main

import "fmt"

func main() {
    x := 5
    
    // With &&: if first is false, second is not evaluated
    if false && (x > 0) {
        fmt.Println("This won't print")
    }
    
    // With ||: if first is true, second is not evaluated
    if true || (x > 100) {
        fmt.Println("This prints - second condition not checked")
    }
}
{{< /code-file >}}

### Practical Example

{{< code-file filename="main.go" lang="go" >}}
package main

import "fmt"

func main() {
    age := 25
    hasLicense := true
    
    // Can this person drive?
    canDrive := age >= 18 && hasLicense
    fmt.Println("Can drive:", canDrive)  // true
    
    // Is this person a minor or senior?
    isMinorOrSenior := age < 18 || age >= 65
    fmt.Println("Minor or Senior:", isMinorOrSenior)  // false
}
{{< /code-file >}}

## Assignment Operators

Assignment operators assign and modify values:

{{< interactive-table >}}
| Operator | Example | Equivalent |
|----------|---------|------------|
| = | x = 5 | x = 5 |
| += | x += 3 | x = x + 3 |
| -= | x -= 3 | x = x - 3 |
| *= | x *= 3 | x = x * 3 |
| /= | x /= 3 | x = x / 3 |
| %= | x %= 3 | x = x % 3 |
{{< /interactive-table >}}

{{< code-file filename="main.go" lang="go" >}}
package main

import "fmt"

func main() {
    x := 10
    
    x += 5   // x is now 15
    fmt.Println(x)
    
    x -= 3   // x is now 12
    fmt.Println(x)
    
    x *= 2   // x is now 24
    fmt.Println(x)
    
    x /= 4   // x is now 6
    fmt.Println(x)
    
    x %= 4   // x is now 2
    fmt.Println(x)
}
{{< /code-file >}}

## Bitwise Operators

Bitwise operators work on individual bits:

{{< interactive-table >}}
| Operator | Name | Description |
|----------|------|-------------|
| & | AND | Sets bit if both bits are 1 |
| \| | OR | Sets bit if at least one bit is 1 |
| ^ | XOR | Sets bit if exactly one bit is 1 |
| << | Left shift | Shifts bits left |
| >> | Right shift | Shifts bits right |
{{< /interactive-table >}}

{{< code-file filename="main.go" lang="go" >}}
package main

import "fmt"

func main() {
    a := 5  // Binary: 0101
    b := 3  // Binary: 0011
    
    fmt.Printf("a & b = %d (AND)\n", a & b)   // 1 (0001)
    fmt.Printf("a | b = %d (OR)\n", a | b)    // 7 (0111)
    fmt.Printf("a ^ b = %d (XOR)\n", a ^ b)   // 6 (0110)
    
    // Bit shifting
    fmt.Printf("a << 1 = %d\n", a << 1)  // 10 (1010)
    fmt.Printf("a >> 1 = %d\n", a >> 1)  // 2 (0010)
}
{{< /code-file >}}

{{< callout type="tip" title="Practical Use" >}}
Bit shifting is often used for efficient multiplication/division by powers of 2. `x << 1` is `x * 2`, and `x >> 1` is `x / 2`.
{{< /callout >}}

## Operator Precedence

Go operators follow a specific order of precedence:

{{< interactive-table >}}
| Priority | Operators |
|----------|-----------|
| Highest | * / % << >> & |
| | + - \| ^ |
| | == != < <= > >= |
| | && |
| Lowest | \|\| |
{{< /interactive-table >}}

{{< code-file filename="main.go" lang="go" >}}
package main

import "fmt"

func main() {
    // Multiplication before addition
    result := 2 + 3 * 4
    fmt.Println(result)  // 14, not 20
    
    // Use parentheses to change order
    result = (2 + 3) * 4
    fmt.Println(result)  // 20
    
    // Comparison before logical
    x := 5
    check := x > 3 && x < 10  // (x > 3) && (x < 10)
    fmt.Println(check)        // true
}
{{< /code-file >}}

## String Concatenation

The `+` operator also concatenates strings:

{{< code-file filename="main.go" lang="go" >}}
package main

import "fmt"

func main() {
    firstName := "Go"
    lastName := "pher"
    
    fullName := firstName + " " + lastName
    fmt.Println(fullName)  // "Go pher"
    
    // Using += for string building
    greeting := "Hello"
    greeting += ", "
    greeting += "World!"
    fmt.Println(greeting)  // "Hello, World!"
}
{{< /code-file >}}

## Summary

Today you learned:

- Arithmetic operators: `+`, `-`, `*`, `/`, `%`, `++`, `--`
- Comparison operators: `==`, `!=`, `<`, `>`, `<=`, `>=`
- Logical operators: `&&`, `||`, `!`
- Assignment operators: `=`, `+=`, `-=`, `*=`, `/=`, `%=`
- Bitwise operators: `&`, `|`, `^`, `<<`, `>>`
- Operator precedence and when to use parentheses

{{< progress-check id="day3-complete" >}}I understand operators in Go{{< /progress-check >}}

## Practice Exercise

1. Write a program that calculates the area of a rectangle
2. Check if a number is even or odd using the modulus operator
3. Create a program that uses logical operators to check multiple conditions
4. Experiment with operator precedence using parentheses

## Next Steps

Tomorrow, we'll learn about **control flow with conditionals** - making decisions in your Go programs!

Now, complete the quiz below to test your knowledge and unlock Day 4!
