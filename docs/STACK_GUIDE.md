# 🚀 Next.js + FastAPI Docker Stack Guide

## 📋 Stack Overview

This template provides a **production-ready foundation** for building modern web applications with:

- **Frontend**: Next.js 15 + TypeScript + Tailwind CSS
- **Backend**: Python FastAPI + Pydantic + Uvicorn
- **Infrastructure**: Docker + Docker Compose
- **Development**: Hot reload for both frontend and backend

## 🎯 Perfect For Building

### 🌐 **Web Applications**
- SaaS products and platforms
- E-commerce websites
- Content management systems
- Admin dashboards and panels

### 📊 **Data Applications**
- Analytics dashboards
- Data visualization tools
- Reporting systems
- Business intelligence apps

### 🤖 **AI/ML Applications**
- Machine learning model frontends
- AI-powered web apps
- Data processing pipelines
- Computer vision applications

### 🔗 **API Services**
- RESTful API backends
- Microservices architecture
- Third-party integrations
- Mobile app backends

## 🛠️ Development Workflow

### 1. **Quick Start**
```bash
# Clone and start
git clone <your-repo>
cd nextjs-fastapi-docker-stack
./scripts/start-dev.sh  # Linux/macOS
scripts\start-dev.bat   # Windows
```

### 2. **Frontend Development**
```bash
# Add UI components
cd frontend
npm install @radix-ui/react-button
npm install @headlessui/react
npm install framer-motion

# Add state management
npm install zustand
npm install @tanstack/react-query

# Add forms
npm install react-hook-form
npm install @hookform/resolvers
```

### 3. **Backend Development**
```python
# Add database support
# In requirements.txt:
# sqlalchemy==2.0.23
# alembic==1.13.1
# psycopg2-binary==2.9.9

# Add authentication
# python-jose[cryptography]==3.3.0
# passlib[bcrypt]==1.7.4

# Add background tasks
# celery==5.3.4
# redis==5.0.1
```

## 🏗️ Architecture Patterns

### **Frontend Architecture**
```
frontend/
├── app/                    # Next.js App Router
│   ├── (auth)/            # Route groups
│   ├── dashboard/         # Dashboard pages
│   ├── api/               # API routes (if needed)
│   └── globals.css        # Global styles
├── components/            # Reusable components
│   ├── ui/               # Base UI components
│   ├── forms/            # Form components
│   └── layout/           # Layout components
├── lib/                  # Utilities
│   ├── api.ts            # API client
│   ├── auth.ts           # Authentication
│   ├── utils.ts          # Helper functions
│   └── types.ts          # TypeScript types
└── hooks/                # Custom React hooks
```

### **Backend Architecture**
```
backend/
├── app/
│   ├── main.py           # FastAPI app
│   ├── models/           # Database models
│   ├── routers/          # API routes
│   ├── services/         # Business logic
│   ├── schemas/          # Pydantic schemas
│   ├── core/             # Core functionality
│   │   ├── config.py     # Configuration
│   │   ├── security.py   # Authentication
│   │   └── database.py   # Database setup
│   └── utils/            # Utility functions
├── tests/                # Test files
└── migrations/           # Database migrations
```

## 🔧 Common Customizations

### **Add Database Support**

1. **PostgreSQL Setup**:
```yaml
# In docker-compose.dev.yml
services:
  postgres:
    image: postgres:15
    environment:
      POSTGRES_DB: myapp
      POSTGRES_USER: user
      POSTGRES_PASSWORD: password
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:
```

2. **SQLAlchemy Integration**:
```python
# backend/app/core/database.py
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

DATABASE_URL = "postgresql://user:password@postgres:5432/myapp"

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()
```

### **Add Authentication**

1. **JWT Authentication**:
```python
# backend/app/core/security.py
from jose import JWTError, jwt
from passlib.context import CryptContext

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
SECRET_KEY = "your-secret-key"
ALGORITHM = "HS256"

def create_access_token(data: dict):
    return jwt.encode(data, SECRET_KEY, algorithm=ALGORITHM)
```

2. **Frontend Auth Context**:
```typescript
// frontend/lib/auth.ts
import { createContext, useContext } from 'react'

interface AuthContext {
  user: User | null
  login: (email: string, password: string) => Promise<void>
  logout: () => void
}

export const AuthContext = createContext<AuthContext>({})
export const useAuth = () => useContext(AuthContext)
```

### **Add Real-time Features**

1. **WebSocket Support**:
```python
# backend/app/main.py
from fastapi import WebSocket

@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    while True:
        data = await websocket.receive_text()
        await websocket.send_text(f"Message: {data}")
```

2. **Frontend WebSocket**:
```typescript
// frontend/hooks/useWebSocket.ts
import { useEffect, useState } from 'react'

export function useWebSocket(url: string) {
  const [socket, setSocket] = useState<WebSocket | null>(null)
  const [messages, setMessages] = useState<string[]>([])

  useEffect(() => {
    const ws = new WebSocket(url)
    setSocket(ws)
    
    ws.onmessage = (event) => {
      setMessages(prev => [...prev, event.data])
    }
    
    return () => ws.close()
  }, [url])

  return { socket, messages }
}
```

## 🚀 Production Deployment

### **Docker Production Build**
```bash
# Build production images
docker-compose -f docker/docker-compose.prod.yml build

# Deploy
docker-compose -f docker/docker-compose.prod.yml up -d

# Scale services
docker-compose -f docker/docker-compose.prod.yml up -d --scale frontend=3
```

### **Environment Configuration**
```bash
# Production .env
NODE_ENV=production
ENVIRONMENT=production
NEXT_PUBLIC_API_URL=https://api.yourdomain.com
DATABASE_URL=postgresql://user:pass@db:5432/prod_db
REDIS_URL=redis://redis:6379
```

### **Nginx Reverse Proxy**
```nginx
# docker/nginx.conf
upstream frontend {
    server frontend:3000;
}

upstream backend {
    server backend:8000;
}

server {
    listen 80;
    
    location / {
        proxy_pass http://frontend;
    }
    
    location /api {
        proxy_pass http://backend;
    }
}
```

## 📚 Additional Resources

- **Next.js Documentation**: https://nextjs.org/docs
- **FastAPI Documentation**: https://fastapi.tiangolo.com/
- **Docker Documentation**: https://docs.docker.com/
- **Tailwind CSS**: https://tailwindcss.com/docs
- **TypeScript**: https://www.typescriptlang.org/docs

## 🤝 Best Practices

1. **Use TypeScript** for type safety across the stack
2. **Implement proper error handling** in both frontend and backend
3. **Add comprehensive logging** for debugging and monitoring
4. **Use environment variables** for configuration
5. **Implement proper authentication** and authorization
6. **Add automated testing** for both frontend and backend
7. **Use Docker multi-stage builds** for optimized production images
8. **Implement proper CORS** configuration for production

---

**🎉 Happy building with your new stack! 🚀**
