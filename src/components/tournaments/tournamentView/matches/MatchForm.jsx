import React from "react";
import { Row, Col } from "react-bootstrap";
import * as Yup from "yup";

import { Form, Number, Text, ResetListener } from "@components/common/forms";

const initialValues = (match) => ({
  round: match.round,
  tossupsHeard: match.tossupsHeard,
  room: match.room,
  moderator: match.moderator,
  packet: match.packet,
  serialId: match.serialId,
  notes: match.notes,
});

const validation = Yup.object({
  round: Yup.number().required().positive(),
  tossupsHeard: Yup.number().required().positive(),
  room: Yup.string(),
  packet: Yup.string(),
  serialId: Yup.string(),
  notes: Yup.string(),
});

const MatchForm = ({ match }) => {
  return (
    <Form
      name="MatchForm"
      initialValues={initialValues(match)}
      submitButtonText="Save"
      validation={validation}
    >
      <ResetListener
        changeKey={match.id}
        initialValues={() => initialValues(match)}
      />
      <Row>
        <Col lg={3} md={6}>
          <Number name="round" label="Round" />
          <Number name="tossupsHeard" label="Tossups Heard" />
          <Text name="room" label="Room" />
        </Col>
        <Col lg={3} md={6}>
          <Text name="moderator" label="Moderator" />
          <Text name="packet" label="Packet" />
          <Text name="serialId" label="Serial Id" />
        </Col>
        <Col lg={6} md={12}>
          <Text textarea name="notes" label="Notes" />
        </Col>
      </Row>
    </Form>
  );
};

export default MatchForm;
