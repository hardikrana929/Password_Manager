import { ToastContainer } from "react-toastify";
import Login from "./component/Login";
import Signup from "./component/SignUp";
import Navbar from "./component/Navbar";
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./component/ProtectedRoute";
import ForgotPass from "./component/ForgotePass";
function App() {
  return (
    <>
      <ToastContainer />

      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot" element={<ForgotPass />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Navbar />
            </ProtectedRoute>
          }
        />
        
      </Routes>
    </>
  );
}

export default App;
