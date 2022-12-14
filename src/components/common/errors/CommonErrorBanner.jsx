import React from "react";
import { Error } from "@components/common/alerts";

export const CommonErrorBanner = ({ errors = [], className = "" }) => {
  if (!errors || errors.length === 0) {
    return null;
  }
  const children =
    errors.length === 1 ? (
      errors[0]
    ) : (
      <>
        <p>There were errors submitting your request:</p>
        <ul>
          {errors.map((e, index) => (
            <li key={index}>{e}</li>
          ))}
        </ul>
      </>
    );

  return <Error className={className}>{children}</Error>;
};

export default CommonErrorBanner;
