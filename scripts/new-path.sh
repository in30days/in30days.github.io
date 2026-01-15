#!/bin/bash

# Create a new learning path
# Usage: ./scripts/new-path.sh <path_id> "<path_name>" "<contributor_id>" "#color"
# Example: ./scripts/new-path.sh master-python "Mastering Python" "in30days-team" "#3b82f6"

set -e

PATH_ID=$1
PATH_NAME=$2
CONTRIBUTOR_ID=$3
PATH_COLOR=${4:-"#6366f1"}

if [ -z "$PATH_ID" ] || [ -z "$PATH_NAME" ] || [ -z "$CONTRIBUTOR_ID" ]; then
    echo "Usage: $0 <path_id> \"<path_name>\" <contributor_id> [#color]"
    echo "Example: $0 master-python \"Mastering Python\" \"in30days-team\" \"#3b82f6\""
    exit 1
fi

PATH_CONTENT_DIR="main-site/content/paths/$PATH_ID"
PATHS_DATA="main-site/data/paths.yaml"

if [ -d "$PATH_CONTENT_DIR" ]; then
    echo "Error: Path content directory already exists: $PATH_CONTENT_DIR"
    exit 1
fi

echo "Creating Learning Path: $PATH_NAME"
echo "Contributor: $CONTRIBUTOR_ID"
echo "Directory: $PATH_CONTENT_DIR"
echo "Color: $PATH_COLOR"
echo ""

# Create directory structure
mkdir -p "$PATH_CONTENT_DIR"

# Create index.md
cat > "$PATH_CONTENT_DIR/index.md" << EOF
---
title: "$PATH_NAME"
path_id: "$PATH_ID"
description: "Master $PATH_NAME in structured 30-day modules."
layout: "single"
type: "paths"
---
EOF

# Add to data/paths.yaml if not already there
if ! grep -q "id: $PATH_ID" "$PATHS_DATA"; then
    cat >> "$PATHS_DATA" << EOF

- id: $PATH_ID
  name: $PATH_NAME
  description: Master $PATH_NAME in structured 30-day modules.
  contributor: $CONTRIBUTOR_ID
  color: "$PATH_COLOR"
  icon: default
  totalDays: 60
  difficulty: beginner
  courses:
    - course-1
    - course-2
  featured: false
  url: /paths/$PATH_ID/
EOF
    echo "Added path to $PATHS_DATA"
else
    echo "Warning: $PATH_ID already exists in $PATHS_DATA"
fi

echo ""
echo "Path created successfully!"
echo "Next steps:"
echo "1. Edit $PATH_CONTENT_DIR/index.md"
echo "2. Update courses list in $PATHS_DATA"
