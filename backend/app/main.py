"""
Generic FastAPI Backend Template

A clean, production-ready FastAPI application template.
Add your business logic, database models, and API endpoints here.
"""

import os
from contextlib import asynccontextmanager
from typing import Dict, Any

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pydantic import BaseModel

# Import your routers here
# from .routers import users, items, auth

# Pydantic models
class HealthResponse(BaseModel):
    status: str
    environment: str
    version: str

class MessageResponse(BaseModel):
    message: str
    timestamp: str

# Lifespan context manager
@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup
    print("🚀 Starting FastAPI application...")
    print("📝 Environment:", os.getenv("ENVIRONMENT", "development"))
    print("🔧 Add your startup logic here (database connections, etc.)")
    
    yield
    
    # Shutdown
    print("🛑 Shutting down FastAPI application...")
    print("🔧 Add your cleanup logic here (close database connections, etc.)")

# Create FastAPI app
app = FastAPI(
    title="Generic FastAPI Backend",
    description="A clean, production-ready FastAPI backend template",
    version="1.0.0",
    lifespan=lifespan,
    docs_url="/docs",
    redoc_url="/redoc"
)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Configure appropriately for production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Basic routes
@app.get("/")
async def root() -> Dict[str, Any]:
    """Root endpoint with basic API information."""
    return {
        "message": "Generic FastAPI Backend is running! 🚀",
        "version": "1.0.0",
        "environment": os.getenv("ENVIRONMENT", "development"),
        "docs": "/docs",
        "redoc": "/redoc"
    }

@app.get("/health", response_model=HealthResponse)
async def health_check() -> HealthResponse:
    """Health check endpoint for monitoring and load balancers."""
    return HealthResponse(
        status="healthy",
        environment=os.getenv("ENVIRONMENT", "development"),
        version="1.0.0"
    )

@app.get("/api/hello")
async def hello_world() -> MessageResponse:
    """Example API endpoint."""
    from datetime import datetime
    return MessageResponse(
        message="Hello from FastAPI! 👋",
        timestamp=datetime.now().isoformat()
    )

@app.get("/api/status")
async def api_status() -> Dict[str, Any]:
    """API status endpoint with system information."""
    import platform
    import sys
    
    return {
        "api_status": "operational",
        "python_version": sys.version,
        "platform": platform.platform(),
        "environment": os.getenv("ENVIRONMENT", "development")
    }

# Example protected route (add authentication middleware as needed)
@app.get("/api/protected")
async def protected_route() -> Dict[str, str]:
    """Example protected endpoint - add authentication logic here."""
    # TODO: Add authentication logic
    # if not authenticated:
    #     raise HTTPException(status_code=401, detail="Not authenticated")
    
    return {"message": "This is a protected route! 🔒"}

# Example POST endpoint
@app.post("/api/echo")
async def echo_data(data: Dict[str, Any]) -> Dict[str, Any]:
    """Echo endpoint that returns the posted data."""
    return {
        "received": data,
        "message": "Data received successfully! 📡"
    }

# Include additional routers here
# app.include_router(users.router, prefix="/api/users", tags=["users"])
# app.include_router(items.router, prefix="/api/items", tags=["items"])
# app.include_router(auth.router, prefix="/api/auth", tags=["authentication"])

# Error handlers
@app.exception_handler(404)
async def not_found_handler(request, exc):
    return JSONResponse(
        status_code=404,
        content={"message": "Endpoint not found", "path": str(request.url)}
    )

@app.exception_handler(500)
async def internal_error_handler(request, exc):
    return JSONResponse(
        status_code=500,
        content={"message": "Internal server error", "detail": str(exc)}
    )

if __name__ == "__main__":
    import uvicorn
    
    # Get configuration from environment
    host = os.getenv("HOST", "0.0.0.0")
    port = int(os.getenv("PORT", 8000))
    reload = os.getenv("ENVIRONMENT", "development") == "development"
    
    print(f"Starting server on {host}:{port}")
    
    uvicorn.run(
        "main:app",
        host=host,
        port=port,
        reload=reload,
        log_level="info"
    )
