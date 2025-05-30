import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="p-8">
          <div className="flex justify-center space-x-6 mb-8">
            <a href="https://vite.dev" target="_blank" className="hover:opacity-75 transition-opacity">
              <img src={viteLogo} className="h-16 w-16" alt="Vite logo" />
            </a>
            <a href="https://react.dev" target="_blank" className="hover:opacity-75 transition-opacity">
              <img src={reactLogo} className="h-16 w-16 animate-spin" alt="React logo" />
            </a>
          </div>
          
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
            Vite + React + TypeScript + Tailwind
          </h1>
          
          <div className="text-center">
            <button 
              onClick={() => setCount((count) => count + 1)}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg transform hover:scale-105"
            >
              Licznik: {count}
            </button>
            
            <p className="mt-6 text-gray-600 text-sm">
              Edytuj <code className="bg-gray-100 px-2 py-1 rounded text-pink-600">src/App.tsx</code> i zapisz, żeby przetestować HMR
            </p>
          </div>
          
          <div className="mt-8 text-center">
            <p className="text-gray-500 text-xs">
              Kliknij na loga Vite i React, żeby dowiedzieć się więcej
            </p>
            <div className="mt-4 flex justify-center space-x-2">
              <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">React</span>
              <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-xs font-medium">TypeScript</span>
              <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">Vite</span>
              <span className="px-3 py-1 bg-cyan-100 text-cyan-800 rounded-full text-xs font-medium">Tailwind</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
