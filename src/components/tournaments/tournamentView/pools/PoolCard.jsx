import React from "react";

import Card from "@components/common/cards";

const PoolCard = ({ pool }) => (
  <Card titleAs="h6" title={pool.name} shadow={false} className="mt-4"></Card>
);

export default PoolCard;
