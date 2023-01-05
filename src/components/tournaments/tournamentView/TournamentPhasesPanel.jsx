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
  return (
    <>
      <Card
        className="TournamentPhasesPanel"
        shadow
        title="Phases & Team Pools"
        actions={[
          {
            component: <Expand onClick={() => setShowModal(true)} />,
          },
        ]}
      />
      {showModal && (
        <AssignTeamPoolsModal
          phases={phases}
          pools={pools}
          poolTeams={poolTeams}
          teamsNotAssignedPools={teamsNotAssignedPools}
          onHide={() => setShowModal(false)}
        />
      )}
    </>
  );
};

export default TournamentPhasesPanel;
