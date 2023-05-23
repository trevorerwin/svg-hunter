import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Form, FormGroup, Input, Label } from 'reactstrap';
import '../App.css';

const Login = (props) => {
  // UseState variables
  const [Username, setUsername] = useState('');
  const [Passphrase, setPassphrase] = useState('');
  //BrowserRouter Hook
  // const navigate = useNavigate();

  //Functions Here
  async function handleSubmit(e) {
    e.preventDefault();
    //take path from postman
    let url = `http://localhost:4000/user/login`;
    //take the body of postman
    let bodyObject = {
      Username: Username,
      Passphrase: Passphrase,
    };

    let myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    const requestOptions = {
      headers: myHeaders,
      method: 'POST',
      body: JSON.stringify(bodyObject),
    };

    try {
      const response = await fetch(url, requestOptions);
      const data = await response.json();
      console.log(data);
      if (data.message === 'passwords matched') {
        props.updateToken(data.token);
        //   navigate("/lobby")
      }
    } catch (error) {
      console.error(error.message);
    }
  }
  return (
    <>
      <h2 className='text-center text-warning'>Hello from Login</h2>
      {/* Start of Username */}
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label> Username:</Label>
          <Input value={Username} type='text' onChange={(e) => setUsername(e.target.value)}></Input>
        </FormGroup>

        {/* End of Username */}

        {/* Start of Password */}
        <FormGroup>
          <Label>Passphrase:</Label>
          <Input value={Passphrase} type='password' onChange={(e) => setPassphrase(e.target.value)} />
        </FormGroup>

        {/* End of Password */}

        {/* Start of form submit button */}
        <div className='d-grid gap-2 mb-4'>
          <Button id='submit-button-login' type='submit'>
            Login
          </Button>
        </div>
        {/* Eond of form submit button */}
      </Form>
    </>
  );
};

export default Login;
