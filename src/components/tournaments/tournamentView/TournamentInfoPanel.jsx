import React, { useState, useEffect } from "react";
import dayjs from "dayjs";

import Card from "@components/common/cards";
import { Edit } from "@components/common/icon";
import Pill from "@components/common/pill";

import TournamentInfoModal from "@components/tournaments/info/TournamentInfoModal";
import { labelWithValue } from "./utilities";

const TournamentInfoPanel = ({ tournamentInfo }) => {
  const [showModal, setShowModal] = useState(false);
  useEffect(() => {
    document.title = tournamentInfo?.name
      ? `${tournamentInfo?.name} | Neg 5`
      : "Neg 5";
  }, [tournamentInfo?.name]);
  const dateValue = tournamentInfo.tournamentDate
    ? dayjs(tournamentInfo.tournamentDate).format("MMMM D, YYYY")
    : null;
  return (
    <>
      <Card
        title={<h4>{tournamentInfo.name}</h4>}
        actions={[
          {
            component: <Edit onClick={() => setShowModal(true)} />,
          },
        ]}
      >
        {tournamentInfo.hidden && (
          <Pill className="mb-2" type="secondary">
            Hidden
          </Pill>
        )}
        {labelWithValue("Owner", tournamentInfo.directorId)}
        {labelWithValue("Date", dateValue)}
        {labelWithValue("Location", tournamentInfo.location)}
        {labelWithValue("Question Set", tournamentInfo.questionSet)}
      </Card>
      {showModal && (
        <TournamentInfoModal
          tournamentInfo={tournamentInfo}
          onHide={() => setShowModal(false)}
        />
      )}
    </>
  );
};

export default TournamentInfoPanel;
