import React from "react";
import dayjs from "dayjs";

import { Spinner } from "@components/common/icon";
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
  onUndoNeg,
  playerOrderings,
  onMovePlayer,
  activePlayers,
  onToggleActive,
  onEndMatch,
  lastUpdatedAt,
  isPastCycle = false,
  saving = false,
}) => {
  const stageTitle = `${isPastCycle ? "Editing " : ""}${
    currentCycle.stage === CycleStage.Tossup ? "Tossup" : "Bonus"
  } ${currentCycle.number}`;
  const title = (
    <div className="d-flex justify-content-between">
      <div className={isPastCycle ? "text-warning" : ""}>{stageTitle}</div>
      {lastUpdatedAt && (
        <span className="small text-dark ms-2">
          {saving
            ? "Saving"
            : `Last saved at ${dayjs(lastUpdatedAt).format("hh:mm:ss A")}`}
          {saving && <Spinner className="ms-2" />}
        </span>
      )}
    </div>
  );
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
          onUndoNeg={onUndoNeg}
          playerOrderings={playerOrderings}
          onMovePlayer={onMovePlayer}
          activePlayers={activePlayers}
          onToggleActive={onToggleActive}
          onEndMatch={onEndMatch}
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
