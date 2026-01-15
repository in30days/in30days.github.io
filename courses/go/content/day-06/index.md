---
title: "Functions"
date: 2024-01-06
day: 6
weight: 6
draft: false
duration: "55 min"
difficulty: "beginner"
description: "Learn how to define and use functions, including Go's powerful multiple return values"
objectives:
  - Define and call basic functions
  - Work with parameters and return types
  - Return multiple values from a single function
  - Use named return values
  - Understand variadic functions
prerequisites: [5]
tags: ["functions", "parameters", "return-values", "variadic"]
---

## The Building Blocks of Go

Functions are central to Go. They allow you to group code into reusable units, making your programs more modular and easier to maintain.

## Basic Function Syntax

Here's how you define a function in Go:

{{< code-file filename="main.go" lang="go" >}}
package main

import "fmt"

// func Name(parameter list) return_type { ... }
func sayHello(name string) {
    fmt.Printf("Hello, %s!\n", name)
}

func main() {
    sayHello("Gopher")
}
{{< /code-file >}}

## Parameters and Return Values

If a function returns a value, you must specify the type after the parameters:

{{< code-file filename="main.go" lang="go" >}}
package main

import "fmt"

func add(a int, b int) int {
    return a + b
}

func main() {
    result := add(10, 20)
    fmt.Println("Sum:", result)
}
{{< /code-file >}}

### Shorthand for Parameters

When consecutive parameters have the same type, you can omit the type for all but the last one:

```go
func add(a, b int) int {
    return a + b
}

func complexOp(a, b int, name string, active bool) {
    // ...
}
```

## Multiple Return Values

One of Go's most distinctive and powerful features is the ability for a function to return multiple values. This is frequently used for returning both a result and an error.

{{< code-file filename="main.go" lang="go" >}}
package main

import (
    "errors"
    "fmt"
)

func divide(a, b float64) (float64, error) {
    if b == 0 {
        return 0, errors.New("cannot divide by zero")
    }
    return a / b, nil
}

func main() {
    result, err := divide(10, 2)
    if err != nil {
        fmt.Println("Error:", err)
    } else {
        fmt.Println("Result:", result)
    }
    
    // Using the blank identifier to ignore the error (not recommended!)
    val, _ := divide(10, 5)
    fmt.Println("Value:", val)
}
{{< /code-file >}}

## Named Return Values

Go's return values can be named. If they are named, they are treated as variables defined at the top of the function. A `return` statement without arguments (called a "naked" return) will return the current values of the named return variables.

{{< code-file filename="main.go" lang="go" >}}
package main

import "fmt"

func split(sum int) (x, y int) {
    x = sum * 4 / 9
    y = sum - x
    return // returns x and y
}

func main() {
    fmt.Println(split(17))
}
{{< /code-file >}}

{{< callout type="tip" title="Use Named Returns for Clarity" >}}
Named return values are great for documenting the meaning of the return values, especially in functions with many returns. However, naked returns should only be used in short functions as they can harm readability in longer ones.
{{< /callout >}}

## Variadic Functions

A variadic function can be called with any number of trailing arguments. `fmt.Println` is a common example. To define one, use `...` before the type of the last parameter.

{{< code-file filename="main.go" lang="go" >}}
package main

import "fmt"

func sumAll(nums ...int) int {
    total := 0
    // nums is treated as a slice
    for _, num := range nums {
        total += num
    }
    return total
}

func main() {
    fmt.Println(sumAll(1, 2))
    fmt.Println(sumAll(1, 2, 3, 4, 5))
    
    // Passing a slice to a variadic function
    scores := []int{10, 20, 30}
    fmt.Println(sumAll(scores...))
}
{{< /code-file >}}

## Function Scope and Pass by Value

In Go, **everything is passed by value**. This means that when you pass a variable to a function, Go creates a copy of that variable. Changes made inside the function do not affect the original variable (unless you use pointers, which we'll cover later).

{{< code-file filename="main.go" lang="go" >}}
package main

import "fmt"

func changeValue(val int) {
    val = 100 // only changes the local copy
}

func main() {
    x := 10
    changeValue(x)
    fmt.Println(x) // Still 10!
}
{{< /code-file >}}

## Summary

Today you learned:

- Basic function definition and calling
- Parameter shorthand syntax
- How to return multiple values from a function
- Using named return values for clarity
- Writing variadic functions with `...`
- Understanding that Go passes everything by value

{{< progress-check id="day6-complete" >}}I understand Go functions{{< /progress-check >}}

## Practice Exercise

1. Write a function `calculate` that takes two integers and returns their sum, difference, and product.
2. Create a variadic function that finds the maximum value among the provided arguments.
3. Write a function that takes a string and returns the string itself along with its length.
4. Implement a function that calculates the area of a circle (given the radius) and returns both the area and an error if the radius is negative.

## Next Steps

Tomorrow, we'll wrap up our first week with a **Review and Practice** session to solidify everything you've learned!

Complete the quiz to wrap up Day 6!
