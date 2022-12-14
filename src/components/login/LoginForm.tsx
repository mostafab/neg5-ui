import React from "react";
import * as Yup from "yup";

import { Image } from "react-bootstrap";
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

const LoginForm = () => (
  <>
    <div className={`mb-3 ${styles.imageContainer}`}>
      <Image width="40%" fluid src="/static/logo.png" />
    </div>
    <Form
      name="LoginForm"
      initialValues={initialValues}
      onSubmit={(values) => console.log(values)}
      validation={validation}
      submitButtonText="Login"
    >
      <Text name="emailOrUsername" label="Email address / Username" />
      <Password name="password" label="Password" />
    </Form>
  </>
);

export default LoginForm;
