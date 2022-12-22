import React from "react";
import ListGroup from "react-bootstrap/ListGroup";

import Card from "@components/common/cards";
import { Warning } from "@components/common/icon";

const PoolCard = ({ pool, teams, isUnassigned = false }) => (
  <Card
    title={
      <h6>
        <b>
          {pool.name} ({teams.length})
        </b>
        {isUnassigned && teams.length > 0 && (
          <Warning
            className="float-end"
            message="Please place these teams into pools."
          />
        )}
      </h6>
    }
    shadow={false}
    className="mt-4"
  >
    <hr />
    <ListGroup>
      {teams.map((t) => (
        <ListGroup.Item
          onClick={() => console.log(`pool=${pool.id}, team=${t.id}`)}
          action
          key={t.id}
        >
          {t.name}
        </ListGroup.Item>
      ))}
    </ListGroup>
  </Card>
);

export default PoolCard;
