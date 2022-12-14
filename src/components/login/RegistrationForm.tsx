import React from "react";
import * as Yup from "yup";

import { Form, Text, Password } from "components/common/forms";

const validation = Yup.object({
  email: Yup.string().email().required("Required"),
  username: Yup.string().required(),
  password: Yup.string().required(),
  confirmPassword: Yup.string().required(),
});

const initialValues = {
  email: "",
  name: "",
  username: "",
  password: "",
  confirmPassword: "",
};

const RegistrationForm = () => (
  <Form
    name="RegistrationForm"
    initialValues={initialValues}
    onSubmit={(values) => console.log(values)}
    validation={validation}
  >
    <Text name="email" label="Email address" />
    <Text name="name" label="Name" />
    <Text name="username" label="Username" />
    <Password name="password" label="Password" />
    <Password name="confirmPassword" label="Enter your password again" />
  </Form>
);

export default RegistrationForm;
