import React from "react";

import Pill from "@components/common/pill";
import { answerTypeToPillType } from "@libs/tournamentForms";

const TossupValuePill = ({ answerType, value, onClick = null }) => (
  <Pill
    className={`TossupValuePill ${answerType}`}
    type={answerTypeToPillType[answerType]}
    onClick={onClick}
  >
    {value}
  </Pill>
);

export default TossupValuePill;
