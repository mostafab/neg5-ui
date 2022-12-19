import React from "react";
import {
  Form as FormComponent,
  Button,
  FloatingLabel,
  Spinner,
} from "react-bootstrap";
import { Formik, Form as FormikForm, useField, FieldArray } from "formik";

export const Form = ({
  name,
  children,
  onSubmit,
  initialValues = {},
  validation = null,
  submitButtonText = "Submit",
  onCancel = null,
  cancelButtonText = "Cancel",
  submitting = false,
}) => {
  return (
    <Formik
      onSubmit={(values) => onSubmit(values)}
      initialValues={initialValues}
      validationSchema={validation}
      validateOnChange={false}
      validateOnBlur={false}
    >
      <FormikForm name={name} noValidate className={name}>
        {children}
        <div className="d-grid">
          {onCancel && (
            <Button variant="secondary" onClick={onCancel}>
              {cancelButtonText}
            </Button>
          )}
          <Button variant="primary" type="submit" disabled={submitting}>
            {submitting ? "Submitting" : submitButtonText}
            {submitting && <Spinner animation="border" size="sm" />}
          </Button>
        </div>
      </FormikForm>
    </Formik>
  );
};

export const RepeatField = ({ name, render }) => {
  const [field] = useField(name);
  return (
    <FieldArray
      name={name}
      render={() => {
        if (!Array.isArray(field.value)) {
          console.error(
            "Non-array field passed to RepeatField. Will not render anything."
          );
          return null;
        }
        return field.value.map((val, idx) => render(val, idx));
      }}
    />
  );
};

export const Date = ({ name, label, placeholder = null }) => (
  <CommonFormElementWrapper
    name={name}
    label={label}
    placeholder={placeholder}
    type="date"
  />
);

export const Text = ({
  name,
  autoComplete = false,
  label,
  placeholder = null,
}) => (
  <CommonFormElementWrapper
    name={name}
    label={label}
    placeholder={placeholder}
    type={"text"}
    autoComplete={autoComplete}
  />
);

export const Number = ({
  name,
  autoComplete = false,
  label,
  placeholder = null,
}) => (
  <CommonFormElementWrapper
    name={name}
    label={label}
    placeholder={placeholder}
    type="number"
    autoComplete={autoComplete}
  />
);

export const Checkbox = ({ name, label }) => {
  const [field] = useField(name);
  return (
    <FormComponent.Group controlId={name}>
      <FormComponent.Check
        type="checkbox"
        label={label}
        {...field}
        checked={field.value}
      />
    </FormComponent.Group>
  );
};

export const Select = ({ name, label, options }) => {
  const [field] = useField(name);
  return (
    <FloatingLabel label={label} className="mb-3">
      <FormComponent.Select aria-label={label} {...field}>
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </FormComponent.Select>
    </FloatingLabel>
  );
};

export const Password = ({ name, label, placeholder = "" }) => (
  <CommonFormElementWrapper
    name={name}
    label={label}
    placeholder={placeholder}
    type={"password"}
  />
);

export const RepeatField = ({ name, objects, render }) => (
  <FieldArray
    name={name}
    render={() => objects.map((obj, idx) => render(obj, idx))}
  />
);

const CommonFormElementWrapper = ({
  name,
  label,
  placeholder,
  type,
  autoComplete = false,
}) => {
  const [field, meta] = useField(name);
  return (
    <>
      <FloatingLabel label={label} className="mb-3">
        <FormComponent.Control
          autoComplete={autoComplete ? "on" : "off"}
          type={type}
          placeholder={placeholder || name}
          isInvalid={!!meta.error}
          {...field}
        />
        {meta.error && (
          <FormComponent.Control.Feedback type="invalid">
            {meta.error}
          </FormComponent.Control.Feedback>
        )}
      </FloatingLabel>
    </>
  );
};
