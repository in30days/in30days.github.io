---
title: "Introduction to Go"
date: 2024-01-01
module: 1
weight: 1
draft: false
duration: "45 min"
difficulty: "beginner"
description: "Learn what Go is, set up your development environment, and write your first Go program"
objectives:
  - Understand what Go is and why it's popular
  - Install Go on your computer
  - Write and run your first Go program
  - Use the Go Playground for quick experimentation
prerequisites: []
tags: ["basics", "setup", "hello-world"]
---

## What is Go?

Go (often called Golang) is an open-source programming language developed at Google by Robert Griesemer, Rob Pike, and Ken Thompson. First released in 2009, Go was designed to address common criticisms of other languages while maintaining their positive characteristics.

{{< callout type="info" title="Why 'Golang'?" >}}
The language is officially called "Go," but "Golang" is commonly used because "go" is a common English word that's hard to search for. The domain golang.org was chosen for the same reason.
{{< /callout >}}

### Why Learn Go?

Go has become incredibly popular for building modern software. Here's why:

{{< mermaid >}}
mindmap
  root((Go))
    Simple
      Clean syntax
      Small language spec
      Easy to learn
    Fast
      Compiled language
      No virtual machine
      Quick compilation
    Concurrent
      Goroutines
      Channels
      Built-in support
    Reliable
      Static typing
      Garbage collection
      Great tooling
    Practical
      Standard library
      Cross-platform
      Single binary
{{< /mermaid >}}

### Who Uses Go?

{{< interactive-table >}}
| Company | Use Case |
|---------|----------|
| Google | Infrastructure, cloud services |
| Docker | Container runtime |
| Kubernetes | Container orchestration |
| Uber | High-performance services |
| Twitch | Video streaming backend |
| Dropbox | Performance-critical systems |
{{< /interactive-table >}}

### Go's Key Features

{{< interactive-table >}}
| Feature | Description |
|---------|-------------|
| Compiled | Code compiles to native machine code |
| Statically Typed | Types are checked at compile time |
| Garbage Collected | Automatic memory management |
| Concurrent | Built-in goroutines and channels |
| Simple | Only 25 keywords in the language |
| Fast Compilation | Compiles in seconds, not minutes |
{{< /interactive-table >}}

## Installing Go

Let's get Go installed on your computer.

### Step 1: Download Go

1. Visit [go.dev/dl](https://go.dev/dl/)
2. Download the installer for your operating system
3. Run the installer and follow the prompts

{{< callout type="warning" title="Version Note" >}}
This course uses Go 1.21 or later. Make sure you download a recent version to access all the features we'll cover.
{{< /callout >}}

### Step 2: Verify Installation

Open your terminal (Command Prompt on Windows, Terminal on macOS/Linux) and run:

{{< code-file filename="terminal" lang="bash" >}}
go version
{{< /code-file >}}

You should see output like:

```
go version go1.21.0 darwin/amd64
```

### Step 3: Check Your Environment

Run this command to see your Go environment:

{{< code-file filename="terminal" lang="bash" >}}
go env GOPATH GOROOT
{{< /code-file >}}

- **GOROOT**: Where Go is installed
- **GOPATH**: Your workspace for Go projects (usually `~/go`)

{{< callout type="tip" title="Modern Go" >}}
With Go modules (introduced in Go 1.11), you can create projects anywhere on your system. You don't need to work inside GOPATH anymore.
{{< /callout >}}

## Your First Go Program

Let's write the classic "Hello, World!" program.

### Using the Go Playground

The fastest way to try Go is the [Go Playground](https://go.dev/play/) - an online editor that runs Go code in your browser.

Visit the playground and enter this code:

{{< code-file filename="main.go" lang="go" >}}
package main

import "fmt"

func main() {
    fmt.Println("Hello, World!")
}
{{< /code-file >}}

Click "Run" and you'll see:

```
Hello, World!
```

### Creating a Local Project

Let's create a proper Go project on your computer.

**Step 1: Create a project directory**

{{< code-file filename="terminal" lang="bash" >}}
mkdir hello
cd hello
{{< /code-file >}}

**Step 2: Initialize a Go module**

{{< code-file filename="terminal" lang="bash" >}}
go mod init hello
{{< /code-file >}}

This creates a `go.mod` file that tracks your project's dependencies.

**Step 3: Create the main file**

Create a file named `main.go` with the following content:

{{< code-file filename="main.go" lang="go" >}}
package main

import "fmt"

func main() {
    fmt.Println("Hello, World!")
    fmt.Println("Welcome to Go in 30 Days!")
}
{{< /code-file >}}

**Step 4: Run your program**

{{< code-file filename="terminal" lang="bash" >}}
go run main.go
{{< /code-file >}}

Output:
```
Hello, World!
Welcome to Go in 30 Days!
```

## Understanding the Code

Let's break down what we wrote:

{{< mermaid >}}
flowchart TB
    A["package main"] --> B["Declares this is an executable program"]
    C["import \"fmt\""] --> D["Imports the formatting package"]
    E["func main()"] --> F["Entry point - where program starts"]
    G["fmt.Println()"] --> H["Prints text with a newline"]
{{< /mermaid >}}

### Package Declaration

Every Go file starts with a package declaration:

```go
package main
```

- `package main` is special - it tells Go this is an executable program
- Other packages (like `fmt`) are libraries that provide functionality

### Import Statement

```go
import "fmt"
```

- `import` brings in code from other packages
- `fmt` is the formatting package for input/output
- You can import multiple packages:

```go
import (
    "fmt"
    "time"
)
```

### The main Function

```go
func main() {
    // code here
}
```

- `func` declares a function
- `main` is the entry point - Go starts here
- `{}` contains the function body

### Printing Output

```go
fmt.Println("Hello, World!")
```

- `fmt.Println` prints a line of text
- Text in quotes is a **string**
- `Println` adds a newline at the end

## Go Commands

Go comes with powerful built-in tools:

{{< interactive-table >}}
| Command | Description |
|---------|-------------|
| `go run` | Compile and run a program |
| `go build` | Compile a program into an executable |
| `go fmt` | Format your code automatically |
| `go mod init` | Initialize a new module |
| `go mod tidy` | Clean up module dependencies |
| `go test` | Run tests |
{{< /interactive-table >}}

### Building an Executable

Instead of `go run`, you can build a standalone executable:

{{< code-file filename="terminal" lang="bash" >}}
go build -o hello
{{< /code-file >}}

This creates an executable file called `hello` (or `hello.exe` on Windows) that you can run directly:

{{< code-file filename="terminal" lang="bash" >}}
./hello
{{< /code-file >}}

{{< callout type="tip" title="Cross-Compilation" >}}
Go can compile for different operating systems! Set GOOS and GOARCH to build for other platforms:
```bash
GOOS=linux GOARCH=amd64 go build -o hello-linux
```
{{< /callout >}}

## Code Formatting with go fmt

Go has a standard code formatter. Run it on your code:

{{< code-file filename="terminal" lang="bash" >}}
go fmt main.go
{{< /code-file >}}

This automatically formats your code to Go's standard style. No more debates about tabs vs spaces!

## Summary

Today you learned:

- Go is a simple, fast, and concurrent programming language
- How to install Go and verify your installation
- How to write and run your first Go program
- The structure of a Go program (package, import, main)
- Essential Go commands (`go run`, `go build`, `go fmt`)

{{< progress-check id="day1-complete" >}}I've installed Go and can run programs{{< /progress-check >}}

## Practice Exercise

Before moving on, try these exercises:

1. Modify the hello program to print your name
2. Add a third `fmt.Println` statement
3. Try using `fmt.Print` instead of `fmt.Println` - what's different?
4. Build an executable and run it

## Next Steps

Tomorrow, we'll dive into **variables and data types** - the foundation of every Go program!

Now, complete the quiz below to test your knowledge and unlock Module 2!
