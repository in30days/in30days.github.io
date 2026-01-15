#!/bin/bash

# Create a new contributor profile
# Usage: ./scripts/new-contributor.sh <github_id> "<full_name>" "<bio>"
# Example: ./scripts/new-contributor.sh jdoe "John Doe" "Full-stack engineer and educator."

set -e

GITHUB_ID=$1
FULL_NAME=$2
BIO=$3

if [ -z "$GITHUB_ID" ] || [ -z "$FULL_NAME" ] || [ -z "$BIO" ]; then
    echo "Usage: $0 <github_id> \"<full_name>\" \"<bio>\""
    echo "Example: $0 jdoe \"John Doe\" \"Full-stack engineer and educator.\""
    exit 1
fi

CONTRIBUTOR_CONTENT="main-site/content/contributors/$GITHUB_ID.md"
CONTRIBUTOR_DATA="main-site/data/contributors.yaml"

echo "Creating Contributor Profile: $FULL_NAME"
echo ""

# Create markdown file
cat > "$CONTRIBUTOR_CONTENT" << EOF
---
title: "$FULL_NAME"
contributor_id: "$GITHUB_ID"
layout: "single"
---
EOF

# Add to data/contributors.yaml if not already there
if ! grep -q "id: $GITHUB_ID" "$CONTRIBUTOR_DATA"; then
    cat >> "$CONTRIBUTOR_DATA" << EOF

- id: $GITHUB_ID
  name: $FULL_NAME
  github: $GITHUB_ID
  bio: "$BIO"
  avatar: "https://github.com/$GITHUB_ID.png"
EOF
    echo "Added contributor to $CONTRIBUTOR_DATA"
else
    echo "Warning: $GITHUB_ID already exists in $CONTRIBUTOR_DATA"
fi

echo ""
echo "Contributor created successfully!"
echo "Next steps:"
echo "1. Verify $CONTRIBUTOR_CONTENT"
echo "2. Edit $CONTRIBUTOR_DATA for additional social links"
