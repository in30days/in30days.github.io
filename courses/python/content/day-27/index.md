---
title: "Pip and Virtual Environments"
date: 2024-01-27
day: 27
weight: 27
draft: false
duration: "45 min"
difficulty: "beginner"
description: "Learn how to manage external packages and keep your projects organized."
objectives:
  - Understand the role of 'pip' (the package manager)
  - Install external libraries (like requests)
  - Create and activate a Virtual Environment (venv)
  - Understand why project isolation is important
prerequisites: [26]
tags: ["pip", "venv", "dependencies", "basics"]
---

## Beyond the Standard Library

The Python community has created over 400,000 external packages that you can use in your own projects. These range from website builders to AI tools. Today, we learn how to manage them.

## What is `pip`?

**pip** is the standard package manager for Python. It allows you to download and install libraries from the [Python Package Index (PyPI)](https://pypi.org/).

### Common Commands:
```bash
# Install a package
pip install requests

# List installed packages
pip list

# Uninstall a package
pip uninstall requests
```

## The Problem: Dependency Hell

If you install all packages globally on your computer, eventually two projects will need different versions of the same package, causing a crash. We fix this with **Virtual Environments**.

## Virtual Environments (`venv`)

A virtual environment is a "sandbox" for your project. It contains its own copy of Python and its own set of packages.

### Setting one up (Windows/macOS/Linux):

{{< code-file filename="terminal_commands.sh" lang="bash" >}}
# 1. Create the environment (name it 'venv')
python -m venv venv

# 2. Activate it (Windows)
.\venv\Scripts\activate

# 2. Activate it (macOS/Linux)
source venv/bin/activate

# 3. Your terminal should now show (venv) at the start!
{{< /code-file >}}

## Using `requirements.txt`

When sharing your project, you should list your dependencies in a text file so others can install them with one command.

{{< code-file filename="sharing.sh" lang="bash" >}}
# Create the file
pip freeze > requirements.txt

# Install from the file
pip install -r requirements.txt
{{< /code-file >}}

---

## Interactive Practice

Imagine you are starting a Data Science project. You need `pandas` and `numpy`. Would you install them globally or in a virtual environment?

{{< interactive-table >}}
| Concept | Description |
| :--- | :--- |
| **pip** | Downloads packages from the web |
| **venv** | Creates a project sandbox |
| **PyPI** | The "App Store" for Python packages |
{{< /interactive-table >}}

{{< quiz >}}
