import React from "react";
import { Row, Col } from "react-bootstrap";

import Modal from "@components/common/modal";
import Card from "@components/common/cards";
import ScoresheetStartForm from "./ScoresheetStartForm";

const ScoresheetModal = ({ onHide, teams, rules, phases }) => {
  return (
    <Modal fullscreen title="Scoresheet" onHide={onHide}>
      <Row>
        <Col lg={4} md={3} />
        <Col lg={4} md={6}>
          <Card>
            <ScoresheetStartForm
              teams={teams}
              phases={phases}
              onSubmit={(values) => console.log(values)}
            />
          </Card>
        </Col>
        <Col lg={4} md={3} />
      </Row>
    </Modal>
  );
};

export default ScoresheetModal;
