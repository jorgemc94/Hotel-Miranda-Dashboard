import React from 'react'
import ReactDOM from 'react-dom/client'
import './styles.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { LoginPage } from './Pages/Login/LoginPage'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<LoginPage/>}/>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
