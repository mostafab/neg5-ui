/* eslint-disable react/no-unescaped-entities */
import React from "react";

import Modal from "@components/common/modal";
import { Info } from "@components/common/alerts";

import RulesForm from "./RulesForm";

const RulesModal = ({ onHide, rules }) => (
  <Modal title="Update Rules" onHide={onHide} size="md">
    <Info>
      Rules can't be changed once a match is added, so double-check this
      information is correct!
    </Info>
    <RulesForm rules={rules} onSubmitSuccess={onHide} readOnly={false} />
  </Modal>
);

export default RulesModal;
