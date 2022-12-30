import React from "react";

import Card from "@components/common/cards";
import { CycleStage } from "@libs/enums";

import TossupPanel from "./TossupPanel";
import BonusPanel from "./BonusPanel";

const CurrentCyclePanel = ({
  teams,
  currentCycle,
  rules,
  onClickAnswer,
  onBack,
  onBonus,
  onNextTossup,
  onNoAnswer,
}) => {
  const title = `${
    currentCycle.stage === CycleStage.Tossup ? "Tossup" : "Bonus"
  } ${currentCycle.number}`;
  return (
    <Card title={title}>
      {currentCycle.stage === CycleStage.Tossup && (
        <TossupPanel
          teams={teams}
          rules={rules}
          onBack={onBack}
          onClickAnswer={onClickAnswer}
          currentCycle={currentCycle}
          onNoAnswer={onNoAnswer}
        />
      )}
      {currentCycle.stage === CycleStage.Bonus && (
        <BonusPanel
          rules={rules}
          teams={teams}
          onBack={onBack}
          currentCycle={currentCycle}
          onBonus={onBonus}
          onNextTossup={onNextTossup}
        />
      )}
    </Card>
  );
};

export default CurrentCyclePanel;
