import React from "react";
import { Row, Col } from "react-bootstrap";

import Modal from "@components/common/modal";

import MatchesAccordian from "./MatchesAccordian";
import MatchDisplay from "./MatchDisplay";

const MatchesModal = ({
  matches,
  teams,
  selectedMatchId,
  onHide,
  onSelectMatch,
  rules,
}) => (
  <Modal title="Matches" fullscreen onHide={onHide} className="MatchesModal">
    <Row>
      <Col lg={3} md={4} sm={0}>
        <MatchesAccordian
          matches={matches}
          teams={teams}
          openMultiple={false}
          selectedMatchId={selectedMatchId}
          onSelectMatch={onSelectMatch}
          subtitleItems={false}
        />
      </Col>
      <Col lg={9} md={8} sm={12}>
        <MatchDisplay
          teams={teams}
          selectedMatchId={selectedMatchId}
          matches={matches}
          rules={rules}
        />
      </Col>
    </Row>
  </Modal>
);

export default MatchesModal;
