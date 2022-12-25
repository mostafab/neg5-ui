import React from "react";
import { Row, Col } from "react-bootstrap";

import Modal from "@components/common/modal";
import Button from "@components/common/button";

import MatchesAccordian from "./MatchesAccordian";
import MatchDisplay from "./MatchDisplay";

const MatchesModal = ({
  matches,
  teams,
  selectedMatch,
  onHide,
  onSelectMatch,
  rules,
  playersById,
  phases,
}) => (
  <Modal title="Matches" fullscreen onHide={onHide} className="MatchesModal">
    <Row>
      <Col lg={3} md={4} sm={0}>
        <div className="d-grid">
          <Button type="outline-primary mb-3" onClick={() => onSelectMatch({})}>
            Add New Match
          </Button>
        </div>
        <MatchesAccordian
          matches={matches}
          teams={teams}
          openMultiple={false}
          selectedMatch={selectedMatch}
          onSelectMatch={onSelectMatch}
          subtitleItems={false}
        />
      </Col>
      <Col lg={9} md={8} sm={12}>
        <MatchDisplay
          teams={teams}
          selectedMatch={selectedMatch}
          rules={rules}
          playersById={playersById}
          phases={phases}
        />
      </Col>
    </Row>
  </Modal>
);

export default MatchesModal;
