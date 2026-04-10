import PasswordManager from "./component/PasswordManager";
import { ToastContainer } from "react-toastify";
import { useState } from "react";
function App() {
  const [dark, setDark] = useState(false);
  const changeTheme = () => {
    setDark(!dark);
  };
  return (
    <div>
      <ToastContainer />
      <div
        className={
          dark ? "bg-dark text-light min-vh-100" : "bg-light min-vh-100"
        }
      >
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
          </div>
        </nav>
        <div className="m-5">
          <PasswordManager dark={dark} />
        </div>
      </div>
    </div>
  );
}

export default App;
