import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";

import { groupTeamsByPools } from "@libs/teams";
import Card from "@components/common/cards";

import TeamPools from "./TeamPools";

const PoolsAndSchedules = ({ pools, teams, schedules, phases }) => {
  const [tab, setTab] = useState(phases.length === 0 ? null : phases[0].id);
  useEffect(() => {
    if (phases.length > 0) {
      setTab(phases[phases.length - 1].id);
    }
  }, [phases]);
  const poolTeams = groupTeamsByPools(teams);
  return (
    <Card title="Schedule">
      <Tabs transition={false} activeKey={tab} onSelect={setTab}>
        {phases.map((p) => (
          <Tab key={p.id} eventKey={p.id} title={p.name}>
            <TeamPools
              pools={pools.filter((pool) => pool.phaseId === p.id)}
              teams={teams}
              poolTeams={poolTeams}
            />
          </Tab>
        ))}
      </Tabs>
    </Card>
  );
};

const mapStateToProps = ({
  tournamentPhasesReducer,
  tournamentTeamsReducer,
}) => ({
  pools: tournamentPhasesReducer.pools,
  teams: tournamentTeamsReducer.teams,
  schedules: tournamentPhasesReducer.schedules,
  phases: tournamentPhasesReducer.phases,
});

export default connect(mapStateToProps, null)(PoolsAndSchedules);
