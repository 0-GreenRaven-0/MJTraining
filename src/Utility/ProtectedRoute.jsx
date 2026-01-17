// components/ProtectedRoute.jsx
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children, requiredToken }) => {
  const { hasToken } = useAuth();
  
  if (!hasToken(requiredToken)) {
    // Redirect to home or previous step
    return <Navigate to="/" replace />;
  }
  
  return children;
};

export default ProtectedRoute;