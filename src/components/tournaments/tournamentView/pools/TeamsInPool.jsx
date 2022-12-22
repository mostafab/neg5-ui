import React from "react";

import Card from "@components/common/cards";

const PoolCard = ({ pool, teams }) => (
  <Card
    title={
      <h6>
        <b>{pool.name}</b>
      </h6>
    }
    shadow={false}
    className="mt-4"
  >
    {teams.map((t) => (
      <p key={t.id}>{t.name}</p>
    ))}
  </Card>
);

export default PoolCard;
