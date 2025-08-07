'use client'

import { useState, useEffect } from 'react'

interface ApiStatus {
  api_status: string
  python_version: string
  platform: string
  environment: string
}

export default function HomePage() {
  const [backendStatus, setBackendStatus] = useState<'loading' | 'online' | 'offline'>('loading')
  const [apiData, setApiData] = useState<ApiStatus | null>(null)
  const [message, setMessage] = useState('')

  // API base URL - works for both Docker and local development
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

  // Check backend status
  const checkBackendStatus = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/health`)
      if (response.ok) {
        setBackendStatus('online')
        // Get additional API info
        const statusResponse = await fetch(`${API_BASE_URL}/api/status`)
        if (statusResponse.ok) {
          const data = await statusResponse.json()
          setApiData(data)
        }
      } else {
        setBackendStatus('offline')
      }
    } catch (error) {
      setBackendStatus('offline')
    }
  }

  // Test API call
  const testApiCall = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/hello`)
      if (response.ok) {
        const data = await response.json()
        setMessage(data.message)
      }
    } catch (error) {
      setMessage('Failed to connect to backend')
    }
  }

  useEffect(() => {
    checkBackendStatus()
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gradient mb-4">
            Next.js + FastAPI Stack
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            A modern, production-ready web application stack with Docker containerization
          </p>
        </div>

        {/* Status Cards */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Frontend Status */}
          <div className="card">
            <div className="flex items-center mb-4">
              <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
              <h2 className="text-xl font-semibold">Frontend Status</h2>
            </div>
            <div className="space-y-2 text-sm text-gray-600">
              <p><strong>Framework:</strong> Next.js 15</p>
              <p><strong>Language:</strong> TypeScript</p>
              <p><strong>Styling:</strong> Tailwind CSS</p>
              <p><strong>Status:</strong> <span className="text-green-600 font-medium">Online</span></p>
            </div>
          </div>

          {/* Backend Status */}
          <div className="card">
            <div className="flex items-center mb-4">
              <div className={`w-3 h-3 rounded-full mr-3 ${
                backendStatus === 'online' ? 'bg-green-500' : 
                backendStatus === 'offline' ? 'bg-red-500' : 'bg-yellow-500'
              }`}></div>
              <h2 className="text-xl font-semibold">Backend Status</h2>
            </div>
            <div className="space-y-2 text-sm text-gray-600">
              <p><strong>Framework:</strong> FastAPI</p>
              <p><strong>Language:</strong> Python</p>
              <p><strong>Server:</strong> Uvicorn</p>
              <p><strong>Status:</strong> 
                <span className={`font-medium ml-1 ${
                  backendStatus === 'online' ? 'text-green-600' : 
                  backendStatus === 'offline' ? 'text-red-600' : 'text-yellow-600'
                }`}>
                  {backendStatus === 'loading' ? 'Checking...' : 
                   backendStatus === 'online' ? 'Online' : 'Offline'}
                </span>
              </p>
              {apiData && (
                <>
                  <p><strong>Environment:</strong> {apiData.environment}</p>
                  <p><strong>Platform:</strong> {apiData.platform}</p>
                </>
              )}
            </div>
          </div>
        </div>

        {/* API Test Section */}
        <div className="card max-w-2xl mx-auto">
          <h2 className="text-2xl font-semibold mb-6 text-center">API Connection Test</h2>
          
          <div className="space-y-4">
            <button
              onClick={testApiCall}
              disabled={backendStatus !== 'online'}
              className={`w-full btn ${
                backendStatus === 'online' ? 'btn-primary' : 'btn-secondary opacity-50 cursor-not-allowed'
              }`}
            >
              {backendStatus === 'online' ? 'Test API Connection' : 'Backend Offline'}
            </button>
            
            {message && (
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-blue-800">{message}</p>
              </div>
            )}
          </div>
        </div>

        {/* Quick Links */}
        <div className="mt-12 text-center">
          <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href={`${API_BASE_URL}/docs`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary"
            >
              API Documentation
            </a>
            <a
              href={`${API_BASE_URL}/redoc`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary"
            >
              ReDoc API Docs
            </a>
            <button
              onClick={checkBackendStatus}
              className="btn btn-secondary"
            >
              Refresh Status
            </button>
          </div>
        </div>

        {/* Getting Started */}
        <div className="mt-12 card max-w-4xl mx-auto">
          <h3 className="text-xl font-semibold mb-4">🚀 Getting Started</h3>
          <div className="grid md:grid-cols-2 gap-6 text-sm">
            <div>
              <h4 className="font-medium mb-2">Frontend Development</h4>
              <ul className="space-y-1 text-gray-600">
                <li>• Add components in <code className="bg-gray-100 px-1 rounded">components/</code></li>
                <li>• Create pages in <code className="bg-gray-100 px-1 rounded">app/</code></li>
                <li>• Add utilities in <code className="bg-gray-100 px-1 rounded">lib/</code></li>
                <li>• Install UI libraries (Radix, Material-UI, etc.)</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2">Backend Development</h4>
              <ul className="space-y-1 text-gray-600">
                <li>• Add routes in <code className="bg-gray-100 px-1 rounded">backend/app/main.py</code></li>
                <li>• Create models with Pydantic</li>
                <li>• Add database integration</li>
                <li>• Implement authentication</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
