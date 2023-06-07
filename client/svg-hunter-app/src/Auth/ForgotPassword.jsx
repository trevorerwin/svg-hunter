import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button, Form, FormGroup, Input, Label } from 'reactstrap';

const ForgotPassword = (props) => {
  const [email, setEmail] = useState('');
  const [emailSent, setEmailSent] = useState(false); // Track whether email is sent
  const [error, setError] = useState(''); // Track error message
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = 'http://localhost:4000/user/reset-password';
    const bodyObject = {
      Email: email,
    };

    const myHeaders = new Headers();
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

      if (response.ok) {
        // Password reset email sent successfully
        setEmailSent(true);
        setError('');
      } else {
        // Handle error response from the backend
        setEmailSent(false);
        setError(data.message);
      }
    } catch (error) {
      console.error('Error resetting password:', error.message);
    }
  };

  return (
    <>
      <div className='forgot-password' style={{ display: 'flex', justifyContent: 'center' }}>
        <h2 className='text-center'>{props.title}</h2>

        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label>Email:</Label>
            <Input style={{ width: '100%' }} value={email} type='email' onChange={(e) => setEmail(e.target.value)} />
          </FormGroup>

          <div className='btn-password'>
            <Button id='reset-password' type='submit'>
              Reset Password
            </Button>
          </div>

          {emailSent && (
            <div className='alert alert-success text-center' style={{ marginTop: '20px' }}>
              Reset password email sent.
            </div>
          )}

          {error && (
            <div className='alert alert-danger text-center' style={{ marginTop: '20px' }}>
              {error}
            </div>
          )}
          <p className='remember'>
            Remember your password? <Link to='/auth'>Go back to login</Link>
          </p>
        </Form>
      </div>
    </>
  );
};

export default ForgotPassword;
