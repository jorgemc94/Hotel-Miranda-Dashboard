import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { LoginPage } from './Pages/Login/LoginPage';
import { LayoutPage } from './Pages/Layout/LayoutPage';
import { DashboardPage } from './Pages/Dashboard/DashboardPage';
import { RoomsListPage } from './Pages/Rooms/RoomsPage';
import { UsersPage } from './Pages/Users/UsersPage';
import { ContactPage } from './Pages/Contact/ContactPage';
import { BookingsPage } from './Pages/Bookings/BookingsPage';
import { PrivateRoute } from './Components/Private/PrivateRoute';
import { Provider } from 'react-redux';
import { UserContextProvider } from './context/userContext';
import { Store } from './App/store';
import { UserDetailsPage } from './Pages/Users/UserDetailsPage';
import { UserEditPage } from './Pages/Users/userEditPage';
import { RoomDetailsPage } from './Pages/Rooms/RoomDetailsPage';
import { RoomEditPage } from './Pages/Rooms/RoomEditPage';
import { BookingDetailsPage } from './Pages/Bookings/BookingDetailsPage';
import { BookingEditPage } from './Pages/Bookings/BookingEditPage';
import { ContactEditPage } from './Pages/Contact/ContactEditPage';
import { ContactDetailsPage } from './Pages/Contact/ContactDetailsPage';

const rootElement = document.getElementById('root');

if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <UserContextProvider>
        <Provider store={Store}>
          <BrowserRouter>
            <Routes>
              <Route path='/login' element={<LoginPage />} />
              <Route path='/' element={<LayoutPage />}>
                <Route path='/' element={<PrivateRoute><DashboardPage /></PrivateRoute>} />
                <Route path='/rooms' element={<PrivateRoute><RoomsListPage /></PrivateRoute>} />
                <Route path='/room/:id' element={<PrivateRoute><RoomDetailsPage /></PrivateRoute>} />
                <Route path='/room/edit/:id' element={<PrivateRoute><RoomEditPage /></PrivateRoute>} />
                <Route path='/room/newroom' element={<PrivateRoute><RoomEditPage /></PrivateRoute>} />
                <Route path='/users' element={<PrivateRoute><UsersPage /></PrivateRoute>} />
                <Route path='/user/:id' element={<PrivateRoute><UserDetailsPage /></PrivateRoute>} />
                <Route path='/user/edit/:id' element={<PrivateRoute><UserEditPage /></PrivateRoute>} />
                <Route path='/user/newuser' element={<PrivateRoute><UserEditPage /></PrivateRoute>} />
                <Route path='/contacts' element={<PrivateRoute><ContactPage /></PrivateRoute>} />
                <Route path='/contact/:id' element={<PrivateRoute><ContactDetailsPage /></PrivateRoute>} />
                <Route path='/contact/edit/:id' element={<PrivateRoute><ContactEditPage /></PrivateRoute>} />
                <Route path='/contact/newcontact' element={<PrivateRoute><ContactEditPage /></PrivateRoute>} />
                <Route path='/bookings' element={<PrivateRoute><BookingsPage /></PrivateRoute>} />
                <Route path='/booking/:id' element={<PrivateRoute><BookingDetailsPage /></PrivateRoute>} />
                <Route path='/booking/edit/:id' element={<PrivateRoute><BookingEditPage /></PrivateRoute>} />
                <Route path='/booking/newbooking' element={<PrivateRoute><BookingEditPage /></PrivateRoute>} />
              </Route>
            </Routes>
          </BrowserRouter>
        </Provider>
      </UserContextProvider>
    </React.StrictMode>
  );
} else {
  console.error('Root element not found');
}
