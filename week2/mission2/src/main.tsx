import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import ContextPage from './ContextPage.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ContextPage/>
  </StrictMode>,
)
