import React from "react";

import Pill from "@components/common/pill";

const answerTypeToPillType = {
  Power: "success",
  Base: "info",
  Neg: "danger",
};

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
