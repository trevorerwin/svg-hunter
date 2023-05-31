import React, { useState, useEffect } from "react";
import "./resetPassword.css";

const ResetPassword = () => {
    const [username, setUsername] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [email, setEmail] = useState("");
    const [resetToken, setResetToken] = useState(""); // Added ResetToken state
    const [showPassword, setShowPassword] = useState(false);
    const [message, setMessage] = useState("");

    useEffect(() => {
        // Add any necessary side effects or initialization logic here
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (newPassword !== confirmPassword) {
            setMessage("Passwords do not match");
            return;
        }

        const requestBody = {
            Username: username,
            NewPassword: newPassword,
            Email: email,
            ResetToken: resetToken, // Include ResetToken in the request body
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
                alert("Password change successful! Return To Login");
            } else {
                const errorData = await response.json();
                setMessage(errorData.message);
            }
        } catch (error) {
            console.error("Error:", error);
            setMessage("An error occurred. Please try again.");
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="container">
            <h1>Change Password</h1>
            <form id="changePasswordForm" onSubmit={handleSubmit}>
                <label htmlFor="username">Username:</label>
                <input
                    type="text"
                    id="username"
                    name="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <br />
                <label htmlFor="newPassword">New Password:</label>
                <input
                    type={showPassword ? "text" : "password"}
                    id="newPassword"
                    name="newPassword"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                />
                <br />
                <label htmlFor="confirmPassword">Confirm Password:</label>
                <input
                    type={showPassword ? "text" : "password"}
                    id="confirmPassword"
                    name="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                />
                <br />
                <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <br />
                <label htmlFor="resetToken">Reset Token:</label>
                <input
                    type="text"
                    id="resetToken"
                    name="resetToken"
                    value={resetToken}
                    onChange={(e) => setResetToken(e.target.value)}
                    required
                />
                <br />
                <input type="submit" value="Submit" />
            </form>

            {message && <p className="message">{message}</p>}

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

            <p>
                Return to <a href="http://localhost:3000/auth">Login</a>
            </p>
        </div>
    );
};

export default ResetPassword;
