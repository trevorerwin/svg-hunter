import React, { useState, useEffect } from "react";
import "./resetPassword.css";
import { useLocation } from "react-router-dom";
import { Button, Input, Label } from "reactstrap";

const ResetPassword = () => {
  const [username, setUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [resetToken, setResetToken] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({
    newPassword: "",
    confirmPassword: "",
    email: "",
    resetToken: "",
    username: "",
  });
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    // Add any necessary side effects or initialization logic here
  }, []);

  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);

    const Token = queryParams.get("token");
    if (Token != null) {
      setResetToken(Token);
    }
  }, [location]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (newPassword !== confirmPassword) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        confirmPassword: "Passwords do not match",
      }));
      return;
    }

    // Reset the error messages on submit
    setErrors({
      newPassword: "",
      confirmPassword: "",
      email: "",
      resetToken: "",
      username: "",
    });

    const requestBody = {
      Username: username,
      NewPassword: newPassword,
      Email: email,
      ResetToken: resetToken,
    };

    try {
      const response = await fetch(
        "http://localhost:4000/user/update-password",
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        }
      );

      if (response.ok) {
        const data = await response.json();
        setSuccess(true);
      } else {
        const errorData = await response.json();
        setErrors((prevErrors) => ({
          ...prevErrors,
          username: errorData.message,
          resetToken: errorData.message, // Set error for the resetToken field
        }));
      }
    } catch (error) {
      console.error("Error:", error);
      setErrors((prevErrors) => ({
        ...prevErrors,
        username: "An error occurred. Please try again.",
        resetToken: "An error occurred. Please try again.", // Set error for the resetToken field
      }));
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="change-container">
      <h1 className="text-page">Change Password</h1>
      <form id="changePasswordForm" onSubmit={handleSubmit}>
        <div
          className="new-input"
          style={{ fontSize: "1.5rem", textAlign: "left" }}
        >
          <label htmlFor="username">Username:</label>
          <div
            className="custom"
            style={{ display: "flex", justifyContent: "center" }}
          >
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className={errors.username ? "error" : ""}
              style={{ textAlign: "left" }}
            />
          </div>
        </div>
        {errors.username && <p className="error">{errors.username}</p>}
       <br />
        <div
          className="new-input"
          style={{ fontSize: "1.5rem", textAlign: "left" }}
        >
          <label htmlFor="newPassword">New Password:</label>
          <input
            type={showPassword ? "text" : "password"}
            id="newPassword"
            name="newPassword"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
            className={errors.newPassword ? "error" : ""}
            style={{ textAlign: "left" }}
          />
        </div>
        {errors.newPassword && <p className="error">{errors.newPassword}</p>}
        <br />
        <div
          className="new-input"
          style={{ fontSize: "1.5rem", textAlign: "left" }}
        >
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <div className="d-flex justify-content-center">
            <input
              type={showPassword ? "text" : "password"}
              id="confirmPassword"
              name="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className={errors.confirmPassword ? "error" : ""}
              style={{ textAlign: "left" }}
            />
          </div>
        </div>
        {errors.confirmPassword && (
          <p className="error">{errors.confirmPassword}</p>
        )}
        <br />
        <div
          className="new-input"
          style={{ fontSize: "1.5rem", textAlign: "left" }}
        >
          <label htmlFor="email">Email:</label>
          <div className="d-flex justify-content-center">
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className={errors.email ? "error" : ""}
            />
            {errors.email && <p className="error">{errors.email}</p>}
            <br />
          </div>
        </div>
        {/* <label htmlFor="resetToken">Reset Token:</label>
                <input
                    disabled
                    type="text"
                    id="resetToken"
                    name="resetToken"
                    value={resetToken}
                    onChange={(e) => setResetToken(e.target.value)}
                    required
                    // className={errors.resetToken ? "error" : ""}
                    style={{ textAlign: "left" }}
                /> */}

        <br />
        <input
          className="submit"
          id="chagne-color"
          type="submit"
          value="Submit"
        />
      </form>

      <div className="togglePassword">
        <input
          type="checkbox"
          id="showPassword"
          name="showPassword"
          checked={showPassword}
          onChange={togglePasswordVisibility}
        />
        <label htmlFor="showPassword">Show Password</label>
      </div>
      <p className="return-to-login-button">
        Return to <a href="http://localhost:3000/auth">Login</a>
      </p>

      {success && (
                <div className="alert alert-success">
                    Password change successful! Return to Login
                </div>
            )}

        </div>
      )}
    </div>
  );
};

export default ResetPassword;
