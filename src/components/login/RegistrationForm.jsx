import React from "react";
import * as Yup from "yup";

import { useAppDispatch } from "@store";
import { registerAsync } from "@features/login/loginSlice";
import { Form, Text, Password } from "@components/common/forms";

const validation = Yup.object({
  email: Yup.string().email().required("Enter your email."),
  username: Yup.string().required("Enter a username."),
  password: Yup.string().required("Enter a password."),
  confirmPassword: Yup.string()
    .required("Confirm your password.")
    .oneOf([Yup.ref("password")], "Passwords must match."),
});

const initialValues = {
  email: "",
  name: "",
  username: "",
  password: "",
  confirmPassword: "",
};

const RegistrationForm = ({ submitting = false, onRegisterSuccess = null }) => {
  const dispatch = useAppDispatch();
  return (
    <Form
      name="RegistrationForm"
      initialValues={initialValues}
      onSubmit={(values) =>
        dispatch(registerAsync({ ...values, onRegisterSuccess }))
      }
      validation={validation}
      submitting={submitting}
    >
      <Text name="email" label="Email address" />
      <Text name="name" label="Name" />
      <Text name="username" label="Username" />
      <Password name="password" label="Password" />
      <Password name="confirmPassword" label="Enter your password again" />
    </Form>
  );
};

export default RegistrationForm;
