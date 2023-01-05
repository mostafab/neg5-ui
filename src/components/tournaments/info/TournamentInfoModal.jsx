import React from "react";

import Modal from "@components/common/modal";

import TournamentInfoForm from "./TournamentInfoForm";

const TournamentInfoModal = ({ tournamentInfo, onHide }) => (
  <Modal title={"Basic Information"} onHide={onHide} size="md">
    <TournamentInfoForm
      tournamentInfo={tournamentInfo}
      onSubmitSuccess={onHide}
    />
  </Modal>
);

export default TournamentInfoModal;
