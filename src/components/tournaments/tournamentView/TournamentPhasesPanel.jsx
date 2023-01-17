import React, { useState } from "react";

import { Edit } from "@components/common/icon";
import Card from "@components/common/cards";
import PoolsModal from "@components/tournaments/tournamentView/pools/PoolsModal";

const TournamentPhasesPanel = ({
  phases,
  pools,
  poolTeams,
  teamsNotAssignedPools,
  editable,
}) => {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <Card
        className="TournamentPhasesPanel"
        shadow
        title="Team Pools"
        actions={
          editable
            ? [
                {
                  component: <Edit onClick={() => setShowModal(true)} />,
                },
              ]
            : []
        }
      />
      {showModal && (
        <PoolsModal
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
