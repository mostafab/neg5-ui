import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Tab, Tabs, Row, Col } from "react-bootstrap";

import { groupTeamsByPools } from "@libs/teams";
import Card from "@components/common/cards";

import TeamPools from "./TeamPools";
import MatchesSchedule from "./MatchesSchedule";

const PoolsAndSchedules = ({ pools, teams, schedules, phases }) => {
  const [tab, setTab] = useState(phases.length === 0 ? null : phases[0].id);
  useEffect(() => {
    if (phases.length > 0) {
      setTab(phases[phases.length - 1].id);
    }
  }, [phases]);
  const poolTeams = groupTeamsByPools(teams);
  return (
    <Tabs transition={false} activeKey={tab} onSelect={setTab}>
      {phases.map((p) => (
        <Tab key={p.id} eventKey={p.id} title={p.name}>
          <Row className="mt-3">
            <Col lg={4} md={6} sm={12} className="mb-3">
              <MatchesSchedule
                teams={teams}
                schedule={schedules.find((s) => s.tournamentPhaseId === p.id)}
                phase={p}
              />
            </Col>
            <Col lg={8} md={6} sm={12}>
              <TeamPools
                pools={pools.filter((pool) => pool.phaseId === p.id)}
                teams={teams}
                poolTeams={poolTeams}
              />
            </Col>
          </Row>
        </Tab>
      ))}
    </Tabs>
  );
};

const mapStateToProps = ({
  tournamentPhasesReducer,
  tournamentTeamsReducer,
  tournamentMatchesReducer,
}) => ({
  pools: tournamentPhasesReducer.pools,
  teams: tournamentTeamsReducer.teams,
  schedules: tournamentMatchesReducer.schedules,
  phases: tournamentPhasesReducer.phases,
});

export default connect(mapStateToProps, null)(PoolsAndSchedules);
