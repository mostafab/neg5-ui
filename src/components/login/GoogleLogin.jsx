import React, { useState } from "react";
import { GoogleLogin as ExtGoogleLogin } from "@react-oauth/google";

import { attemptGoogleLogin } from "@api/login";
import { setLoginCookie } from "@libs/cookies";

import { Spinner } from "@components/common/icon";

const GoogleLogin = ({ onLoginSuccess }) => {
  const [loading, setLoading] = useState(false);
  const onSuccess = async (response) => {
    setLoading(true);
    const token = (await attemptGoogleLogin(response)).token;
    setLoginCookie(token);
    setLoading(false);
    onLoginSuccess();
  };
  return (
    <div>
      {loading && (
        <div className="text-center">
          <Spinner />
        </div>
      )}
      {!loading && (
        <ExtGoogleLogin
          theme="outline"
          shape="rectangular"
          onSuccess={onSuccess}
          onError={() => {
            console.error("Encountered error attempting to do Google login.");
          }}
        />
      )}
    </div>
  );
};

export default GoogleLogin;
