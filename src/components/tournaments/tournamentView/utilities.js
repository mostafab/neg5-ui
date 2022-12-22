export const labelWithValue = (label, value) => (
  <div>
    <h6 className="d-inline-flex">{label}:</h6> <span>{value || "None"}</span>
  </div>
);
