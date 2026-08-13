#!/usr/bin/env bash
set -e
BRANCH="add-leak-hub"
echo "Creating and switching to branch $BRANCH..."
git fetch origin
git checkout -B "$BRANCH" origin/main
