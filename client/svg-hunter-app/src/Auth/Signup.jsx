import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import AuthContext from "./AuthContext";

// firstName lastName username password
const Signup = (props) => {
  // UseState variables on top
  const [Name, setName] = useState("");
  const [Email, setEmail] = useState("");
  const [Username, setUsername] = useState("");
  const [Passphrase, setPassphrase] = useState("");
 

  // BrowserRouter Navigate
  const navigate = useNavigate();

  const {updateToken} = useContext(AuthContext)

  // Functions Here
  async function handleSubmit(e) {
    e.preventDefault();
    // take path from your postman
    let url = `http://localhost:4000/user/signup`;
    // take what works in your postman, copy the body over and set them to the variables
    let bodyObject = {
      Name: Name,
      Email: Email,
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
      if (data.message === "new user created") {
        updateToken(data.token);
        navigate("/svg-hunter");
      }
    } catch (error) {
      console.error(error.message);
    }
  }

  return (
    <>
      <h2 className="text-center">Please fill out the form below to register</h2>
      <Form onSubmit={handleSubmit}>
        {/* Start of Name */}
        <FormGroup>
          <Label>Name:</Label>
          <Input
            value={Name}
            onChange={(e) => setName(e.target.value)}
          />
        </FormGroup>
        {/* End of Name */}

        {/* Start of Email */}
        <FormGroup>
          <Label>Email:</Label>
          <Input
            type="email"
            required
            value={Email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormGroup>
        {/* End of Email */}

        {/* Start of Username */}
        <FormGroup>
          <Label>Username:</Label>
          <Input
            value={Username}
            type="username"
            required
            onChange={(e) => setUsername(e.target.value)}
          />
        </FormGroup>
        {/* End of Username */}

        {/* Start of Password */}
        <FormGroup>
          <Label>Passphrase:</Label>
          <Input
            value={Passphrase}
            type="password"
            required
            onChange={(e) => setPassphrase(e.target.value)}
          />
        </FormGroup>
        {/* End of Password */}

        {/* Start of form submit button */}
        <div class="d-grid gap-2 mb-4">
          <Button id="submit-button-signup" type="submit" >
            Signup
          </Button>
        </div>
        {/* Eond of form submit button */}
      </Form>
    </>
  );
};

export default Signup;
