import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import { FilmeProvider } from './contexts/FilmeContext/FilmeProvider.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
    <FilmeProvider>
    <App />
    </FilmeProvider>
    </BrowserRouter>
  </StrictMode>,
)
