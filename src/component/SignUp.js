import { FaUser, FaLock, FaShieldAlt, FaIdBadge } from "react-icons/fa";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";
import bcrypt from "bcryptjs";
import { Link, useNavigate } from "react-router-dom";
const Signup = () => {
  const [fname, setFname] = useState("");
  const [username, setUsername] = useState("");
  const [pass, setPass] = useState("");
  const navigate = useNavigate();

  const creatUser = async (e) => {
    e.preventDefault();
    if(!fname || !username || !pass){
      toast.error("Please fill all the fields",{
        position:'top-right',
        autoClose:2000,
        theme:'colored'
      })
      return;
    }
    const hashPass = await bcrypt.hash(pass,5);
    const newUser = {
      id: uuidv4(),
      fname: fname,
      username: username,
      password:  hashPass,
    };
    localStorage.setItem('user',JSON.stringify(newUser));    
    toast.success("Account Created Successfully", {
      position: "top-right",
      autoClose: 2000,
      theme: "colored",
    });
    navigate("/login",{replace:true});
    setFname('');
    setUsername('');
    setPass('');
  };

  return (
    <div className="container-fluid min-vh-100 d-flex align-items-center justify-content-center bg-light">
      <div className="row w-100 justify-content-center">
        <div className="col-11 col-sm-10 col-md-8 col-lg-5 col-xl-4">
          <div className="card border-0 shadow-lg rounded-4 overflow-hidden">
            <div className="bg-dark text-white text-center py-4">
              <div
                className="d-inline-flex align-items-center justify-content-center rounded-circle bg-white text-dark mb-3"
                style={{ width: "70px", height: "70px" }}
              >
                <FaShieldAlt size={30} />
              </div>

              <h2 className="fw-bold mb-1">Create Account</h2>

              <p className="mb-0 text-light">
                Secure your passwords with your personal account
              </p>
            </div>

            <div className="card-body p-4 p-md-5">
              <form onSubmit={creatUser}>
                {/* Full Name */}
                <div className="mb-4">
                  <label className="form-label fw-semibold">Full Name</label>

                  <div className="input-group">
                    <span className="input-group-text bg-white border-end-0">
                      <FaIdBadge className="text-secondary" />
                    </span>

                    <input
                      type="text"
                      className="form-control border-start-0 py-2"
                      value={fname}
                      onChange={(e) => setFname(e.target.value)}
                      placeholder="Enter full name"
                    />
                  </div>
                </div>

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
                      placeholder="Choose username"
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
                      placeholder="Create password"
                      value={pass}
                      onChange={(e) => setPass(e.target.value)}
                    />
                  </div>
                </div>

                {/* Signup Button */}
                <button
                  type="submit"
                  className="btn btn-dark w-100 py-2 fw-semibold rounded-3"
                >
                  Create Account
                </button>

                {/* Login Redirect */}
                <p className="text-center mt-4 mb-0 text-secondary">
                  Already have an account?
                  <Link to="/login" className="text-decoration-none fw-bold">
                    Login
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

export default Signup;
