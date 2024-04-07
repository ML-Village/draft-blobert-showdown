import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import TwoPlayer from './App2.tsx'
import OnePlayer from './App.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
   {/* <OnePlayer/> */}
   <TwoPlayer/>
  </React.StrictMode>,
)
