import React from "react";
import * as Yup from "yup";

import { useAppDispatch } from "store";
import { Form, Text, Date } from "components/common/forms";
import { createTournamentAsync } from "features/myTournaments/myTournamentsSlice";

const initialValues = {
  name: "",
  tournamentDate: "",
  location: "",
  questionSet: "",
};

const validation = Yup.object({
  name: Yup.string().required("Please enter a name."),
  tournamentDate: Yup.string().required("Please enter a date."),
});

const CreateTournamentForm = ({ submitting }) => {
  const dispatch = useAppDispatch();
  return (
    <Form
      name="CreateTournamentForm"
      initialValues={initialValues}
      validation={validation}
      submitButtonText="Create"
      onSubmit={(values) => dispatch(createTournamentAsync({ values }))}
      submitting={submitting}
    >
      <Text name="name" label="Name" />
      <Date name="tournamentDate" label="Date" />
      <Text name="location" label="Location" />
      <Text name="questionSet" label="Question Set" />
    </Form>
  );
};

export default CreateTournamentForm;
