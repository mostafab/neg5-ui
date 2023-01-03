import React from "react";
import InputGroup from "react-bootstrap/InputGroup";

import { Form, Text } from "@components/common/forms";
import Button from "@components/common/button";

const PhaseForm = ({ phase }) => {
  return (
    <Form name="PhaseForm" customCtaButtons>
      <InputGroup>
        <Text name="name" label="Add a Phase" />
        <Button submit type="primary" className="mb-3">
          Save
        </Button>
      </InputGroup>
    </Form>
  );
};

export default PhaseForm;
