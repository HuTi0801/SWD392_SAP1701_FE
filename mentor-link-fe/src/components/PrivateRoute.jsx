import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PrivateRoute = ({ element, allowedRoles }) => {
  const { auth } = useAuth();
  console.log("PrivateRoute - auth:", auth);

  if (!auth || !auth.result) {
    console.log("No auth or result, redirecting to login");
    return <Navigate to="/login" replace />;
  }

  // Parse roles from the string containing multiple permissions
  const userRoles = auth.result.role?.replace('[', '').replace(']', '').split(', ') || [];
  console.log("User roles:", userRoles);

  // Map 'lecturer' to 'ROLE_LECTURE' for the check
  const roleMapping = {
    'lecturer': 'ROLE_LECTURE',
    'mentor': 'ROLE_MENTOR',
    'student': 'ROLE_STUDENT'
  };

  const hasRequiredRole = allowedRoles.some(role =>
    userRoles.includes(roleMapping[role])
  );

  if (!hasRequiredRole) {
    console.log("User lacks required role");
    if (userRoles.includes('ROLE_STUDENT')) {
      return <Navigate to="/" replace />;
    } else if (userRoles.includes('ROLE_MENTOR')) {
      return <Navigate to="/appointment-list-mentor" replace />;
    } else if (userRoles.includes('ROLE_LECTURE')) {
      return <Navigate to="/home-lecturer" replace />;
    }

    return <Navigate to="/login" replace />;
  }

  return element;
};

export default PrivateRoute;
