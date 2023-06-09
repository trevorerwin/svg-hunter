import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import "../App.css";
import AuthContext from "./AuthContext";
import APIURL from "../Helper/environment";

const Login = (props) => {
  // UseState variables
  const [Username, setUsername] = useState("");
  const [Passphrase, setPassphrase] = useState("");
  const [error, setError] = useState(""); // Track error message
  //BrowserRouter Hook
  const navigate = useNavigate();

  const { updateToken } = useContext(AuthContext);

  //Functions Here
  async function handleSubmit(e) {
    e.preventDefault();
    //take path from postman
    let url = `${APIURL}/user/login`;
    //take the body of postman
    let bodyObject = {
      Username: Username,
      Passphrase: Passphrase,
    };

    let myHeaders = new Headers();
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
      if (data.message === "Login successful") {
        updateToken(data.token);
        navigate("/svg-hunter");
      } else {
        // Handle error response from the backend
        setError(data.message);
      }
    } catch (error) {
      console.error(error.message);
    }
  }

  return (
    <>
      <h2 className="text-center" id="login-text">
        Login to your account
      </h2>
      {/* Start of Username */}
      <Form className="form-label" onSubmit={handleSubmit}>
        <FormGroup>
          <Label> Username:</Label>
          <Input
            value={Username}
            type="text"
            onChange={(e) => setUsername(e.target.value)}
            className={error === "User Not Found" ? "error" : ""}
          />
        </FormGroup>

        {/* End of Username */}

        {/* Start of Password */}
        <FormGroup>
          <Label>Passphrase:</Label>
          <Input
            className={error === "Invalid Passphrase" ? "error" : ""}
            value={Passphrase}
            type="password"
            onChange={(e) => setPassphrase(e.target.value)}
          />
        </FormGroup>
        {error && <p className="error">{error}</p>}
        {/* End of Password */}

        {/* Start of form submit button */}
        <div className="btn-login">
          <Button id="submit-button-login" type="submit">
            Login
          </Button>
        </div>
        <br />
        <Link className="center" to="/ForgotPassword">
          Forgot Password
        </Link>
        {/* End of form submit button */}
      </Form>
    </>
  );
};

export default Login;
