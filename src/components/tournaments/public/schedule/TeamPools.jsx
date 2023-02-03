/* eslint-disable react/no-unescaped-entities */
import React from "react";
import { Row, Col } from "react-bootstrap";

import Card from "@components/common/cards";

import PoolCard from "@components/tournaments/tournamentView/pools/PoolCard";

const TeamPools = ({ pools, poolTeams }) => {
  if (pools.length === 0) {
    return (
      <div className="d-flex justify-content-center p-4 border bg-white shadow-sm">
        The tournament director hasn't created pools for this phase yet.
      </div>
    );
  }
  return (
    <Card title="Pools">
      <Row>
        {pools.map((p) => (
          <Col key={p.id} lg={4} md={6} sm={12}>
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
    </Card>
  );
};

export default TeamPools;
