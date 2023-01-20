import React from "react";
import { GoogleLogin as ExtGoogleLogin } from "@react-oauth/google";

import { attemptGoogleLogin } from "@api/login";

const GoogleLogin = ({ onLoginSuccess }) => {
  const onSuccess = async (response) => {
    const token = (await attemptGoogleLogin(response)).token;
  };
  return (
    <div>
      <ExtGoogleLogin
        text="Sign in with Googless"
        theme="outline"
        shape="rectangular"
        onSuccess={onSuccess}
        onError={() => {
          console.log("Uh oh.");
        }}
      />
    </div>
  );
};

export default GoogleLogin;
