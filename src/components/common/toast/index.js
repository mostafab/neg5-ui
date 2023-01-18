import React from "react";
import {
  ToastContainer as ToastifyContainer,
  toast as toastify,
} from "react-toastify";

export const ToastContainer = () => (
  <ToastifyContainer theme="colored" hideProgressBar draggable={false} />
);

const toast = (title, message, opts = { type: "info" }) => {
  const content = (
    <>
      <div className="small">{title}</div>
      <div className="small">{message}</div>
    </>
  );
  toastify(content, { autoClose: 5000, ...opts });
};

export default toast;
