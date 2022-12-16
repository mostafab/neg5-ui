import React from "react";
import * as Yup from "yup";
import { Image } from "react-bootstrap";

import { useAppDispatch } from "store";
import { loginAsync } from "features/login/loginSlice";
import { Form, Text, Password } from "components/common/forms";
import styles from "./LoginPage.module.css";

const validation = Yup.object({
  emailOrUsername: Yup.string().required(
    "Please enter your username or email address."
  ),
  password: Yup.string().required("Please enter your password."),
});

const initialValues = {
  emailOrUsername: "",
  password: "",
};

const LoginForm = ({ onLoginSuccess, submitting = false }) => {
  const dispatch = useAppDispatch();
  return (
    <>
      <div className={`mb-3 ${styles.imageContainer}`}>
        <Image width="40%" fluid src="/static/logo.png" />
      </div>
      <Form
        name="LoginForm"
        initialValues={initialValues}
        onSubmit={(values) => {
          dispatch(loginAsync(values));
        }}
        validation={validation}
        submitButtonText="Login"
        submitting={submitting}
      >
        <Text name="emailOrUsername" label="Email address / Username" />
        <Password name="password" label="Password" />
      </Form>
    </>
  );
};

export default LoginForm;
