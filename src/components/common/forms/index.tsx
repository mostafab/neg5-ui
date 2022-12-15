import React from "react";
import { Form as FormComponent, Button, FloatingLabel } from "react-bootstrap";
import { Formik, Form as FormikForm, useField } from "formik";

export const Form = ({
  name,
  children,
  onSubmit,
  initialValues = {},
  validation = null,
  submitButtonText = "Submit",
  onCancel = null,
  cancelButtonText = "Cancel",
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
          <Button variant="primary" type="submit">
            {submitButtonText}
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
          {...field}
        />
        {meta.error ? <p className="text-danger">{meta.error}</p> : null}
      </FloatingLabel>
    </FormComponent.Group>
  );
};
