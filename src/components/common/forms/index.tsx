import React, { useEffect, createContext, useContext } from "react";
import {
  Form as FormComponent,
  Button as BootstrapButton,
  FloatingLabel,
  Spinner,
} from "react-bootstrap";
import ReactSelect from "react-select";
import {
  Formik,
  Form as FormikForm,
  useField,
  FieldArray,
  useFormikContext,
} from "formik";

import Button from "@components/common/button";

const ReadOnlyContext = createContext({ readOnly: false, editableFields: [] });

export const useReadOnlyContext = () => useContext(ReadOnlyContext);

const fieldIsReadOnly = (name, context) => {
  const { readOnly, editableFields } = context;
  return readOnly && !(editableFields.indexOf(name) >= 0);
};

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
  dirtySubmitOnly = false,
  readOnly = false,
  editableFields = [],
  customCtaButtons = false,
}) => {
  return (
    <ReadOnlyContext.Provider value={{ readOnly, editableFields }}>
      <Formik
        onSubmit={(values, actions) => onSubmit(values, actions)}
        initialValues={initialValues}
        validationSchema={validation}
        validateOnChange={false}
        validateOnBlur={false}
      >
        <FormikForm name={name} noValidate className={name}>
          {children}
          {!customCtaButtons && (
            <div className="d-grid">
              <ContextAwareFormButtons
                onCancel={onCancel}
                initialValues={initialValues}
                submitButtonText={submitButtonText}
                submitting={submitting}
                dirtySubmitOnly={dirtySubmitOnly}
                cancelButtonText={cancelButtonText}
              />
            </div>
          )}
        </FormikForm>
      </Formik>
    </ReadOnlyContext.Provider>
  );
};

export const RepeatField = ({ name, render, addObjectProps = null }) => {
  const [field] = useField(name);
  const readOnly = fieldIsReadOnly(name, useReadOnlyContext());

  const renderAddObjectButton = (arrayHelpers) => {
    const pushFunc = () =>
      arrayHelpers.push(addObjectProps.newObject({ value: field.value }));
    if (addObjectProps.as) {
      return addObjectProps.as(pushFunc);
    }
    return (
      <div className="d-flex justify-content-center">
        <Button type="link" onClick={pushFunc}>
          {addObjectProps.buttonText}
        </Button>
      </div>
    );
  };
  return (
    <FieldArray
      name={name}
      // https://formik.org/docs/api/fieldarray#fieldarray-helpers
      render={(arrayHelpers) => {
        if (!Array.isArray(field.value)) {
          console.error(
            "Non-array field passed to RepeatField. Will not render anything."
          );
          return null;
        }
        return (
          <>
            {field.value.map((val, idx) =>
              render(
                val,
                {
                  index: idx,
                  isLast: idx === field.value.length - 1,
                  readOnly,
                },
                arrayHelpers
              )
            )}
            {addObjectProps && !readOnly && renderAddObjectButton(arrayHelpers)}
          </>
        );
      }}
    />
  );
};

export const Display = ({ name, label, placeholder = null }) => (
  <CommonFormElementWrapper
    name={name}
    label={label}
    placeholder={placeholder}
    type="display"
  />
);

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
  textarea = false,
  rows = 10,
  autoComplete = false,
  label,
  placeholder = null,
  onChange = null,
  onBlur = null,
  onFocus = null,
  className = "",
}) => (
  <CommonFormElementWrapper
    name={name}
    label={label}
    placeholder={placeholder}
    type={textarea ? "textarea" : "text"}
    rows={rows}
    autoComplete={autoComplete}
    onChange={onChange}
    onBlur={onBlur}
    onFocus={onFocus}
    className={className}
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

export const Checkbox = ({ name, label, onChange = null }) => {
  const [field] = useField(name);
  const readOnly = fieldIsReadOnly(name, useReadOnlyContext());
  const internalOnChange = (e) => {
    field.onChange(e);
    onChange && onChange(e.target.checked);
  };
  return (
    <FormComponent.Group controlId={name} className="mb-3">
      <FormComponent.Check
        type="checkbox"
        readOnly={readOnly}
        disabled={readOnly}
        label={label}
        {...field}
        checked={field.value}
        onChange={internalOnChange}
      />
    </FormComponent.Group>
  );
};

export const Select = ({
  name,
  label,
  options,
  multiple = false,
  onChange = null,
  searchable = false,
}) => {
  const [field, meta] = useField(name);
  const formContext = useFormContext();
  const isReadOnly = fieldIsReadOnly(name, useReadOnlyContext());
  const internalOnChange = (opts) => {
    const value = multiple ? opts.map((o) => o.value) : opts.value;
    formContext.getFieldHelpers(name).setValue(value);
    onChange && onChange(value, formContext);
  };
  // Handles cases for option groups
  const normalizedOptions = options.flatMap((o) => {
    if (o.options) {
      return o.options;
    }
    return [o];
  });
  return (
    <div className="mb-3">
      <ReactSelect
        {...field}
        placeholder={label}
        styles={{
          control: (base) =>
            (() => {
              const styles = {
                ...base,
                borderRadius: "0",
                borderColor: meta.error ? "#e74c3c !important" : "#ced4da",
                height: "100%",
                zIndex: "1",
              };
              if (isReadOnly) {
                styles["border"] = "none";
              }
              return styles;
            })(),
          container: (base) => ({
            ...base,
            height: "100%",
          }),
          menu: (base) => ({
            ...base,
            borderRadius: "0",
            zIndex: "3",
          }),
          indicatorSeparator: (base) => ({
            ...base,
            display: "none",
          }),
          indicatorsContainer: (base) =>
            (() => {
              const styles = {
                ...base,
              };
              if (isReadOnly) {
                styles["visibility"] = "hidden";
              }
              return styles;
            })(),
          singleValue: (base) =>
            (() => {
              const styles = {
                ...base,
              };
              if (isReadOnly) {
                styles["color"] = "black";
              }
              return styles;
            })(),
        }}
        isSearchable={searchable}
        isDisabled={isReadOnly}
        className="form-floating"
        isMulti={multiple}
        aria-label={label}
        options={options}
        onChange={internalOnChange}
        value={
          multiple
            ? normalizedOptions.filter((o) => field.value.indexOf(o.value) >= 0)
            : normalizedOptions.find((o) => o.value === field.value) || ""
        }
      />
      {meta.error && <span className="text-danger small">{meta.error}</span>}
    </div>
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

export const ResetListener = ({ changeKey, initialValues = null }) => {
  const { resetForm } = useFormContext();
  useEffect(() => {
    resetForm(initialValues ? { values: initialValues() } : undefined);
  }, [changeKey]);
  return null;
};

export const useFormContext = () => useFormikContext();

const ContextAwareFormButtons = ({
  submitting,
  submitButtonText,
  dirtySubmitOnly,
  onCancel,
  cancelButtonText,
  initialValues,
}) => {
  const { dirty, resetForm } = useFormContext();
  const readOnlyContext = useReadOnlyContext();
  const isReadOnly =
    readOnlyContext.readOnly && !(readOnlyContext.editableFields.length > 0);
  if (isReadOnly || (dirtySubmitOnly && !dirty)) {
    return null;
  }
  return (
    <>
      <hr />
      {onCancel && (
        <BootstrapButton
          variant="secondary"
          className="mb-3"
          onClick={() => {
            resetForm({ values: initialValues });
            onCancel();
          }}
          disabled={submitting}
        >
          {cancelButtonText}
        </BootstrapButton>
      )}
      <BootstrapButton variant="primary" type="submit" disabled={submitting}>
        {submitting ? "Submitting" : submitButtonText}
        {submitting && (
          <Spinner animation="border" size="sm" className="ms-2" />
        )}
      </BootstrapButton>
    </>
  );
};

const CommonFormElementWrapper = ({
  name,
  label,
  placeholder,
  type,
  autoComplete = false,
  rows = null,
  onChange = null,
  onBlur = null,
  onFocus = null,
  className = "",
}) => {
  const [field, meta] = useField(name);
  const isDisplay = type === "display";
  const inReadOnlyContext = fieldIsReadOnly(name, useReadOnlyContext());
  const readOnly = isDisplay || inReadOnlyContext;
  const internalOnChange = (e) => {
    field.onChange(e);
    onChange && onChange(e.target.value);
  };
  const internalOnBlur = (e) => {
    field.onBlur(e);
    onBlur && onBlur(e);
  };
  return (
    <>
      <FloatingLabel label={label} className={`mb-3 ${className}`}>
        <FormComponent.Control
          autoComplete={autoComplete ? "on" : "off"}
          type={type === "display" ? undefined : type}
          readOnly={readOnly}
          plaintext={readOnly}
          as={type === "textarea" ? "textarea" : undefined}
          rows={type === "textarea" ? rows : undefined}
          placeholder={placeholder || name}
          isInvalid={!!meta.error}
          onWheel={
            type !== "number" ? undefined : (e) => e.currentTarget.blur()
          }
          {...field}
          onChange={internalOnChange}
          onBlur={internalOnBlur}
          onFocus={onFocus}
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
