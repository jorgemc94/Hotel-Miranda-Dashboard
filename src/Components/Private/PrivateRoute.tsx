import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from '../../context/userContext';

interface PrivateRouteProps {
    children: JSX.Element;
}

export const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
    const context = useContext(UserContext);

    if (!context) {
        throw new Error('UserContext must be used within a UserContextProvider');
    }

    const { state } = context;

    return state.isLoggedIn ? children : <Navigate to="/login" />;
};
