import React, { useEffect } from "react";

import { ToastContainer, toast } from "react-toastify";

const TournamentNotificationsListener = ({ tournamentId }) => {
  useEffect(() => {
    // Connect to socket here.
    setTimeout(() => {
      toast.info("Wow so easy!");
    }, 1000);
  }, []);
  return (
    <ToastContainer
      hideProgressBar
      autoClose={5000}
      pauseOnFocusLoss={false}
      theme="colored"
    />
  );
};

export default TournamentNotificationsListener;
