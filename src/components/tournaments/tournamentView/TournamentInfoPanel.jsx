import React, { useState, useEffect, useContext } from "react";
import dayjs from "dayjs";

import config from "config";

import { useAppDispatch } from "@store";
import { informationUpdated } from "@features/tournamentView/tournamentInfoSlice";
import { Events } from "@libs/liveEvents";

import Card from "@components/common/cards";
import { Edit } from "@components/common/icon";
import Pill from "@components/common/pill";

import { TournamentLiveChangesContext } from "@components/tournaments/common/context";
import TournamentInfoModal from "@components/tournaments/info/TournamentInfoModal";
import { labelWithValue } from "./utilities";

const TournamentInfoPanel = ({ tournamentInfo, editable }) => {
  const [showModal, setShowModal] = useState(false);
  const liveUpdatesContext = useContext(TournamentLiveChangesContext);
  const dispatch = useAppDispatch();
  useEffect(() => {
    document.title = tournamentInfo?.name
      ? `${tournamentInfo?.name} | Neg 5`
      : "Neg 5";
  }, [tournamentInfo?.name]);
  useEffect(() => {
    liveUpdatesContext.subscribe(Events.tournamentInfo.updated, (data) => {
      dispatch(informationUpdated(data));
    });

    return () => {
      liveUpdatesContext.unsubscribe(Events.tournamentInfo.updated);
    };
  }, [liveUpdatesContext]);
  const dateValue = tournamentInfo.tournamentDate
    ? dayjs(tournamentInfo.tournamentDate).format("MMMM D, YYYY")
    : null;
  return (
    <>
      <Card
        title={<h4>{tournamentInfo.name}</h4>}
        actions={
          editable
            ? [
                {
                  component: <Edit onClick={() => setShowModal(true)} />,
                },
              ]
            : []
        }
      >
        <div className="mb-2">
          <a
            target="_blank"
            rel="noopener noreferrer"
            className="me-2"
            href={`${config.statsBaseUrl}/t/${tournamentInfo.id}`}
          >
            Stats
          </a>
          <a
            href={`/neg5-api/tournaments/${tournamentInfo.id}/qbj`}
            target="_blank"
            rel="noopener noreferrer"
          >
            QBJ
          </a>
        </div>
        {tournamentInfo.hidden && (
          <Pill className="mb-2" type="secondary">
            Private
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
