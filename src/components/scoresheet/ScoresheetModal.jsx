import React, { useState } from "react";
import { Row, Col } from "react-bootstrap";

import Modal from "@components/common/modal";
import Card from "@components/common/cards";
import ScoresheetStartForm from "./ScoresheetStartForm";

const ScoresheetModal = ({ onHide, teams, rules, phases }) => {
  const [scoresheetMetadata, setScoresheetMetadata] = useState(null);
  return (
    <Modal fullscreen title="Scoresheet" onHide={onHide}>
      {
        !scoresheetMetadata && (
          <Row>
            <Col lg={4} md={3} />
            <Col lg={4} md={6}>
              <Card title="Fill out a few fields to get started." className="mt-lg-5 mt-md-5">
                <ScoresheetStartForm
                  teams={teams}
                  phases={phases}
                  onSubmit={(values) => setScoresheetMetadata(values)}
                />
              </Card>
            </Col>
            <Col lg={4} md={3} />
          </Row>
        )
      }
    </Modal>
  );
};

export default ScoresheetModal;
