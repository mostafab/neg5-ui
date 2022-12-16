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
      <FormikForm name={name} noValidate>
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

export const Text = ({ name, label, placeholder = null, className = "" }) => (
  <CommonFormElementWrapper
    name={name}
    className={className}
    label={label}
    placeholder={placeholder}
    type={"text"}
  />
);

export const Password = ({ name, label, placeholder = "", className = "" }) => (
  <CommonFormElementWrapper
    name={name}
    className={className}
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
  className = "",
  label,
  placeholder,
  type,
}) => {
  const [field, meta] = useField(name);
  return (
    <FormComponent.Group className={className} controlId={name}>
      <FloatingLabel label={label} className="mb-3">
        <FormComponent.Control
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
    </FormComponent.Group>
  );
};
