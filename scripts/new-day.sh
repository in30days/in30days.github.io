#!/bin/bash

# Create a new day for a course
# Usage: ./scripts/new-day.sh <course_id> <day_number> "<day_title>"
# Example: ./scripts/new-day.sh python 4 "Control Flow - If Statements"

set -e

COURSE_ID=$1
DAY_NUM=$2
DAY_TITLE=$3

if [ -z "$COURSE_ID" ] || [ -z "$DAY_NUM" ] || [ -z "$DAY_TITLE" ]; then
    echo "Usage: $0 <course_id> <day_number> \"<day_title>\""
    echo "Example: $0 python 4 \"Control Flow - If Statements\""
    exit 1
fi

DAY_PADDED=$(printf "%02d" $DAY_NUM)
DAY_DIR="courses/$COURSE_ID/content/day-$DAY_PADDED"

if [ ! -d "courses/$COURSE_ID" ]; then
    echo "Error: Course not found: courses/$COURSE_ID"
    exit 1
fi

echo "Creating Day $DAY_NUM: $DAY_TITLE"
echo "Directory: $DAY_DIR"
echo ""

# Create directory
mkdir -p "$DAY_DIR"

# Create index.md
cat > "$DAY_DIR/index.md" << EOF
---
title: "$DAY_TITLE"
date: 2024-01-$DAY_PADDED
day: $DAY_NUM
weight: $DAY_NUM
draft: false
duration: "45 min"
difficulty: "beginner"
description: "Day $DAY_NUM - $DAY_TITLE"
objectives:
  - First learning objective
  - Second learning objective
  - Third learning objective
prerequisites: [$((DAY_NUM > 1 ? DAY_NUM-1 : ""))]
tags: []
---

## Introduction

Write your introduction here.

## Section 1

Add your content here.

\`\`\`python
# Example code
print("Hello, World!")
\`\`\`

{{< callout type="tip" title="Pro Tip" >}}
Add helpful tips for learners.
{{< /callout >}}

## Section 2

More content here.

{{< mermaid >}}
flowchart LR
    A[Start] --> B[Process] --> C[End]
{{< /mermaid >}}

## Summary

Summarize what was learned today.

## Next Steps

Preview what's coming in Day $((DAY_NUM + 1)).

Complete the quiz below to continue!
EOF

# Create quiz.json
cat > "$DAY_DIR/quiz.json" << EOF
{
  "dayId": $DAY_NUM,
  "passScore": 80,
  "questions": [
    {
      "id": "q1",
      "type": "multiple-select",
      "points": 25,
      "question": "Question 1 text here?",
      "options": [
        { "id": "a", "text": "Option A", "correct": true },
        { "id": "b", "text": "Option B", "correct": false },
        { "id": "c", "text": "Option C", "correct": true },
        { "id": "d", "text": "Option D", "correct": false }
      ],
      "explanation": "Explanation for the correct answer."
    },
    {
      "id": "q2",
      "type": "drag-order",
      "points": 25,
      "question": "Arrange these items in the correct order:",
      "items": [
        { "id": "a", "text": "First step" },
        { "id": "b", "text": "Second step" },
        { "id": "c", "text": "Third step" },
        { "id": "d", "text": "Fourth step" }
      ],
      "correctOrder": ["a", "b", "c", "d"],
      "explanation": "Explanation for the correct order."
    },
    {
      "id": "q3",
      "type": "multiple-select",
      "points": 25,
      "question": "Question 3 text here?",
      "options": [
        { "id": "a", "text": "Option A", "correct": false },
        { "id": "b", "text": "Option B", "correct": true }
      ],
      "explanation": "Explanation for the correct answer."
    },
    {
      "id": "q4",
      "type": "multiple-select",
      "points": 25,
      "question": "Question 4 text here?",
      "options": [
        { "id": "a", "text": "Option A", "correct": true },
        { "id": "b", "text": "Option B", "correct": false }
      ],
      "explanation": "Explanation for the correct answer."
    }
  ]
}
EOF

echo "Day $DAY_NUM created successfully!"
echo ""
echo "Files created:"
echo "  - $DAY_DIR/index.md"
echo "  - $DAY_DIR/quiz.json"
echo ""
echo "Next steps:"
echo "1. Edit the content in index.md"
echo "2. Update the quiz questions in quiz.json"
echo "3. Add any images to $DAY_DIR/"
