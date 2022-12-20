import { mapValues } from "lodash";

export const sanitizeFormValues = (values) =>
  mapValues(values, (v) => {
    if (typeof v === "boolean") {
      return v;
    }
    if (v === "" || (typeof v === "string" && v.trim() === "")) {
      return null;
    }
    if (typeof v === "string") {
      return v.trim();
    }
    return v;
  });
