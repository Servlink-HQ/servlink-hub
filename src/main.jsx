import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { GlobalContentProvider } from './contexts/GlobalContentContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GlobalContentProvider>
      <App />
    </GlobalContentProvider>
  </React.StrictMode>,
)
