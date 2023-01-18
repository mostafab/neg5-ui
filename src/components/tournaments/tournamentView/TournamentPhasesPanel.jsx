import React, { useState, useContext, useEffect } from "react";

import { useAppDispatch } from "@store";
import { teamsPoolsUpdated } from "@features/tournamentView/teamsSlice";
import { poolsDeleted } from "@features/tournamentView/phasesSlice";
import { Events } from "@libs/liveEvents";

import { TournamentLiveChangesContext } from "@components/tournaments/common/context";
import { Edit } from "@components/common/icon";
import Card from "@components/common/cards";
import toast from "@components/common/toast";
import PoolsModal from "@components/tournaments/tournamentView/pools/PoolsModal";

const TournamentPhasesPanel = ({
  phases,
  pools,
  poolTeams,
  teamsNotAssignedPools,
  editable,
}) => {
  const [showModal, setShowModal] = useState(false);
  const liveUpdatesContext = useContext(TournamentLiveChangesContext);
  const dispatch = useAppDispatch();
  useEffect(() => {
    liveUpdatesContext.subscribe(Events.teams.poolsUpdated, (data) => {
      dispatch(teamsPoolsUpdated(data));
      toast("Pools updated", "Team pools have changed.");
    });
    liveUpdatesContext.subscribe(Events.pools.deleted, (data) => {
      dispatch(poolsDeleted(data));
    });

    return () => {
      liveUpdatesContext.unsubscribe(Events.teams.poolsUpdated);
      liveUpdatesContext.unsubscribe(Events.pools.deleted);
    };
  }, [liveUpdatesContext]);
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
