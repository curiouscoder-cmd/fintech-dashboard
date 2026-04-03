/**
 * FinSight — Personal Finance Dashboard
 * Copyright (c) 2026 Nitya Jain. All rights reserved.
 * Licensed under CC BY-NC-ND 4.0 — No commercial use permitted.
 */
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
