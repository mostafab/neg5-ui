import React, { useState } from "react";
import { Row, Col, InputGroup } from "react-bootstrap";
import * as Yup from "yup";

import { useAppDispatch } from "store";
import {
  Form,
  Text,
  Date,
  Checkbox,
  Number,
  RepeatField,
  Select,
} from "components/common/forms";
import Button from "components/common/button";
import { createTournamentAsync } from "features/myTournaments/myTournamentsSlice";

const initialValues = {
  name: "",
  tournamentDate: "",
  location: "",
  questionSet: "",
  bonusPointValue: 10,
  partsPerBonus: 3,
  maxActivePlayersPerTeam: 4,
  usesBouncebacks: false,
  allowTies: false,
  tossupValues: [
    {
      value: 15,
      answerType: "Power",
    },
    {
      value: 10,
      answerType: "Base",
    },
    {
      value: -5,
      answerType: "Neg",
    },
  ],
};

const validation = Yup.object({
  name: Yup.string().required("Please enter a name."),
  tournamentDate: Yup.string().required("Please enter a date."),
  bonusPointValue: Yup.number()
    .required("Please enter a bonus point value.")
    .positive("Bonus point value should be positive."),
  partsPerBonus: Yup.number()
    .required("Please enter parts per bonus")
    .positive("Parts per bonus should be positive."),
  maxActivePlayersPerTeam: Yup.number()
    .required("Please enter max active players.")
    .positive("Max active players should be positive."),
});

const answerTypeOptions = [
  { label: "Base", value: "Base" },
  { label: "Power", value: "Power" },
  { label: "Neg", value: "Neg" },
];

const CreateTournamentForm = ({ submitting }) => {
  const dispatch = useAppDispatch();
  const [stage, setStage] = useState("required");

  const renderCurrentStage = () => {
    switch (stage) {
      case "required":
        return (
          <>
            <Text name="name" label="Name" />
            <Date name="tournamentDate" label="Date" />
            <Text name="location" label="Location" />
            <Text name="questionSet" label="Question Set" />
            <div className="d-flex justify-content-center mb-3">
              <Button onClick={() => setStage("rules")} type="link">
                Set Custom Rules
              </Button>
            </div>
          </>
        );
      case "rules":
        return (
          <>
            <Row>
              <Col md={5} lg={6} sm={6} xs={12}>
                <Number name="bonusPointValue" label="Bonus Point Value" />
                <Number name="partsPerBonus" label="Parts Per Bonus" />
                <Number
                  name="maxActivePlayersPerTeam"
                  label="Max # of Players"
                />
                <Checkbox name="usesBouncebacks" label="Bouncebacks?" />
                <Checkbox name="allowTies" label="Allow Ties?" />
              </Col>
              <Col md={7} lg={6} sm={6} xs={12}>
                <h6>Tossup Point Values</h6>
                <RepeatField
                  name="tossupValues"
                  render={(_tv, idx) => {
                    return (
                      <Row key={idx}>
                        <InputGroup>
                          <Number
                            name={`tossupValues[${idx}].value`}
                            label="Value"
                          />
                          <Select
                            name={`tossupValues[${idx}].answerType`}
                            label="Type"
                            options={answerTypeOptions}
                          />
                        </InputGroup>
                      </Row>
                    );
                  }}
                />
              </Col>
            </Row>
            <div className="d-flex justify-content-center mb-3">
              <Button onClick={() => setStage("required")} type="link">
                Back
              </Button>
            </div>
          </>
        );
      default:
        break;
    }
  };
  return (
    <Form
      name="CreateTournamentForm"
      initialValues={initialValues}
      validation={validation}
      submitButtonText="Create"
      onSubmit={(values) => {
        console.log(values);
        dispatch(createTournamentAsync({ values }));
      }}
      submitting={submitting}
    >
      {renderCurrentStage()}
    </Form>
  );
};

export default CreateTournamentForm;
