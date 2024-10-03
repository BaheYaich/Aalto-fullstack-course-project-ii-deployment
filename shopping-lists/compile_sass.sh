# shopping-lists/compile_sass.sh
#!/bin/bash

echo "Starting SCSS compilation..."

OUTPUT_DIR="../shopping-lists/assets/css"
echo "Output directory: $OUTPUT_DIR"
mkdir -p "$OUTPUT_DIR"

echo "Compiling SCSS..."
sass ../shopping-lists/assets/scss/main.scss "$OUTPUT_DIR/main.min.css" --style compressed

if [ $? -eq 0 ]; then
    echo "SCSS compiled successfully!"
else
    echo "Error compiling SCSS."
    exit 1
fi