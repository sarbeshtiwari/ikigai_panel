import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ element: Component, ...rest }) => {
    const token = localStorage.getItem('authToken');
    const expiryTime = localStorage.getItem('expiryTime');
    const isTokenExpired = !token || Date.now() > expiryTime;

    if (isTokenExpired) {
        localStorage.removeItem('authToken');
        localStorage.removeItem('expiryTime');
        return <Navigate to="/login" replace />;
    }

    return Component;
};

export default PrivateRoute;
