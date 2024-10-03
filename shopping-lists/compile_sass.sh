# shopping-lists/compile_sass.sh
#!/bin/bash

# Check if the output directory exists, create it if it doesn't
OUTPUT_DIR="../assets/css"
mkdir -p "$OUTPUT_DIR"

# Compile the SCSS to CSS
sass ../assets/scss/main.scss "$OUTPUT_DIR/main.min.css" --style compressed

# Check for errors during compilation
if [ $? -eq 0 ]; then
    echo "SCSS compiled successfully!"
else
    echo "Error compiling SCSS."
    exit 1
fi