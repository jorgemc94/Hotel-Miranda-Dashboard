import React from 'react'
import ReactDOM from 'react-dom/client'
import './styles.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { LoginPage } from './Pages/Login/LoginPage'
import { LayoutPage } from './Pages/Layout/LayoutPage'
import { DashboardPage } from './Pages/Dashboard/DasboardPage'
import { RoomsPage } from './Pages/Rooms/RoomsPage'
import { UsersPage } from './Pages/Users/UsersPage'
import { ContactPage } from './Pages/Contact/ContactPage'
import { BookingsPage } from './Pages/Bookings/BookingsPage'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
      <Route path='/login' element={<LoginPage/>}/>
      <Route path='/' element={<LayoutPage/>}>
        <Route path='/' element={<DashboardPage/>}/>
        <Route path='/rooms' element={<RoomsPage/>}/>
        <Route path='/users' element={<UsersPage/>}/>
        <Route path='/contact' element={<ContactPage/>}/>
        <Route path='/bookings' element={<BookingsPage/>}/>
      </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
