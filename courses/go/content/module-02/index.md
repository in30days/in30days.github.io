---
title: "Variables and Data Types"
date: 2024-01-02
module: 2
weight: 2
draft: false
duration: "50 min"
difficulty: "beginner"
description: "Learn how to declare variables and work with Go's basic data types"
objectives:
  - Declare variables using var and short declaration syntax
  - Understand Go's basic data types
  - Work with zero values and type inference
  - Use constants for fixed values
prerequisites: [1]
tags: ["variables", "data-types", "constants"]
---

## Variables in Go

Variables are containers that store data. In Go, every variable has a specific type that determines what kind of data it can hold.

{{< callout type="info" title="Static Typing" >}}
Go is statically typed, meaning variable types are determined at compile time. This catches many errors before your program runs!
{{< /callout >}}

## Declaring Variables

Go provides several ways to declare variables.

### Using var Keyword

The most explicit way to declare a variable:

{{< code-file filename="main.go" lang="go" >}}
package main

import "fmt"

func main() {
    var name string = "Gopher"
    var age int = 25
    var isActive bool = true
    
    fmt.Println(name, age, isActive)
}
{{< /code-file >}}

### Type Inference

Go can infer the type from the value:

{{< code-file filename="main.go" lang="go" >}}
var name = "Gopher"    // Go infers string
var age = 25           // Go infers int
var price = 19.99      // Go infers float64
{{< /code-file >}}

### Short Declaration (:=)

Inside functions, you can use the short declaration syntax:

{{< code-file filename="main.go" lang="go" >}}
package main

import "fmt"

func main() {
    name := "Gopher"      // Short declaration
    age := 25
    isActive := true
    
    fmt.Println(name, age, isActive)
}
{{< /code-file >}}

{{< callout type="warning" title="Important" >}}
The `:=` syntax can only be used inside functions. At package level, you must use `var`.
{{< /callout >}}

### Multiple Variable Declaration

Declare multiple variables at once:

{{< code-file filename="main.go" lang="go" >}}
// Multiple variables of same type
var x, y, z int = 1, 2, 3

// Multiple variables of different types
var (
    name    string = "Gopher"
    age     int    = 25
    balance float64 = 100.50
)

// Short declaration for multiple variables
a, b, c := 1, "hello", true
{{< /code-file >}}

## Zero Values

In Go, variables declared without an initial value get a **zero value**:

{{< interactive-table >}}
| Type | Zero Value |
|------|------------|
| int, int8, int16, int32, int64 | 0 |
| uint, uint8, uint16, uint32, uint64 | 0 |
| float32, float64 | 0.0 |
| bool | false |
| string | "" (empty string) |
| pointer, slice, map, channel, function, interface | nil |
{{< /interactive-table >}}

{{< code-file filename="main.go" lang="go" >}}
package main

import "fmt"

func main() {
    var i int
    var f float64
    var b bool
    var s string
    
    fmt.Printf("int: %d, float: %f, bool: %t, string: %q\n", i, f, b, s)
    // Output: int: 0, float: 0.000000, bool: false, string: ""
}
{{< /code-file >}}

## Basic Data Types

Go has several built-in data types organized into categories:

{{< mermaid >}}
mindmap
  root((Go Types))
    Numeric
      int, int8, int16, int32, int64
      uint, uint8, uint16, uint32, uint64
      float32, float64
      complex64, complex128
    Boolean
      bool
    String
      string
    Other
      byte (alias for uint8)
      rune (alias for int32)
{{< /mermaid >}}

### Integer Types

{{< interactive-table >}}
| Type | Size | Range |
|------|------|-------|
| int8 | 8 bits | -128 to 127 |
| int16 | 16 bits | -32,768 to 32,767 |
| int32 | 32 bits | -2B to 2B |
| int64 | 64 bits | Very large range |
| int | Platform dependent | 32 or 64 bits |
| uint8 | 8 bits | 0 to 255 |
| uint16 | 16 bits | 0 to 65,535 |
| uint32 | 32 bits | 0 to 4B |
| uint64 | 64 bits | Very large range |
{{< /interactive-table >}}

{{< code-file filename="main.go" lang="go" >}}
package main

import "fmt"

func main() {
    var a int = 42
    var b int8 = 127
    var c uint = 100
    var d int64 = 9223372036854775807
    
    fmt.Printf("a: %d, b: %d, c: %d, d: %d\n", a, b, c, d)
}
{{< /code-file >}}

{{< callout type="tip" title="Which int to use?" >}}
Use `int` for most cases - it's the most common and efficient. Use specific sizes (int8, int32, etc.) only when you need to control memory usage or match external data formats.
{{< /callout >}}

### Floating-Point Types

{{< code-file filename="main.go" lang="go" >}}
package main

import "fmt"

func main() {
    var f32 float32 = 3.14159
    var f64 float64 = 3.141592653589793
    
    fmt.Printf("float32: %f\n", f32)
    fmt.Printf("float64: %.15f\n", f64)
}
{{< /code-file >}}

- `float32` - 32 bits, ~7 decimal digits precision
- `float64` - 64 bits, ~15 decimal digits precision (recommended default)

### Boolean Type

{{< code-file filename="main.go" lang="go" >}}
package main

import "fmt"

func main() {
    var isGo bool = true
    var isFun bool = true
    
    fmt.Println("Go is awesome:", isGo && isFun)
}
{{< /code-file >}}

### String Type

Strings in Go are immutable sequences of bytes (usually UTF-8 text):

{{< code-file filename="main.go" lang="go" >}}
package main

import "fmt"

func main() {
    greeting := "Hello, Go!"
    multiline := `This is a
    multi-line string
    using backticks`
    
    fmt.Println(greeting)
    fmt.Println(multiline)
    fmt.Println("Length:", len(greeting))
}
{{< /code-file >}}

### Byte and Rune

- `byte` - alias for `uint8`, represents a single byte
- `rune` - alias for `int32`, represents a Unicode code point

{{< code-file filename="main.go" lang="go" >}}
package main

import "fmt"

func main() {
    var b byte = 'A'          // ASCII value 65
    var r rune = '世'          // Unicode code point
    
    fmt.Printf("byte: %c (%d)\n", b, b)
    fmt.Printf("rune: %c (%d)\n", r, r)
}
{{< /code-file >}}

## Constants

Constants are values that don't change. Use the `const` keyword:

{{< code-file filename="main.go" lang="go" >}}
package main

import "fmt"

const Pi = 3.14159
const (
    StatusOK    = 200
    StatusError = 500
)

func main() {
    const greeting = "Hello"
    
    fmt.Println(Pi)
    fmt.Println(StatusOK, StatusError)
    fmt.Println(greeting)
}
{{< /code-file >}}

### iota - The Constant Generator

`iota` generates sequential integer constants:

{{< code-file filename="main.go" lang="go" >}}
package main

import "fmt"

const (
    Sunday = iota    // 0
    Monday           // 1
    Tuesday          // 2
    Wednesday        // 3
    Thursday         // 4
    Friday           // 5
    Saturday         // 6
)

const (
    _  = iota             // Skip 0
    KB = 1 << (10 * iota) // 1024
    MB                    // 1048576
    GB                    // 1073741824
)

func main() {
    fmt.Println("Wednesday is day:", Wednesday)
    fmt.Printf("1 KB = %d bytes\n", KB)
    fmt.Printf("1 MB = %d bytes\n", MB)
}
{{< /code-file >}}

## Type Conversion

Go requires explicit type conversion (no automatic conversion):

{{< code-file filename="main.go" lang="go" >}}
package main

import "fmt"

func main() {
    var i int = 42
    var f float64 = float64(i)    // int to float64
    var u uint = uint(f)          // float64 to uint
    
    fmt.Printf("int: %d, float64: %f, uint: %d\n", i, f, u)
    
    // String conversion
    var num int = 65
    var char string = string(num)  // Converts to "A" (ASCII)
    fmt.Println(char)
}
{{< /code-file >}}

{{< callout type="warning" title="No Implicit Conversion" >}}
Go does not automatically convert between types, even between int and int64. You must explicitly convert using `Type(value)`.
{{< /callout >}}

## Printf Format Verbs

Use `fmt.Printf` with format verbs for formatted output:

{{< interactive-table >}}
| Verb | Description |
|------|-------------|
| %d | Decimal integer |
| %f | Floating-point |
| %s | String |
| %t | Boolean |
| %v | Default format |
| %T | Type of value |
| %q | Quoted string |
| %c | Character (rune) |
| %b | Binary |
| %x | Hexadecimal |
{{< /interactive-table >}}

{{< code-file filename="main.go" lang="go" >}}
package main

import "fmt"

func main() {
    name := "Gopher"
    age := 10
    height := 1.75
    
    fmt.Printf("Name: %s\n", name)
    fmt.Printf("Age: %d years\n", age)
    fmt.Printf("Height: %.2f meters\n", height)
    fmt.Printf("Type of name: %T\n", name)
    fmt.Printf("Default format: %v, %v, %v\n", name, age, height)
}
{{< /code-file >}}

## Summary

Today you learned:

- How to declare variables using `var` and `:=`
- Go's basic data types (integers, floats, bools, strings)
- Zero values and type inference
- How to use constants and `iota`
- Explicit type conversion in Go
- Printf format verbs for output

{{< progress-check id="day2-complete" >}}I understand variables and data types in Go{{< /progress-check >}}

## Practice Exercise

1. Create variables of different types and print them
2. Experiment with zero values - declare variables without values
3. Create a set of constants for HTTP status codes using iota
4. Practice type conversion between int and float64

## Next Steps

Tomorrow, we'll explore **operators and expressions** - how to perform calculations and comparisons in Go!

Now, complete the quiz below to test your knowledge and unlock Day 3!
