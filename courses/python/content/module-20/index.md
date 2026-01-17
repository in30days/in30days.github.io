---
title: "Working with Dates and Time"
date: 2024-01-20
module: 20
weight: 20
draft: false
duration: "45 min"
difficulty: "beginner"
description: "Learn how to handle dates, times, and timestamps using Python's datetime module."
objectives:
  - Import and use the datetime module
  - Create and format dates and times
  - Calculate time differences (durations)
  - Understand UTC vs. local time basics
prerequisites: [19]
tags: ["datetime", "modules", "basics"]
---

## Timing is Everything

Many applications need to keep track of time: when a user registered, when a task is due, or how much time has passed since an event. Python's built-in `datetime` module is the standard tool for this.

## Importing Datetime

To use it, you first need to import it.

{{< code-file filename="now.py" lang="python" >}}
import datetime

# Get current date and time
now = datetime.datetime.now()
print(f"Current time: {now}")

# Access specific parts
print(f"Year: {now.year}")
print(f"Month: {now.month}")
print(f"Day: {now.day}")
{{< /code-file >}}

## Creating Specific Dates

{{< code-file filename="create_date.py" lang="python" >}}
from datetime import datetime

# year, month, day, hour, minute
event_date = datetime(2025, 12, 25, 18, 30)
print(f"Event is on: {event_date}")
{{< /code-file >}}

## Formatting Dates (strftime)

Computers like timestamps, but humans like formatted strings. We use `strftime` (string format time) to turn dates into readable text.

{{< code-file filename="format.py" lang="python" >}}
now = datetime.now()

# %Y = Year, %m = Month, %d = Day, %H = Hour, %M = Minute
print(now.strftime("%B %d, %Y"))  # Output: January 15, 2026
print(now.strftime("%d/%m/%y"))   # Output: 15/01/26
{{< /code-file >}}

## Calculating Durations (timedelta)

You can subtract dates to see how much time is between them.

{{< code-file filename="deltas.py" lang="python" >}}
from datetime import datetime, timedelta

today = datetime.now()
deadline = datetime(2026, 1, 30)

time_left = deadline - today
print(f"Days left: {time_left.days}")

# Adding time
one_week_from_now = today + timedelta(weeks=1)
print(f"Next week: {one_week_from_now}")
{{< /code-file >}}

---

## Interactive Practice

Try calculating how many days old you are by subtracting your birth date from today's date!

{{< interactive-table >}}
| Code | Output | Description |
| :--- | :--- | :--- |
| `%Y` | 2026 | 4-digit year |
| `%B` | January | Full month name |
| `%A` | Thursday | Full weekday name |
| `%H` | 14 | 24-hour clock |
{{< /interactive-table >}}

{{< quiz >}}
