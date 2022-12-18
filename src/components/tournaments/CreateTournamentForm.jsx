import React from "react";
import * as Yup from "yup";

import { Form, Text } from "components/common/forms";

const initialValues = {
  name: "",
  location: "",
  questionSet: "",
};

const validation = Yup.object({
  name: Yup.string().required("Please enter a name."),
});

const CreateTournamentForm = () => (
  <div className="CreateTournamentForm">
    <Form
      name="CreateTournamentForm"
      initialValues={initialValues}
      validation={validation}
      submitButtonText="Create"
    >
      <Text name="name" label="Name" />
      <Text name="location" label="Location" />
      <Text name="questionSet" label="Question Set" />
    </Form>
  </div>
);

export default CreateTournamentForm;
