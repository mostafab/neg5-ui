import React from "react";
import { Row, Col } from "react-bootstrap";
import * as Yup from "yup";

import { Form, Text, Number, Select } from "@components/common/forms";
import { getTeamOptions, getPhaseOptions } from "@libs/tournamentForms";

const initialValues = (phases) => ({
  round: "",
  team1Id: "",
  team2Id: "",
  moderator: "",
  room: "",
  packet: "",
  phases: phases.length === 1 ? [phases[0].id] : [],
});

const validation = Yup.object({
  round: Yup.number()
    .required("Enter a round.")
    .positive("Enter a positive number."),
  team1Id: Yup.string().required("Choose a team."),
  team2Id: Yup.string().required("Choose a team."),
  room: Yup.string(),
  moderator: Yup.string(),
  packet: Yup.string(),
  phases: Yup.array().required().min(1, "Choose at least one phase."),
});

const ScoresheetStartForm = ({ teams, phases, onSubmit }) => (
  <Form
    name="ScoresheetStartForm"
    onSubmit={onSubmit}
    submitButtonText="Start"
    initialValues={initialValues(phases)}
    validation={validation}
  >
    <Row>
      <Col lg={12} md={12} sm={12}>
        <Select
          name="team1Id"
          label="Select Team 1"
          options={getTeamOptions(teams)}
        />
        <Select
          name="team2Id"
          label="Select Team 2"
          options={getTeamOptions(teams)}
        />
        <Row>
          <Col lg={12} md={12}>
            <Select
              multiple
              name="phases"
              label="Phases"
              options={getPhaseOptions(phases)}
            />
          </Col>
          <Col lg={6} md={6}>
            <Number name="round" label="Round" />
          </Col>
          <Col lg={6} md={6}>
            <Text name="moderator" label="Moderator" />
          </Col>
          <Col lg={6} md={6}>
            <Text name="room" label="Room" />
          </Col>
          <Col lg={6} md={6}>
            <Text name="packet" label="Packet" />
          </Col>
        </Row>
      </Col>
    </Row>
  </Form>
);

export default ScoresheetStartForm;
