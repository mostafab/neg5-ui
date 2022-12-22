import React from "react";

import Card from "@components/common/cards";

const PoolCard = ({ pool }) => (
  <Card
    title={
      <h6>
        <b>{pool.name}</b>
      </h6>
    }
    shadow={false}
    className="mt-4"
  ></Card>
);

export default PoolCard;
