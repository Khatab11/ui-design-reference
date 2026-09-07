import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { hideNetlifyBadge } from './lib/hide-netlify-badge.js'
import './index.css'

hideNetlifyBadge()

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
