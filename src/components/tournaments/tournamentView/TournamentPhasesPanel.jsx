import React, { useState } from "react";

import { Expand } from "@components/common/icon";
import Card from "@components/common/cards";
import AssignTeamPoolsModal from "@components/tournaments/tournamentView/pools/AssignTeamPoolsModal";

const TournamentPhasesPanel = ({
  phases,
  pools,
  poolTeams,
  teamsNotAssignedPools,
}) => {
  const [showModal, setShowModal] = useState(false);
  if (!showModal) {
    return (
      <Card
        className="TournamentPhasesPanel"
        shadow
        title={
          <h5>
            Team Pools
            {
              <Expand
                className="float-end"
                onClick={() => setShowModal(true)}
              />
            }
          </h5>
        }
      ></Card>
    );
  }
  return (
    <AssignTeamPoolsModal
      phases={phases}
      pools={pools}
      poolTeams={poolTeams}
      teamsNotAssignedPools={teamsNotAssignedPools}
      onHide={() => setShowModal(false)}
    />
  );
};

export default TournamentPhasesPanel;
