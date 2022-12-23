import React, { useState } from "react";

import Icon from "@components/common/icon";
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
            View/Assign Team Pools
            {
              <Icon
                className="float-end"
                name="ArrowsAngleExpand"
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
