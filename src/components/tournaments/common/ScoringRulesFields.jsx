import React from "react";
import { Row, Col, InputGroup } from "react-bootstrap";

import { Checkbox, Number, RepeatField, Select } from "components/common/forms";

const answerTypeOptions = [
  { label: "Base", value: "Base" },
  { label: "Power", value: "Power" },
  { label: "Neg", value: "Neg" },
];

const ScoringRulesFields = () => (
  <Row>
    <Col md={5} lg={6} sm={6} xs={12}>
      <Number name="bonusPointValue" label="Bonus Point Value" />
      <Number name="partsPerBonus" label="Parts Per Bonus" />
      <Number name="maxActivePlayersPerTeam" label="Max # of Players" />
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
                <Number name={`tossupValues[${idx}].value`} label="Value" />
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
);

export default ScoringRulesFields;
