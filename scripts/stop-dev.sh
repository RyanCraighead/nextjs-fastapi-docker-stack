#!/bin/bash

# Next.js + FastAPI Docker Stack - Stop Development Environment
# This script stops and cleans up the development environment

set -e

echo "🛑 Stopping Next.js + FastAPI Development Stack..."

# Stop and remove containers
docker-compose -f docker/docker-compose.dev.yml down --remove-orphans

# Optional: Remove volumes (uncomment if you want to reset data)
# docker-compose -f docker/docker-compose.dev.yml down --volumes

# Optional: Remove images (uncomment if you want to force rebuild)
# docker-compose -f docker/docker-compose.dev.yml down --rmi all

echo "✅ Development stack stopped successfully!"
echo ""
echo "To start again, run:"
echo "  ./scripts/start-dev.sh"
