import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './App.css'
import { QueryProvider } from './context/QueryContext.jsx'   

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <QueryProvider>
            <App />
        </QueryProvider>
    </StrictMode>,
)
