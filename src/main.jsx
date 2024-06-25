import React from 'react'
import ReactDOM from 'react-dom/client'
import './styles.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { LoginPage } from './Pages/Login/LoginPage'
import { NavbarComponent } from './Components/NavbarComponent/NavbarComponent'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<LoginPage/>}/>
        <Route path='' element={<NavbarComponent/>}>
    
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
