import { FaUser, FaLock, FaShieldAlt } from "react-icons/fa";
import { useState } from "react";
import { toast } from "react-toastify";
import bcrypt from "bcryptjs";
import { useNavigate } from "react-router-dom";

const ForgotPass = () => {
  const [username, setUsername] = useState("");
  const [newPass, setNewPass] = useState("");

  const navigate = useNavigate();

  const resetPassword = async (e) => {
    e.preventDefault();
    if (!username || !newPass) {
      toast.error("Please fill all the fields", {
        position: "top-right",
        autoClose: 2000,
        theme: "colored",
      });
      return;
    }
    const getUser = JSON.parse(localStorage.getItem("user"));

    // Check user exists
    if (!getUser) {
      toast.error("No account found", {
        position: "top-right",
        autoClose: 2000,
        theme: "colored",
      });
      return;
    }

    // Verify username
    if (getUser.username !== username) {
      toast.error("Invalid Username", {
        position: "top-right",
        autoClose: 2000,
        theme: "colored",
      });
      return;
    } else {
      // Hash new password
      const hashedPass = await bcrypt.hash(newPass, 5);

      // Update password
      const updatedUser = {
        ...getUser,
        password: hashedPass,
      };

      localStorage.setItem("user", JSON.stringify(updatedUser));

      toast.success("Password Updated Successfully", {
        position: "top-right",
        autoClose: 2000,
        theme: "colored",
      });
      setUsername("");
      setNewPass("");

      setTimeout(() => {
        navigate("/login");
      }, 2000);
    }
  };

  return (
    <div className="container-fluid min-vh-100 d-flex align-items-center justify-content-center bg-light">
      <div className="row w-100 justify-content-center">
        <div className="col-11 col-sm-10 col-md-8 col-lg-5 col-xl-4">
          <div className="card border-0 shadow-lg rounded-4 overflow-hidden">
            {/* Header */}
            <div className="bg-dark text-white text-center py-4">
              <div
                className="d-inline-flex align-items-center justify-content-center rounded-circle bg-white text-dark mb-3"
                style={{ width: "70px", height: "70px" }}
              >
                <FaShieldAlt size={30} />
              </div>

              <h2 className="fw-bold mb-1">Reset Password</h2>

              <p className="mb-0 text-light">Create a new secure password</p>
            </div>

            {/* Form */}
            <div className="card-body p-4 p-md-5">
              <form onSubmit={resetPassword}>
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
                      required
                    />
                  </div>
                </div>

                {/* New Password */}
                <div className="mb-4">
                  <label className="form-label fw-semibold">New Password</label>

                  <div className="input-group">
                    <span className="input-group-text bg-white border-end-0">
                      <FaLock className="text-secondary" />
                    </span>

                    <input
                      type="password"
                      className="form-control border-start-0 py-2"
                      placeholder="Enter new password"
                      value={newPass}
                      onChange={(e) => setNewPass(e.target.value)}
                      required
                    />
                  </div>
                </div>

                {/* Button */}
                <button
                  type="submit"
                  className="btn btn-dark w-100 py-2 fw-semibold rounded-3"
                >
                  Update Password
                </button>

                {/* Back Login */}
                <p className="text-center mt-4 mb-0 text-secondary">
                  Remember password?{" "}
                  <a href="/login" className="text-decoration-none fw-bold">
                    Back to Login
                  </a>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPass;
