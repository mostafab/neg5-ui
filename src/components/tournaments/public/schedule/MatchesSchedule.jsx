import React from "react";
import { Row, Col } from "react-bootstrap";

import Card from "@components/common/cards";
import ScheduledMatches from "@components/scheduling/ScheduledMatches";

const MatchesSchedule = ({ schedule, teams }) => {
  if (!schedule) {
    return (
      <div className="p-4 d-flex justify-content-center">
        No schedule has been created yet.
      </div>
    );
  }
  return (
    <Card title="Schedule" shadow={false}>
      <Row>
        <Col lg={12} md={12} sm={12}>
          <ScheduledMatches
            teams={teams}
            matches={schedule.matches}
            filterable
          />
        </Col>
      </Row>
    </Card>
  );
};

export default MatchesSchedule;
