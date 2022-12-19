import React from "react";

import Modal from "@components/common/modal";
import CreateTournamentForm from "./CreateTournamentForm";

const CreateTournamentDialog = ({ onClose, submitting }) => {
  return (
    <Modal title="Add a Tournament" onHide={onClose}>
      <CreateTournamentForm submitting={submitting} />
    </Modal>
  );
};

export default CreateTournamentDialog;
