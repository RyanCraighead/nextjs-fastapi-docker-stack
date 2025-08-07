@echo off
REM Next.js + FastAPI Docker Stack - Stop Development Environment (Windows)
REM This script stops and cleans up the development environment

echo 🛑 Stopping Next.js + FastAPI Development Stack...

REM Stop and remove containers
docker-compose -f docker/docker-compose.dev.yml down --remove-orphans

REM Optional: Remove volumes (uncomment if you want to reset data)
REM docker-compose -f docker/docker-compose.dev.yml down --volumes

REM Optional: Remove images (uncomment if you want to force rebuild)
REM docker-compose -f docker/docker-compose.dev.yml down --rmi all

echo ✅ Development stack stopped successfully!
echo.
echo To start again, run:
echo   scripts\start-dev.bat

pause
