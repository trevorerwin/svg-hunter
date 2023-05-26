import { useState } from "react";
import { Button, Col, Container, Row } from "reactstrap";
import Login from "./Login";
import Signup from "./Signup";

const AuthToggle = (props) => {
  const [showLogin, setShowLogin] = useState(true);
  return (
    <Container>
      <Row>
        <Col className="d-grid justify-center ">
          <div className="login-signup-toggle">
            {showLogin ? <Login /> : <Signup />}
            <button
              type="button"
              className="btn btn-link"
              onClick={() => setShowLogin(!showLogin)}
            >
              {showLogin
                ? "Don't have an account? Register now!"
                : "Already have an account? Login"}
            </button>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default AuthToggle;
