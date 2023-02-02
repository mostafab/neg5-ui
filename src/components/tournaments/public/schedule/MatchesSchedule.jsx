import React, { useState } from "react";
import { Row, Col } from "react-bootstrap";

import Card from "@components/common/cards";
import ScheduleFilters from "@components/scheduling/ScheduleFilters";
import ScheduledMatches from "@components/scheduling/ScheduledMatches";

const MatchesSchedule = ({ schedule, teams }) => {
  const [filters, setFilters] = useState(null);
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
        <Col lg={4} md={5} sm={12}>
          <ScheduleFilters
            teams={teams}
            matches={schedule.matches}
            onChange={setFilters}
          />
        </Col>
        <Col lg={8} md={7} sm={12}>
          <ScheduledMatches
            teams={teams}
            matches={schedule.matches}
            externalFilters={filters}
          />
        </Col>
      </Row>
    </Card>
  );
};

export default MatchesSchedule;
