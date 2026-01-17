---
title: "Project: Personal Finance Tracker"
date: 2024-01-28
module: 28
weight: 28
draft: false
duration: "120 min"
difficulty: "beginner"
description: "Build a professional-grade CLI tool to manage expenses, using JSON for storage and math for analysis."
objectives:
  - Model expense data using dictionaries
  - Implement JSON-based data persistence
  - Perform statistical analysis on collections
  - Build a multi-feature CLI interface
prerequisites: [27]
tags: ["project", "cli", "json", "basics"]
---

## Week 4 Milestone

You've learned the "Power Features" of Python: Standard library tools, JSON data, and project isolation. Today, you'll build a **Personal Finance Tracker** to put it all together.

## Project Requirements

Your application should allow a user to:
1. **Add** an expense (Amount, Category, Date).
2. **View** all expenses in a clean table.
3. **Analyze** spending (Total spent, Average expense).
4. **Export/Import** data automatically using a `finance.json` file.

## Step 1: Modeling an Expense

{{< code-file filename="finance.py" lang="python" >}}
import json
from datetime import datetime

class FinanceTracker:
    def __init__(self):
        self.filename = "finance.json"
        self.expenses = self.load_data()

    def load_data(self):
        try:
            with open(self.filename, "r") as f:
                return json.load(f)
        except (FileNotFoundError, json.JSONDecodeError):
            return []

    def save_data(self):
        with open(self.filename, "w") as f:
            json.dump(self.expenses, f, indent=4)

    def add_expense(self, amount, category):
        expense = {
            "amount": float(amount),
            "category": category,
            "date": datetime.now().strftime("%Y-%m-%d %H:%M")
        }
        self.expenses.append(expense)
        self.save_data()
{{< /code-file >}}

## Step 2: Adding Analysis

{{< code-file filename="analysis.py" lang="python" >}}
    def get_total(self):
        return sum(e["amount"] for e in self.expenses)

    def get_summary(self):
        total = self.get_total()
        count = len(self.expenses)
        avg = total / count if count > 0 else 0
        return f"Total: ${total:.2f} | Count: {count} | Avg: ${avg:.2f}"
{{< /code-file >}}

## Your Challenge

Implement the CLI loop in `main()`:
- Use **Type Hints** for your helper functions.
- Add a feature to filter expenses by **Category** (e.g., "Show only Food").
- **Bonus:** Use the `statistics` module to calculate the **median** expense.

---

## Interactive Practice

Visualize the data flow: User Input -> Python Dict -> JSON File -> Storage.

{{< mermaid >}}
flowchart LR
    User[User Input] --> App[Python Script]
    App -- json.dump --> File[finance.json]
    File -- json.load --> App
    App --> Report[CLI Report]
{{< /mermaid >}}

{{< quiz >}}
