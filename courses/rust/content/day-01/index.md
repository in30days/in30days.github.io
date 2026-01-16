---
title: "Introduction to Rust"
date: 2024-01-01
day: 1
weight: 1
draft: false
duration: "45 min"
difficulty: "intermediate"
description: "Learn what makes Rust unique, set up your environment, and run your first program"
objectives:
  - Understand the philosophy of Rust
  - Install Rust using rustup
  - Use Cargo to create and run a project
  - Write your first Hello World in Rust
prerequisites: []
tags: ["rust", "basics", "setup", "cargo"]
---

## What is Rust?

Rust is a modern systems programming language focused on **safety, speed, and concurrency**. It was started at Mozilla Research and is now maintained by the Rust Foundation.

### The Three Pillars of Rust

1. **Safety**: Rust prevents memory errors like buffer overflows and use-after-free at compile time.
2. **Speed**: Rust is as fast as C and C++ because it compiles to machine code and has no garbage collector.
3. **Concurrency**: Rust's ownership rules make it impossible to have data races in multi-threaded code.

{{< callout type="info" title="The Compiler is Your Friend" >}}
In Rust, the compiler is famously strict. While this might feel frustrating at first, it's actually acting as a mentor, preventing you from shipping code that would crash in production.
{{< /callout >}}

## Setting Up Your Environment

### 1. Install Rust via rustup

The official way to install Rust is using `rustup`, a tool for managing Rust versions.

- **Windows**: Download and run [rustup-init.exe](https://rustup.rs/).
- **macOS/Linux**: Run the following in your terminal:
  ```bash
  curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
  ```

### 2. Verify Installation

Open a new terminal and run:

```bash
rustc --version
cargo --version
```

### 3. Editor Setup

We highly recommend **Visual Studio Code** with the **rust-analyzer** extension. It provides excellent autocompletion and inline error checking.

## Meet Cargo: Rust's Swiss Army Knife

`cargo` is Rust's build system and package manager. You'll use it for almost everything.

| Command | Action |
|---------|--------|
| `cargo new` | Create a new project |
| `cargo build` | Compile the project |
| `cargo run` | Compile and run in one step |
| `cargo check` | Quickly check code for errors without building |
| `cargo test` | Run your tests |

## Your First Project

Let's create a project named `hello_rust`.

```bash
cargo new hello_rust
cd hello_rust
```

Look at the structure:
- `Cargo.toml`: Metadata and dependencies (like a package.json or requirements.txt).
- `src/main.rs`: Your Rust code.

Open `src/main.rs`:

{{< code-file filename="src/main.rs" lang="rust" >}}
fn main() {
    println!("Hello, Rustacean!");
}
{{< /code-file >}}

### Running the code

In your terminal, run:

```bash
cargo run
```

You should see "Hello, Rustacean!" printed to the screen.

## Summary

Today you learned:
- Why Rust is unique (Safety, Speed, Concurrency)
- How to install the Rust toolchain
- How to use Cargo to manage projects
- The structure of a basic Rust program

{{< progress-check id="day1-complete" >}}I have installed Rust and ran my first project{{< /progress-check >}}

## Practice Exercise

1. Change the message in `main.rs` to greet yourself.
2. Add a second `println!` statement.
3. Try running `cargo check` instead of `cargo run`. What's the difference?

## Next Steps

Tomorrow, we'll dive into **Variables and Mutability**—and learn why everything in Rust is "locked" by default!
