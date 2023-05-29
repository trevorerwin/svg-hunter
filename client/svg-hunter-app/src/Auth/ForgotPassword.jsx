import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";

const ForgotPassword = () => {
  const [Email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = "http://localhost:4000/user/reset-password";
    const bodyObject = {
      Email: Email,
    };

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const requestOptions = {
      headers: myHeaders,
      method: "POST",
      body: JSON.stringify(bodyObject),
    };

    try {
      const response = await fetch(url, requestOptions);
      const data = await response.json();
      console.log(data);

      if (response.ok) {
        // Password reset email sent successfully
        navigate("/auth");
      } else {
        // Handle error response from the backend
        console.error("Error resetting password:", data.message);
      }
    } catch (error) {
      console.error("Error resetting password:", error.message);
    }
  };

  return (
    <>
      <div
        className="forgot-password"
        style={{ display: "flex", justifyContent: "center" }}
      >
        <h2 className="text-center">Forgot Password</h2>

        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label>Email:</Label>
            <Input
              style={{ width: "100%" }}
              value={Email}
              type="email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormGroup>

          <div className="btn-password">
            <Button type="submit">Reset Password</Button>
          </div>

          <p>
            Remember your password? <Link to="/auth">Go back to login</Link>
          </p>
        </Form>
      </div>
    </>
  );
};

export default ForgotPassword;
