import { Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../../context/userContext';

export const PrivateRoute = ({ children }) => {
    const { state } = useContext(UserContext);

    return state.isLoggedIn ? children : <Navigate to="/login" />;
};
