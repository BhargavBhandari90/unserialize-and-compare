import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/react"
import { Buffer } from 'buffer'
import './index.css'
import App from './App.jsx'

// Make Buffer available globally for php-serialize
window.Buffer = Buffer
globalThis.Buffer = Buffer

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    <Analytics />
    <SpeedInsights/>
  </StrictMode>,
)
