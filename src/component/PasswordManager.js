import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";
import "./index.css";

const PasswordManager = ({ dark }) => {
  const [passwordList, setPasswordList] = useState(() => {
    const storeData = localStorage.getItem("NewPassword");
    return storeData ? JSON.parse(storeData) : [];
  });
  const [webname, setWebname] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [search, setSearch] = useState("");
  const [editId, setEditId] = useState(null);
  const [showPass, setShowPass] = useState(false);
  //Password Show
  const passwordShow = (id) => {
    const showSpecificPassword = passwordList.map((each) => {
      if (each.id === id) {
        return { ...each, isShow: !each.isShow };
      }
      return each;
    });
    setPasswordList(showSpecificPassword);
  };
  //Check Duplicate
  const isDuplicate = passwordList.some(
    (each) =>
      each.webname.toLowerCase() === webname.trim().toLocaleLowerCase() &&
      each.username.toLowerCase() === username.trim().toLocaleLowerCase() &&
      each.id !== editId,
  );

  //Store data in localStorage
  useEffect(() => {
    localStorage.setItem("NewPassword", JSON.stringify(passwordList));
  }, [passwordList]);

  //Search Password Site
  const searchPassword = passwordList.filter((each) =>
    each.webname.toLowerCase().includes(search.toLowerCase()),
  );
  //Edit Password
  const handleEditPassword = (item) => {
    setWebname(item.webname);
    setUsername(item.username);
    setPassword(item.password);
    setEditId(item.id);
  };

  //Add Password
  const addPasswords = (e) => {
    e.preventDefault();
    if (webname === "" || username === "" || password === "") {
      toast.error("Please Fill all Fields!", {
        position: "top-right",
        autoClose: 2000,
        theme: dark ? "dark" : "colored",
      });
    } else if (isDuplicate) {
      toast.error("Password is Alrady Exist!", {
        position: "top-right",
        autoClose: 2000,
        theme: dark ? "dark" : "colored",
      });
      setUsername("");
      setPassword("");
      setWebname("");
    } else if (editId) {
      const updatePassword = passwordList.map((each) => {
        if (each.id === editId) {
          return { ...each, webname, username, password };
        }
        return each;
      });
      setPasswordList(updatePassword);
      setEditId(null);
      toast.success("Password Updated Successfully.", {
        position: "top-right",
        autoClose: 2000,
        theme: dark ? "dark" : "colored",
      });
      setWebname("");
      setUsername("");
      setPassword("");
    } else {
      const newPassword = {
        id: uuidv4(),
        webname: webname,
        username: username,
        password: password,
        isShow: false,
      };
      setPasswordList((old) => [...old, newPassword]);
      toast.success("Password Add Successfully.", {
        position: "top-right",
        autoClose: 2000,
        theme: dark ? "dark" : "colored",
      });
      setPassword("");
      setUsername("");
      setWebname("");
    }
  };

  //Delete Password
  const handleDelete = (id) => {
    const removePassword = passwordList.filter((each) => each.id !== id);
    setPasswordList(removePassword);
    toast.error("Password Deleted Successfully.", {
      position: "top-right",
      autoClose: 2000,
      theme: dark ? "dark" : "colored",
    });
  };

  const handleShowPass = () => {
    setShowPass((prev) => !prev);
  };
  return (
    <div
      className={`min-vh-100 py-4 ${dark ? "bg-dark text-light" : "bg-light"}`}
    >
      <div className="container">
        {/* Top Section */}
        <div className="row align-items-center justify-content-between g-4">
          {/* Form Section */}
          <div className="col-12 col-lg-6">
            <div
              className={`card border-0 shadow-lg rounded-4 p-3 p-md-4 ${
                dark ? "bg-secondary text-light" : ""
              }`}
            >
              <h3 className="fw-bold mb-4 text-center text-md-start">
                {editId ? "Update Password" : "Add New Password"}
              </h3>

              <form onSubmit={addPasswords}>
                {/* Website */}
                <div className="mb-3">
                  <label className="form-label fw-semibold">Website Name</label>

                  <div className="input-group">
                    <span
                      className={`input-group-text ${
                        dark ? "bg-dark text-light border-secondary" : ""
                      }`}
                    >
                      <i className="bi bi-globe2"></i>
                    </span>

                    <input
                      type="text"
                      value={webname}
                      onChange={(e) => setWebname(e.target.value)}
                      className={`form-control ${
                        dark ? "bg-dark text-light border-secondary" : ""
                      }`}
                      placeholder="Enter Website"
                    />
                  </div>
                </div>

                {/* Username */}
                <div className="mb-3">
                  <label className="form-label fw-semibold">
                    Username / Email
                  </label>

                  <div className="input-group">
                    <span
                      className={`input-group-text ${
                        dark ? "bg-dark text-light border-secondary" : ""
                      }`}
                    >
                      <i className="bi bi-person"></i>
                    </span>

                    <input
                      type="email"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className={`form-control ${
                        dark ? "bg-dark text-light border-secondary" : ""
                      }`}
                      placeholder="Enter Username"
                    />
                  </div>
                </div>

                {/* Password */}
                <div className="mb-4">
                  <label className="form-label fw-semibold">Password</label>

                  <div className="input-group">
                    <span
                      className={`input-group-text ${
                        dark ? "bg-dark text-light border-secondary" : ""
                      }`}
                    >
                      <i className="bi bi-lock"></i>
                    </span>

                    <input
                      type={showPass ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className={`form-control ${
                        dark ? "bg-dark text-light border-secondary" : ""
                      }`}
                      placeholder="Enter Password"
                    />

                    <span
                      className={`input-group-text ${
                        dark ? "bg-dark text-light border-secondary" : ""
                      }`}
                      style={{ cursor: "pointer" }}
                      onClick={handleShowPass}
                    >
                      {showPass ? (
                        <i className="bi bi-eye-slash-fill"></i>
                      ) : (
                        <i className="bi bi-eye-fill"></i>
                      )}
                    </span>
                  </div>
                </div>

                {/* Button */}
                <button
                  className="btn w-100 py-2 fw-semibold rounded-3"
                  style={{
                    backgroundColor: "#7a88c6",
                    color: "#fff",
                  }}
                >
                  {editId ? "Update Password" : "Add Password"}
                </button>
              </form>
            </div>
          </div>

          {/* Image Section */}
          <div className="col-12 col-lg-6 text-center">
            <img
              src="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png"
              alt="password manager"
              className="img-fluid d-none d-lg-block float-end"
              style={{
                maxWidth: "100%",
                maxHeight: "450px",
                objectFit: "contain",
              }}
            />
          </div>
        </div>

        {/* Saved Passwords */}
        <div className="mt-5">
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-4">
            <h3 className="fw-bold m-0">
              Saved Passwords
              <span
                className={`ms-2 badge rounded-pill ${
                  dark ? "bg-light text-dark" : "bg-dark text-light"
                }`}
              >
                {searchPassword.length}
              </span>
            </h3>

            {/* Search */}
            <div className="input-group" style={{ maxWidth: "350px" }}>
              <span className="input-group-text">
                <i className="bi bi-search"></i>
              </span>

              <input
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="form-control"
                placeholder="Search Password..."
              />
            </div>
          </div>

          {/* No Password */}
          {searchPassword.length === 0 ? (
            <div className="text-center py-5">
              <img
                src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
                alt="No Password"
                className="img-fluid mb-3"
                style={{ maxWidth: "280px" }}
              />

              <h4 className="fw-bold text-primary">No Passwords Found</h4>
            </div>
          ) : (
            <div className="row g-4">
              {searchPassword.map((item) => (
                <div className="col-12 col-sm-6 col-lg-4" key={item.id}>
                  <div
                    className={`card h-100 border-0 shadow rounded-4 ${
                      dark ? "bg-secondary text-light" : ""
                    }`}
                  >
                    <div className="card-body d-flex flex-column">
                      {/* Website */}
                      <h5 className="fw-bold mb-3 text-truncate">
                        {item.webname}
                      </h5>

                      {/* Username */}
                      <p className="mb-2 text-break">
                        <strong>Username:</strong> {item.username}
                      </p>

                      {/* Password */}
                      <p className="mb-4">
                        <strong>Password:</strong>{" "}
                        {item.isShow ? item.password : "••••••••"}
                      </p>

                      {/* Buttons */}
                      <div className="d-flex justify-content-end gap-2 mt-auto">
                        {/* Show */}
                        <button
                          className={`btn btn-sm ${
                            dark ? "btn-outline-light" : "btn-outline-primary"
                          }`}
                          onClick={() => passwordShow(item.id)}
                        >
                          {item.isShow ? (
                            <i className="bi bi-eye-slash-fill"></i>
                          ) : (
                            <i className="bi bi-eye-fill"></i>
                          )}
                        </button>

                        {/* Edit */}
                        <button
                          className={`btn btn-sm ${
                            dark ? "btn-outline-warning" : "btn-outline-warning"
                          }`}
                          onClick={() => handleEditPassword(item)}
                        >
                          <i className="bi bi-pencil-square"></i>
                        </button>

                        {/* Delete */}
                        <button
                          className={`btn btn-sm ${
                            dark ? "btn-outline-danger" : "btn-outline-danger"
                          }`}
                          onClick={() => handleDelete(item.id)}
                        >
                          <i className="bi bi-trash-fill"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PasswordManager;
