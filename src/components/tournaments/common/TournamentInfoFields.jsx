import React from "react";
import * as Yup from "yup";

import { Text, Date } from "@components/common/forms";

const TournamentInfoFields = () => (
  <>
    <Text name="name" label="Name" />
    <Date name="tournamentDate" label="Date" />
    <Text name="location" label="Location" />
    <Text name="questionSet" label="Question Set" />
  </>
);

export const validation = () => ({
  name: Yup.string().required("Please enter a name."),
  tournamentDate: Yup.string().required("Please enter a date."),
});

export default TournamentInfoFields;
