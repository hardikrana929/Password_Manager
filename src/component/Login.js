import { FaUser, FaLock, FaShieldAlt } from "react-icons/fa";
import { useState } from "react";
import { toast } from "react-toastify";
import bcrypt from "bcryptjs";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [pass, setPass] = useState("");
  const navigate = useNavigate();

  const verifyUser = async (e) => {
    e.preventDefault();
    if (!username || !pass) {
      toast.error("Please fill all the fields", {
        position: "top-right",
      });
      return;
    }
    const getUser = JSON.parse(localStorage.getItem("user"));
    if (!getUser) {
      toast.error("User not Exist, Please Signup", {
        position: "top-right",
        autoClose: 2000,
        theme: "colored",
      });
      navigate("/signup", { replace: true });
      return;
    } else {
      if (pass.length < 5) {
        toast.error("Passwort is too short. Enter minimum 8 digit password.", {
          position: "top-right",
          autoClose: 2000,
          theme: "colored",
        });
        return;
      } else {
        const verifypass = await bcrypt.compare(pass, getUser.password);
        if (getUser.username === username && verifypass) {
          toast.success("Login Successfull", {
            position: "top-right",
            autoClose: 2000,
            theme: "colored",
          });
          setUsername("");
          setPass("");
          navigate("/", { replace: true });
        } else {
          toast.error("Invalid Username or Password", {
            position: "top-right",
            autoClose: 2000,
            theme: "colored",
          });
        }
      }
    }
  };
  return (
    <div className="container-fluid min-vh-100 d-flex align-items-center justify-content-center bg-light">
      <div className="row w-100 justify-content-center">
        <div className="col-11 col-sm-10 col-md-8 col-lg-5 col-xl-4">
          <div
            className="card border-0 shadow-lg rounded-4 overflow-hidden"
            style={{ backdropFilter: "blur(10px)" }}
          >
            {/* Top Section */}
            <div className="bg-dark text-white text-center py-4">
              <div
                className="d-inline-flex align-items-center justify-content-center rounded-circle bg-white text-dark mb-3"
                style={{ width: "70px", height: "70px" }}
              >
                <FaShieldAlt size={30} />
              </div>

              <h2 className="fw-bold mb-1">Welcome Back</h2>
              <p className="mb-0 text-light">
                Login to access your secure passwords
              </p>
            </div>

            {/* Form Section */}
            <div className="card-body p-4 p-md-5">
              <form onSubmit={verifyUser}>
                {/* Username */}
                <div className="mb-4">
                  <label className="form-label fw-semibold">Username</label>

                  <div className="input-group">
                    <span className="input-group-text bg-white border-end-0">
                      <FaUser className="text-secondary" />
                    </span>

                    <input
                      type="text"
                      className="form-control border-start-0 py-2"
                      placeholder="Enter username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </div>
                </div>

                {/* Password */}
                <div className="mb-4">
                  <label className="form-label fw-semibold">Password</label>

                  <div className="input-group">
                    <span className="input-group-text bg-white border-end-0">
                      <FaLock className="text-secondary" />
                    </span>

                    <input
                      type="password"
                      className="form-control border-start-0 py-2"
                      placeholder="Enter password"
                      value={pass}
                      onChange={(e) => setPass(e.target.value)}
                    />
                  </div>
                </div>

                {/* Forgot */}
                <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-2">
                  <Link
                    to="/forgot"
                    className="text-decoration-none fw-semibold"
                  >
                    Forgot Password?
                  </Link>
                </div>

                {/* Login Button */}
                <button
                  type="submit"
                  className="btn btn-dark w-100 py-2 fw-semibold rounded-3"
                >
                  Login
                </button>

                {/* Signup */}
                <p className="text-center mt-4 mb-0 text-secondary">
                  Don’t have an account?
                  <Link to="/signup" className="text-decoration-none fw-bold">
                    Create Account
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
