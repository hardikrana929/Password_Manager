import PasswordManager from "./PasswordManager";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [dark, setDark] = useState(false);
  const navigate = useNavigate();
  const changeTheme = () => {
    setDark(!dark);
  };
  const logout = () => {
    localStorage.removeItem("user");
    navigate("/login", { replace: true });
  };
  return (
    <div className={dark ? "bg-dark text-light mb-5" : "bg-light mb-5"}>
      {/* Navbar */}
      <nav
        className={`navbar navbar-expand-lg px-4 fixed-top ${dark ? "navbar-dark bg-dark" : "navbar-light bg-light"}`}
      >
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
          alt="Password-Manager-Logo"
          width="150px"
        />

        <div className="ms-auto">
          <button
            className={`btn ${dark ? "btn-outline-light" : "btn-outline-dark"} me-2`}
            onClick={changeTheme}
          >
            {dark ? (
              <i class="bi bi-brightness-high-fill"></i>
            ) : (
              <i class="bi bi-moon-fill"></i>
            )}
          </button>
          <button
            className={`btn ${dark ? "btn-outline-light" : "btn-outline-dark"}`}
            onClick={logout}
          >
            <i className="bi bi-box-arrow-right"></i>
          </button>
        </div>
      </nav>
      <div className="m-2 mt-5 mb-0">
        <PasswordManager dark={dark} />
      </div>
    </div>
  );
};
export default Navbar;
