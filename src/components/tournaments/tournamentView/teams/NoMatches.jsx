import React from "react";

import Card from "@components/common/cards";

const NoMatches = ({ team }) => (
  <Card shadow={false} className="p-2">
    <div className="d-flex justify-content-center">
      {team.name} hasn't played in any matches yet. They'll show up here as
      they're entered.
    </div>
  </Card>
);

export default NoMatches;
