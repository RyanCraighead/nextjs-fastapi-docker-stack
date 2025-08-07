@echo off
REM Next.js + FastAPI Docker Stack - Development Startup Script (Windows)
REM This script starts the development environment with hot reload

echo 🚀 Starting Next.js + FastAPI Development Stack...

REM Check if Docker is running
docker info >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Docker is not running. Please start Docker Desktop first.
    pause
    exit /b 1
)

echo ✅ Docker is running

REM Check if Docker Compose is available
docker-compose --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Docker Compose is not available
    pause
    exit /b 1
)

echo ✅ Docker Compose is available

REM Clean up existing containers
echo 🧹 Cleaning up existing containers...
docker-compose -f docker/docker-compose.dev.yml down --remove-orphans

REM Build and start development environment
echo 🚀 Building and starting development environment...
echo.
echo This will start:
echo   - FastAPI backend with hot reload on port 8000
echo   - Next.js frontend with hot reload on port 3000
echo   - Automatic container networking
echo.

docker-compose -f docker/docker-compose.dev.yml up --build

echo.
echo 🎉 Development stack started!
echo.
echo Access your application:
echo   Frontend: http://localhost:3000
echo   Backend API: http://localhost:8000
echo   API Documentation: http://localhost:8000/docs
echo   ReDoc API Docs: http://localhost:8000/redoc
echo.
echo To stop the stack, press Ctrl+C or run:
echo   scripts\stop-dev.bat

pause
