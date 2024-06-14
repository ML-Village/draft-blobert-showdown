import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import TwoPlayer from './pages/App2.tsx'
import OnePlayer from './pages/App.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
   {/* <OnePlayer/> */}
   <TwoPlayer/>
  </React.StrictMode>,
)
