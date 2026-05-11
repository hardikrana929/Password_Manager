import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const getUser = localStorage.getItem("user");
  
  // If user not logged in redirect to login page
  if (!getUser) {
    return <Navigate to="/login" replace />;    
  }

  // If logged in show protected component
  return children;
};

export default ProtectedRoute;