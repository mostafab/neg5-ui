import React, { useState, useContext, useEffect } from "react";

import { useAppDispatch } from "@store";
import { teamsPoolsUpdated } from "@features/tournamentView/teamsSlice";
import {
  poolsDeleted,
  poolCreated,
} from "@features/tournamentView/phasesSlice";
import { Events } from "@libs/liveEvents";

import { TournamentLiveChangesContext } from "@components/tournaments/common/context";
import { Expand } from "@components/common/icon";
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
      const phaseName = phases.find((p) => p.id === data.phaseId)?.name;
      toast("Pools updated", `${phaseName} team pools have changed.`);
    });
    liveUpdatesContext.subscribe(Events.pools.deleted, (data) => {
      dispatch(poolsDeleted(data));
    });
    liveUpdatesContext.subscribe(Events.pools.added, (data) => {
      dispatch(poolCreated(data));
    });
    return () => {
      liveUpdatesContext.unsubscribe(Events.teams.poolsUpdated);
      liveUpdatesContext.unsubscribe(Events.pools.deleted);
      liveUpdatesContext.unsubscribe(Events.pools.added);
    };
  }, [liveUpdatesContext]);
  return (
    <>
      <Card
        className="TournamentPhasesPanel"
        shadow
        title="Team Pools"
        actions={[
          {
            component: <Expand onClick={() => setShowModal(true)} />,
          },
        ]}
      />
      {showModal && (
        <PoolsModal
          phases={phases}
          pools={pools}
          poolTeams={poolTeams}
          teamsNotAssignedPools={teamsNotAssignedPools}
          onHide={() => setShowModal(false)}
          editable={editable}
        />
      )}
    </>
  );
};

export default TournamentPhasesPanel;
