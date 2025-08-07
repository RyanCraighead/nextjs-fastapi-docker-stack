#!/bin/bash

# Next.js + FastAPI Docker Stack - Development Startup Script
# This script starts the development environment with hot reload

set -e

echo "🚀 Starting Next.js + FastAPI Development Stack..."

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo "❌ Docker is not running. Please start Docker Desktop first."
    exit 1
fi

echo "✅ Docker is running"

# Check if Docker Compose is available
if ! command -v docker-compose > /dev/null 2>&1; then
    echo "❌ Docker Compose is not available"
    exit 1
fi

echo "✅ Docker Compose is available"

# Clean up existing containers
echo "🧹 Cleaning up existing containers..."
docker-compose -f docker/docker-compose.dev.yml down --remove-orphans

# Build and start development environment
echo "🚀 Building and starting development environment..."
echo ""
echo "This will start:"
echo "  - FastAPI backend with hot reload on port 8000"
echo "  - Next.js frontend with hot reload on port 3000"
echo "  - Automatic container networking"
echo ""

docker-compose -f docker/docker-compose.dev.yml up --build

echo ""
echo "🎉 Development stack started!"
echo ""
echo "Access your application:"
echo "  Frontend: http://localhost:3000"
echo "  Backend API: http://localhost:8000"
echo "  API Documentation: http://localhost:8000/docs"
echo "  ReDoc API Docs: http://localhost:8000/redoc"
echo ""
echo "To stop the stack, press Ctrl+C or run:"
echo "  ./scripts/stop-dev.sh"
