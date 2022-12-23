import React from "react";
import ListGroup from "react-bootstrap/ListGroup";

import Card from "@components/common/cards";

const PoolCard = ({ pool, teams }) => (
  <Card
    title={
      <h6>
        <b>
          {pool.name} ({teams.length})
        </b>
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
