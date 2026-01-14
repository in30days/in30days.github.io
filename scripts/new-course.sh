#!/bin/bash

# Create a new course from template
# Usage: ./scripts/new-course.sh <course_id> "<course_name>" "#color"
# Example: ./scripts/new-course.sh rust "Rust in 30 Days" "#dea584"

set -e

COURSE_ID=$1
COURSE_NAME=$2
COURSE_COLOR=${3:-"#6366f1"}

if [ -z "$COURSE_ID" ] || [ -z "$COURSE_NAME" ]; then
    echo "Usage: $0 <course_id> \"<course_name>\" [#color]"
    echo "Example: $0 rust \"Rust in 30 Days\" \"#dea584\""
    exit 1
fi

COURSE_DIR="courses/$COURSE_ID"

if [ -d "$COURSE_DIR" ]; then
    echo "Error: Course directory already exists: $COURSE_DIR"
    exit 1
fi

echo "Creating course: $COURSE_NAME"
echo "Directory: $COURSE_DIR"
echo "Color: $COURSE_COLOR"
echo ""

# Create directory structure
mkdir -p "$COURSE_DIR/content"
mkdir -p "$COURSE_DIR/static/images"

# Create hugo.toml
cat > "$COURSE_DIR/hugo.toml" << EOF
baseURL = "https://in30days.org/$COURSE_ID/"
languageCode = "en-us"
title = "$COURSE_NAME"
theme = "in30days-course"
themesDir = "../../shared-theme"

[params]
  courseId = "$COURSE_ID"
  courseName = "${COURSE_ID^}"
  courseFullName = "$COURSE_NAME"
  courseDescription = "Master ${COURSE_ID^} programming in 30 days"
  courseColor = "$COURSE_COLOR"
  courseIcon = "$COURSE_ID"
  totalDays = 30
  quizPassScore = 80
  difficulty = "beginner"
  
  [params.giscus]
    enabled = true
    repo = "PLACEHOLDER/in30days-discussions"
    repoId = "PLACEHOLDER_REPO_ID"
    category = "${COURSE_ID^} Discussions"
    categoryId = "PLACEHOLDER_CATEGORY_ID"
    mapping = "pathname"
    reactionsEnabled = true
    theme = "preferred_color_scheme"
    
  [params.firebase]
    enabled = true

[markup]
  [markup.goldmark]
    [markup.goldmark.renderer]
      unsafe = true
  [markup.highlight]
    style = "dracula"
    lineNos = true
    lineNumbersInTable = true
    
[build]
  writeStats = true
EOF

# Create course index
cat > "$COURSE_DIR/content/_index.md" << EOF
---
title: "$COURSE_NAME"
description: "Master ${COURSE_ID^} programming in 30 days"
courseId: "$COURSE_ID"
courseName: "${COURSE_ID^}"
courseColor: "$COURSE_COLOR"
difficulty: "beginner"
duration: "30 days"
totalDays: 30
objectives:
  - Learn ${COURSE_ID^} fundamentals
  - Build practical projects
  - Master core concepts
prerequisites:
  - Basic programming knowledge
---

## Welcome to $COURSE_NAME!

This course will guide you through learning ${COURSE_ID^} in 30 days.

### Course Structure

Each day includes:
- Reading content with examples
- Interactive quizzes
- Practice exercises

Complete each day's quiz with 80% or higher to unlock the next day!
EOF

# Create 30 day directories with placeholder content
for i in $(seq 1 30); do
    day=$(printf "%02d" $i)
    mkdir -p "$COURSE_DIR/content/day-$day"
    
    cat > "$COURSE_DIR/content/day-$day/index.md" << EOF
---
title: "Day $i: Coming Soon"
date: 2024-01-$day
day: $i
weight: $i
draft: false
duration: "45 min"
difficulty: "beginner"
description: "Day $i content coming soon"
objectives:
  - Objective 1
  - Objective 2
prerequisites: [$((i > 1 ? i-1 : ""))]
tags: ["placeholder"]
---

## Coming Soon

This lesson is currently being developed.
EOF
done

echo ""
echo "Course created successfully!"
echo ""
echo "Next steps:"
echo "1. Edit $COURSE_DIR/content/_index.md with course details"
echo "2. Add content to each day in $COURSE_DIR/content/day-XX/"
echo "3. Add course to main-site/data/courses.yaml"
echo "4. Update .github/workflows/deploy.yml to build this course"
