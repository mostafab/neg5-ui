import React from "react";

import Card from "@components/common/cards";

const NoMatches = ({ team }) => (
  <Card shadow={false} className="p-3">
    <div style={{ textAlign: "center" }}>
      <p>
        {`${team.name} hasn't played in any matches yet, but they'll show up here
        as they're entered.`}
      </p>
    </div>
  </Card>
);

export default NoMatches;
