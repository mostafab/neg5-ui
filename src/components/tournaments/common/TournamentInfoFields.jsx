import React from "react";
import { Row, Col } from "react-bootstrap";
import * as Yup from "yup";

import { Text, Date } from "@components/common/forms";
import StateSelect from "@components/common/StateSelect";

const TournamentInfoFields = () => (
  <>
    <Text name="name" label="Name" />
    <Date name="tournamentDate" label="Date" />
    <Row>
      <Col>
        <Text name="location" label="Location" />
      </Col>
      <Col>
        <StateSelect name="state" />
      </Col>
    </Row>
    <Text name="questionSet" label="Question Set" />
  </>
);

export const validation = () => ({
  name: Yup.string().required("Please enter a name."),
  tournamentDate: Yup.string().required("Please enter a date."),
});

export default TournamentInfoFields;
