import React from "react";

import Card from "@components/common/cards";
import Modal from "@components/common/modal";
import { Info } from "@components/common/alerts";

import PhaseTabs from "./PhaseTabs";

const PoolsModal = ({
  phases,
  pools,
  poolTeams,
  teamsNotAssignedPools,
  onHide,
}) => {
  return (
    <Modal
      className="TournamentPhasesModal"
      onHide={onHide}
      title="Team Pools"
      fullscreen
    >
      <Card className="TournamentPhasesPanel mt-3" shadow>
        <Info>
          Pools are split by the different phases of your tournament (Pool Play,
          Playoffs, etc.). You can assign teams to pools in each respective
          phase below, and then generate a schedule for each pool in the Matches
          panel.
        </Info>
        <PhaseTabs
          phases={phases}
          teamsNotAssignedPools={teamsNotAssignedPools}
          pools={pools}
          poolTeams={poolTeams}
        />
      </Card>
    </Modal>
  );
};

export default PoolsModal;
