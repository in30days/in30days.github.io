---
title: "Working with JSON"
date: 2024-01-24
day: 24
weight: 24
draft: false
duration: "45 min"
difficulty: "beginner"
description: "Learn how to store and exchange data using JSON, the language of the web."
objectives:
  - Understand what JSON is and why it's used
  - Parse JSON strings into Python dictionaries
  - Convert Python data into JSON format
  - Save and load JSON data from files
prerequisites: [23]
tags: ["json", "data", "basics"]
---

## The Language of Data

In Day 13, we learned to save text files. But text files can be messy. How do we save complex data like a user profile? We use **JSON** (JavaScript Object Notation).

JSON is the standard format for exchanging data between applications and the web. It looks almost exactly like a Python dictionary!

## The `json` Module

Python has a built-in module called `json` to handle this format.

{{< code-file filename="json_parse.py" lang="python" >}}
import json

# A JSON string (imagine this came from a website)
user_json = '{"name": "Alice", "age": 25, "is_student": true}'

# Parse JSON into a Python Dictionary (Loads)
user_dict = json.loads(user_json)

print(user_dict["name"]) # Alice
{{< /code-file >}}

## Python to JSON (Dumps)

When you want to send data or save it, you convert your dictionary back to a JSON string.

{{< code-file filename="json_generate.py" lang="python" >}}
import json

data = {
    "title": "Inception",
    "year": 2010,
    "actors": ["Leo", "Tom", "Elliot"]
}

# Convert to JSON string (Dumps)
json_string = json.dumps(data, indent=4) # indent makes it pretty!
print(json_string)
{{< /code-file >}}

## Saving to a File

Instead of strings, we usually work with actual files.

{{< code-file filename="json_files.py" lang="python" >}}
import json

# Saving (Dump)
with open("settings.json", "w") as f:
    json.dump(data, f)

# Loading (Load)
with open("settings.json", "r") as f:
    loaded_data = json.load(f)
    print(loaded_data)
{{< /code-file >}}

---

## Interactive Practice

Compare the syntax between Python and JSON. Note how Python's `True` becomes `true` in JSON.

{{< interactive-table >}}
| Feature | Python | JSON |
| :--- | :--- | :--- |
| Boolean | `True / False` | `true / false` |
| Empty Value | `None` | `null` |
| Dictionary | `{"key": "value"}` | `{"key": "value"}` |
| List | `[1, 2, 3]` | `[1, 2, 3]` |
{{< /interactive-table >}}

{{< quiz >}}
