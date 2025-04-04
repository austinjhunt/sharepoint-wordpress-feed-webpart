#!/bin/bash
echo "Bundling and packaging solution for new release..."
gulp bundle --ship
gulp package-solution --ship

echo "Solution packaged. Check ./sharepoint/solutions for new *.sppkg file"