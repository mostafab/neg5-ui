import React from "react";
import {
  ToastContainer as ToastifyContainer,
  toast as toastify,
} from "react-toastify";

export const ToastContainer = () => (
  <ToastifyContainer theme="colored" hideProgressBar draggable={false} />
);

const toast = (message, opts) => {
  toastify(message, { autoClose: 5000, ...opts });
};

export default toast;
