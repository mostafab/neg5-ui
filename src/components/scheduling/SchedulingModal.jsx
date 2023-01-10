import React, { useState } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";

import Modal from "@components/common/modal";
import Card from "@components/common/cards";

import PhaseScheduleEditor from "./PhaseScheduleEditor";

const SchedulingModal = ({ teams, phases, onHide }) => {
  const [activeTab, setActiveTab] = useState(
    phases.length === 0 ? "" : phases[0].id
  );
  return (
    <Modal title="Scheduling" onHide={onHide} size="xl">
      <Card>
        <Tabs transition={false} activeKey={activeTab} onSelect={setActiveTab}>
          {phases.map((phase) => (
            <Tab key={phase.id} eventKey={phase.id} title={phase.name}>
              <PhaseScheduleEditor
                phase={phase}
                teams={teams}
                schedule={null}
              />
            </Tab>
          ))}
        </Tabs>
      </Card>
    </Modal>
  );
};

export default SchedulingModal;
