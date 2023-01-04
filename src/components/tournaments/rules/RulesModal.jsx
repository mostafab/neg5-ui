import React from "react";

import Modal from "@components/common/modal";

import RulesForm from "./RulesForm";

const RulesModal = ({ onHide, rules }) => (
  <Modal title="Update Rules" onHide={onHide} size="md">
    <RulesForm rules={rules} onSubmitSuccess={onHide} />
  </Modal>
);

export default RulesModal;
