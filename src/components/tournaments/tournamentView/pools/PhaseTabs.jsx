import React, { useState } from "react";
import { Row, Col } from "react-bootstrap";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";

import { Warning, Add } from "@components/common/icon";

import PoolForm from "./PoolForm";
import PhaseForm from "./PhaseForm";
import TeamPoolsEditor from "./TeamPoolsEditor";

const renderPhaseTabContent = (
  phaseId,
  pools,
  teamsNotAssignedPools,
  poolTeams
) => {
  const matching = pools.filter((p) => p.phaseId === phaseId);
  return (
    <>
      <Row>
        <Col lg={4} md={6} sm={12}>
          <PoolForm className="mt-4" phaseId={phaseId} pool={null} />
        </Col>
      </Row>
      <TeamPoolsEditor
        teamsNotAssignedPools={teamsNotAssignedPools[phaseId]}
        phaseId={phaseId}
        pools={matching}
        poolTeams={poolTeams}
      />
    </>
  );
};

const PhaseTabs = ({ phases, pools, teamsNotAssignedPools, poolTeams }) => {
  const [selectedTab, setSelectedTab] = useState(
    phases.length === 0 ? "new" : phases[0].id
  );
  return (
    <Tabs
      transition={false}
      activeKey={selectedTab}
      onSelect={(key) => setSelectedTab(key)}
    >
      {phases.map((p) => (
        <Tab
          key={p.id}
          eventKey={p.id}
          title={
            <>
              <span className="me-2">{p.name}</span>
              {(teamsNotAssignedPools[p.id] || []).length > 0 && (
                <Warning
                  className="float-end"
                  message="Some teams aren't assigned to a pool."
                />
              )}
            </>
          }
        >
          {renderPhaseTabContent(p.id, pools, teamsNotAssignedPools, poolTeams)}
        </Tab>
      ))}
      <Tab eventKey="new" key="new" title={<Add className="mb-1" />}>
        <Row className="mt-3 p-3">
          <Col lg={4} md={2} sm={12} />
          <Col lg={4} md={8} sm={12}>
            <PhaseForm
              phase={null}
              onSubmitSuccess={(phase) => setSelectedTab(phase.id)}
            />
          </Col>
          <Col lg={4} md={2} sm={12} />
        </Row>
      </Tab>
    </Tabs>
  );
};

export default PhaseTabs;
