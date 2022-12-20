import React from "react";
import { Row, Col, InputGroup } from "react-bootstrap";
import * as Yup from "yup";

import {
  Checkbox,
  Number,
  RepeatField,
  Select,
} from "@components/common/forms";
import Button from "@components/common/button";

const answerTypeOptions = [
  { label: "Base", value: "Base" },
  { label: "Power", value: "Power" },
  { label: "Neg", value: "Neg" },
];

const ScoringRulesFields = ({ className = "" }) => (
  <Row className={className}>
    <Col md={5} lg={5} sm={6} xs={12}>
      <Number name="bonusPointValue" label="Bonus Point Value" />
      <Number name="partsPerBonus" label="Parts Per Bonus" />
      <Number name="maxActivePlayersPerTeam" label="Max # of Players" />
      <Checkbox name="usesBouncebacks" label="Bouncebacks?" />
      <Checkbox name="allowTies" label="Allow Ties?" />
    </Col>
    <Col md={7} lg={7} sm={6} xs={12}>
      <h6>Tossup Point Values</h6>
      <RepeatField
        name="tossupValues"
        render={(_tv, { index, isLast }, { remove, push }) => {
          return (
            <div key={index}>
              <Row>
                <InputGroup size="sm">
                  <Number name={`tossupValues[${index}].value`} label="Value" />
                  <Select
                    name={`tossupValues[${index}].answerType`}
                    label="Type"
                    options={answerTypeOptions}
                  />
                  <Button
                    type="outline-primary"
                    className="mb-3"
                    icon="X"
                    onClick={() => remove(index)}
                  />
                </InputGroup>
              </Row>
              {isLast && (
                <Button
                  className="float-end"
                  size="sm"
                  icon="Plus"
                  type="outline-primary"
                  onClick={() => push()}
                />
              )}
            </div>
          );
        }}
      />
    </Col>
  </Row>
);

export const validation = () => ({
  bonusPointValue: Yup.number()
    .required("Please enter a bonus point value.")
    .integer("Please enter a whole number.")
    .positive("Bonus point value should be positive."),
  partsPerBonus: Yup.number()
    .required("Please enter parts per bonus.")
    .integer("Please enter a whole number.")
    .positive("Parts per bonus should be positive."),
  maxActivePlayersPerTeam: Yup.number()
    .required("Please enter max active players.")
    .integer("Please enter a whole number.")
    .positive("Max active players should be positive."),
  tossupValues: Yup.array().of(
    Yup.object().shape({
      value: Yup.number()
        .required("Please enter a value.")
        .integer("Please enter a whole number."),
      answerType: Yup.string().required("Please select an answer type."),
    })
  ),
});

export default ScoringRulesFields;
