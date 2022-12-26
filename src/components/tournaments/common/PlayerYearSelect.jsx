import React from "react";

import { Select } from "@components/common/forms";

const playerYearOptions = () => [
  { value: "na", label: "N/A" },
  { value: "kindergarten", label: "Kindergarten" },
  { value: "first_grade", label: "First Grade" },
  { value: "second_grade", label: "Second Grade" },
  { value: "third_grade", label: "Third Grade" },
  { value: "fourth_grade", label: "Fourth Grade" },
  { value: "fifth_grade", label: "Fifth Grade" },
  { value: "sixth_grade", label: "Sixth Grade" },
  { value: "seventh_grade", label: "Seventh Grade" },
  { value: "eighth_grade", label: "Eighth Grade" },
  { value: "ninth_grade", label: "Ninth Grade" },
  { value: "tenth_grade", label: "Tenth Grade" },
  { value: "eleventh_grade", label: "Eleventh Grade" },
  { value: "twelfth_grade", label: "Twelfth Grade" },
  { value: "college_freshman", label: "College Freshman" },
  { value: "college_sophomore", label: "College Sophomore" },
  { value: "college_junior", label: "College Junior" },
  { value: "college_senior", label: "College Senior" },
  { value: "college_post_senior", label: "College Post Senior" },
  { value: "grad_student", label: "Graduate Student" },
];

const PlayerYearSelect = ({ name, label }) => (
  <Select name={name} label={label} options={playerYearOptions()} />
);

export default PlayerYearSelect;
