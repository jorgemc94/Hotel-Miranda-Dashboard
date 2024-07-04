import React from 'react'
import ReactDOM from 'react-dom/client'
import './styles.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { LoginPage } from './Pages/Login/LoginPage'
import { LayoutPage } from './Pages/Layout/LayoutPage'
import { DashboardPage } from './Pages/Dashboard/DashboardPage'
import { RoomsListPage } from './Pages/Rooms/RoomsPage'
import { UsersPage } from './Pages/Users/UsersPage'
import { ContactPage } from './Pages/Contact/ContactPage'
import { BookingsPage } from './Pages/Bookings/BookingsPage'
import { PrivateRoute } from '../src/Components/Private/PrivateRoute'
import { Provider } from 'react-redux'
import { UserContextProvider } from './context/userContext'
import { Store } from './App/store'
import { UserDetailsPage } from './Pages/UserDetails/UserDetailsPage'
import { UserEditPage } from './Pages/userEdit/userEditPage'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <UserContextProvider>
      <Provider store={Store}>
        <BrowserRouter>
          <Routes>
            <Route path='/login' element={<LoginPage />} />
            <Route path='/' element={<LayoutPage />}>
              <Route path='/' element={<PrivateRoute> <DashboardPage /> </PrivateRoute> }/>
              <Route path='/rooms' element={<PrivateRoute> <RoomsListPage /> </PrivateRoute> } />
              <Route path='/users' element={<PrivateRoute> <UsersPage /> </PrivateRoute> } />
              <Route path='/user/:id' element={<PrivateRoute><UserDetailsPage /> </PrivateRoute>} />
              <Route path='/user/edit/:id' element={<PrivateRoute><UserEditPage /> </PrivateRoute>} />
              <Route path='/user/newuser' element={<PrivateRoute><UserEditPage /> </PrivateRoute>} />
              <Route path='/contact' element={<PrivateRoute> <ContactPage /> </PrivateRoute> } />
              <Route path='/bookings' element={<PrivateRoute> <BookingsPage /> </PrivateRoute> } />
            </Route>
          </Routes>
        </BrowserRouter>
        </Provider>
    </UserContextProvider>
  </React.StrictMode>,
)
