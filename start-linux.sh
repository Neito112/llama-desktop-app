#!/usr/bin/env bash
# ========================================================
# Llama Desktop App Launcher for Linux Bazzite / Fedora / Ubuntu
# Official site: https://llama.app/
# ========================================================

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

echo "🦙 Launching Llama Desktop App on Linux Bazzite..."

# Ensure Node.js & npm exist
if ! command -v npm &> /dev/null; then
    echo "❌ Error: 'npm' is not installed or not in PATH."
    echo "Please install Node.js/npm on your Linux system."
    exit 1
fi

# Run Electron app
npm start
