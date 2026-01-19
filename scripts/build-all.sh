#!/bin/bash

# Build all in30days sites
# Usage: ./scripts/build-all.sh [base_url]

set -e

BASE_URL=${1:-"https://learn.ravichaganti.com"}
OUTPUT_DIR="public"

echo "Building in30days sites..."
echo "Base URL: $BASE_URL"
echo "Output: $OUTPUT_DIR"
echo ""

# Clean output directory
rm -rf "$OUTPUT_DIR"
mkdir -p "$OUTPUT_DIR"

# Build main landing page
echo "Building main site..."
hugo --source ./main-site \
     --destination ../$OUTPUT_DIR/ \
     --baseURL "$BASE_URL/"

# Build each course
for course_dir in ./courses/*/; do
    if [ -d "$course_dir" ]; then
        course_id=$(basename "$course_dir")
        # Check if hugo.toml exists to confirm it's a course directory
        if [ -f "${course_dir}hugo.toml" ]; then
            echo "Building $course_id course..."
            hugo --source "$course_dir" \
                 --destination "../../$OUTPUT_DIR/$course_id/" \
                 --baseURL "$BASE_URL/$course_id/"
        fi
    fi
done

# Create .nojekyll to prevent GitHub from ignoring folders starting with underscore
touch "$OUTPUT_DIR/.nojekyll"

echo ""
echo "Build complete!"
echo "Output in: $OUTPUT_DIR/"
ls -la "$OUTPUT_DIR/"
