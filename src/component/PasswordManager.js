import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";
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
  const [showPass,setShowPass] = useState(false);
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
    if (isDuplicate) {
      toast.error("Password is Alrady Exist!", {
        position: "top-right",
        autoClose: 2000,
        theme: "colored",
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
        theme: "colored",
      });
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
        theme: "colored",
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
      theme: "colored",
    });
  };

  const handleShowPass = () =>{
    setShowPass(prev =>!prev)
  }
  return (
    <div
      className={dark ? "bg-dark text-light min-vh-100" : "bg-light min-vh-100"}
    >
      {/* Main Section */}
      <div className="container py-5">
        <div className="row align-items-center">
          {/* Left Form */}
          <div className="col-md-6">
            <div
              className={`card shadow-lg border-0 p-4 ${dark ? "bg-secondary text-light" : ""}`}
            >
              <h4 className="mb-4 fw-bold">Add New Password</h4>
              <form onSubmit={addPasswords}>
                <div className="mb-3">
                  <label className="form-label">Website Name</label>
                  <div className="input-group">
                    <span
                      className={`input-group-text ${dark ? "bg-dark text-light border-light" : ""}`}
                    >
                      <i className="bi bi-globe2"></i>
                    </span>
                    <input
                      type="text"
                      name="webname"
                      value={webname}
                      onChange={(e) => setWebname(e.target.value)}
                      className={`form-control ${dark ? "bg-dark text-light border-light" : ""}`}
                      placeholder="Enter website"
                    />
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label">Username</label>
                  <div className="input-group">
                    <span
                      className={`input-group-text ${dark ? "bg-dark text-light border-light" : ""}`}
                    >
                      <i className="bi bi-person"></i>
                    </span>
                    <input
                      type="email"
                      name="username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className={`form-control ${dark ? "bg-dark text-light border-light" : ""}`}
                      placeholder="Enter username"
                    />
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label">Password</label>
                  <div className="input-group">
                    <span
                      className={`input-group-text ${dark ? "bg-dark text-light border-light" : ""}`}
                    >
                      <i className="bi bi-lock"></i>
                    </span>
                    <input
                      type={showPass?"text":"password"}
                      name="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className={`form-control ${dark ? "bg-dark text-light border-light" : ""}`}
                      placeholder="Enter password"
                    />
                    <span
                      className={`input-group-text ${dark ? "bg-dark text-light border-light" : ""}`}
                      onClick={handleShowPass}
                      style={{cursor:"pointer"}}
                    >
                      {showPass ? (
                        <i className="bi bi-eye-slash-fill"></i>
                      ) : (
                        <i className="bi bi-eye-fill"></i>
                      )}
                    </span>
                  </div>
                </div>

                <button
                  className="btn w-100"
                  style={{ backgroundColor: "#7a88c6", color: "#ffffff" }}
                >
                  {editId ? "Update Password" : "Add Password"}
                </button>
              </form>
            </div>
          </div>

          {/* Right Image */}
          <div className="d-none d-md-block col-md-6 text-center">
            <img
              src="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png"
              alt="password"
              className="img-fluid"
              style={{ maxHeight: "400px" }}
            />
          </div>
        </div>

        {/* Password Cards */}
        <div className="mt-5">
          <h4 className="fw-bold mb-4">Saved Passwords</h4>
          <div className="mb-3">
            <div className="input-group">
              <span className="input-group-text">
                <i class="bi bi-search"></i>
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
          {searchPassword.length === 0 ? (
            <div className="vh-50 p-5">
              <img
                src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
                alt="No Password exist"
                width="300px"
                className="mx-auto d-block"
              />
              <p
                className="fw-bold fs-3 text-center"
                style={{ color: "#002fff" }}
              >
                No Password Exist
              </p>
            </div>
          ) : (
            <div>
              {/* Password Card */}
              <div className="row g-4">
                {searchPassword.map((item) => (
                  <div className="col-md-4" key={item}>
                    <div
                      className={`card shadow border-0 ${dark ? "bg-secondary text-light" : ""}`}
                    >
                      <div className="card-body">
                        <h5 className="card-title">{item.webname}</h5>
                        <p className="mb-1">
                          <strong>Username:</strong>
                          {item.username}
                        </p>
                        <p className="mb-3">
                          <strong>Password:</strong>
                          {item.isShow ? item.password : "••••••••"}
                        </p>

                        <div className="d-flex justify-content-end gap-2">
                          <button
                            className={`btn btn-sm ${dark ? "btn-outline-light" : "btn-outline-primary"}`}
                            onClick={() => passwordShow(item.id)}
                          >
                            {item.isShow ? (
                              <i className="bi bi-eye-slash-fill"></i>
                            ) : (
                              <i className="bi bi-eye-fill"></i>
                            )}
                          </button>
                          <button
                            className={`btn btn-sm ${dark ? "btn-outline-light" : "btn-outline-primary"}`}
                            onClick={() => handleEditPassword(item)}
                          >
                            <i className="bi bi-pencil-square"></i>
                          </button>
                          <button
                            className={`btn btn-sm ${dark ? "btn-outline-light" : "btn-outline-primary"}`}
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
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PasswordManager;
