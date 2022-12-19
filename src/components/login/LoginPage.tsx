import React, { useState } from "react";
import { Col, Row, Container } from "react-bootstrap";
import { useRouter } from "next/router";

import Card from "@components/common/cards";
import { Error } from "@components/common/alerts";

import LoginForm from "./LoginForm";
import RegistrationForm from "./RegistrationForm";

const LoginPage = ({
  loggingIn,
  requestingAccount,
  registerError,
  loginError,
}) => {
  const [registering, setRegistering] = useState(false);
  const router = useRouter();
  const formComponent = registering ? (
    <>
      <RegistrationForm
        submitting={requestingAccount}
        onRegisterSuccess={() => router.push("/tournaments")}
      />
      <div className="mt-3">
        <p className="mb-0 text-center">
          <a
            role="button"
            className="text-secondary"
            onClick={() => setRegistering(false)}
          >
            Go Back
          </a>
        </p>
        {registerError && <Error className="mt-3">{registerError}</Error>}
      </div>
    </>
  ) : (
    <>
      <LoginForm
        submitting={loggingIn}
        onLoginSuccess={() => router.push("/tournaments")}
      />
      <div className="mt-3">
        <p className="mb-0 text-center">
          Don't have an account?{" "}
          <a
            role="button"
            className="text-primary"
            onClick={() => setRegistering(true)}
          >
            Sign Up
          </a>
        </p>
      </div>
      {loginError && <Error className="mt-3">{loginError}</Error>}
    </>
  );
  return (
    <Container className="LoginPage">
      <Row className="vh-100 d-flex justify-content-center align-items-center">
        <Col md={8} lg={6} xs={12}>
          <Card>
            <div className="mb-3 mt-md-4">
              <div className="mb-3">{formComponent}</div>
            </div>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginPage;
