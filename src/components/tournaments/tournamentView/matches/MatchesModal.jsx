import React from "react";
import { Row, Col } from "react-bootstrap";

import Modal from "@components/common/modal";

import MatchesAccordian from "./MatchesAccordian";

const MatchesModal = ({
  matches,
  teams,
  selectedMatchId,
  onHide,
  onSelectMatch,
}) => (
  <Modal title="Matches" size="xl" onHide={onHide}>
    <Row>
      <Col lg={3} md={4} sm={0}>
        <MatchesAccordian
          matches={matches}
          teams={teams}
          openMultiple={false}
          selectedMatchId={selectedMatchId}
          onSelectMatch={onSelectMatch}
        />
      </Col>
      <Col lg={9} md={8} sm={12}>
        {selectedMatchId}
      </Col>
    </Row>
  </Modal>
);

export default MatchesModal;
