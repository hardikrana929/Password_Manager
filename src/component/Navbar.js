import PasswordManager from "./PasswordManager";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [dark, setDark] = useState(false);
  const navigate = useNavigate();

  // Change Theme
  const changeTheme = () => {
    setDark(!dark);
  };

  // Logout
  const logout = () => {
    localStorage.removeItem("user");
    navigate("/login", { replace: true });
  };

  return (
    <div className={`min-vh-100 ${dark ? "bg-dark text-light" : "bg-light"}`}>
      {/* Navbar */}
      <nav
        className={`navbar navbar-expand-lg fixed-top shadow-sm px-3 px-md-4 py-3 ${
          dark ? "navbar-dark bg-dark" : "navbar-light bg-white"
        }`}
      >
        <div className="container-fluid">
          {/* Logo */}
          <a className="navbar-brand d-flex align-items-center" href="/">
            <img
              src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
              alt="Password Manager Logo"
              className="img-fluid"
              style={{
                width: "140px",
                objectFit: "contain",
              }}
            />
          </a>

          {/* Mobile Toggle */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarContent"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Navbar Content */}
          <div
            className="collapse navbar-collapse justify-content-end mt-3 mt-lg-0"
            id="navbarContent"
          >
            <div className="d-flex align-items-center gap-2">
              {/* Theme Button */}
              <button
                className={`btn rounded-circle d-flex align-items-center justify-content-center ${
                  dark ? "btn-outline-light" : "btn-outline-dark"
                }`}
                style={{
                  width: "42px",
                  height: "42px",
                }}
                onClick={changeTheme}
              >
                {dark ? (
                  <i className="bi bi-brightness-high-fill"></i>
                ) : (
                  <i className="bi bi-moon-fill"></i>
                )}
              </button>

              {/* Logout Button */}
              <button
                className={`btn d-flex align-items-center gap-2 px-3 ${
                  dark ? "btn-outline-light" : "btn-outline-dark"
                }`}
                onClick={logout}
              >
                <i className="bi bi-box-arrow-right"></i>

                <span className="d-none d-sm-inline">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div
        style={{
          paddingTop: "90px",
        }}
      >
        <div className="container-fluid px-2 px-md-3">
          <PasswordManager dark={dark} />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
