import React from 'react';
import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const ProtectedRoutes = ({ children }) => {
    
    const user = JSON.parse(localStorage.getItem('user'));
    
 
    console.log('User:', user);

    // Check both token and user exist
    if (!user) {
        
        return <Navigate to="/login" />;
    }
    else {
        return children;
    }

    // Verify token is valid format
  
};

export default ProtectedRoutes;
