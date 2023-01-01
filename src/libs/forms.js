import mapValues from "lodash/mapValues";

export const sanitizeFormValuesRecursive = (obj) => {
  if (obj === null || obj === undefined || typeof obj === "boolean") {
    return obj;
  }
  if (obj === "" || (typeof obj === "string" && obj.trim() === "")) {
    return null;
  }
  if (typeof obj === "string") {
    return obj.trim();
  }
  if (Array.isArray(obj)) {
    return obj.map((o) => sanitizeFormValuesRecursive(o));
  } else if (typeof obj === "object") {
    return mapValues(obj, (v) => sanitizeFormValuesRecursive(v));
  }
  return obj;
};

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
