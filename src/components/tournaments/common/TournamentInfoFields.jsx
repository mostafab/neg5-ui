import React from "react";

import { Text, Date } from "components/common/forms";

const TournamentInfoFields = () => (
  <>
    <Text name="name" label="Name" />
    <Date name="tournamentDate" label="Date" />
    <Text name="location" label="Location" />
    <Text name="questionSet" label="Question Set" />
  </>
);

export default TournamentInfoFields;
