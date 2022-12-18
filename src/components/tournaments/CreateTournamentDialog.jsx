import React from "react";

import Modal from "components/common/modal";
import CreateTournamentForm from "./CreateTournamentForm";

const CreateTournamentDialog = ({ onClose }) => {
  return (
    <Modal title="Add a Tournament" onHide={onClose}>
      <CreateTournamentForm />
    </Modal>
  );
};

export default CreateTournamentDialog;
