import React from "react";
import { Row, Col } from "react-bootstrap";

import PoolCard from "@components/tournaments/tournamentView/pools/PoolCard";

const TeamPools = ({ pools, poolTeams, teams }) => {
  if (pools.length === 0) {
    return (
      <div className="d-flex justify-content-center p-4 border mt-3">
        No pools
      </div>
    );
  }
  return (
    <Row>
      {pools.map((p) => (
        <Col key={p.id} lg={3} md={6} sm={12}>
          <PoolCard
            key={p.id}
            pool={p}
            readOnly
            teams={poolTeams[p.id] || []}
            showCount={false}
          />
        </Col>
      ))}
    </Row>
  );
};

export default TeamPools;
