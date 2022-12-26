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

const ReadOnlyContext = createContext(false);

export const useReadOnlyContext = () => useContext(ReadOnlyContext);

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
}) => {
  return (
    <ReadOnlyContext.Provider value={readOnly}>
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
            <ContextAwareFormButtons
              onCancel={onCancel}
              initialValues={initialValues}
              submitButtonText={submitButtonText}
              submitting={submitting}
              dirtySubmitOnly={dirtySubmitOnly}
              cancelButtonText={cancelButtonText}
            />
          </div>
        </FormikForm>
      </Formik>
    </ReadOnlyContext.Provider>
  );
};

export const RepeatField = ({ name, render, addObjectProps = null }) => {
  const [field] = useField(name);
  const readOnly = useReadOnlyContext();
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
            {addObjectProps && !readOnly && (
              <div className="d-flex justify-content-center">
                <Button
                  type="link"
                  onClick={() => arrayHelpers.push(addObjectProps.newObject())}
                >
                  {addObjectProps.buttonText}
                </Button>
              </div>
            )}
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
}) => (
  <CommonFormElementWrapper
    name={name}
    label={label}
    placeholder={placeholder}
    type={textarea ? "textarea" : "text"}
    rows={rows}
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
  const readOnly = useReadOnlyContext();
  return (
    <FormComponent.Group controlId={name} className="mb-3">
      <FormComponent.Check
        type="checkbox"
        readOnly={readOnly}
        disabled={readOnly}
        label={label}
        {...field}
        checked={field.value}
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
  const isReadOnly = useReadOnlyContext();
  const internalOnChange = (opts) => {
    const value = multiple ? opts.map((o) => o.value) : opts.value;
    formContext.getFieldHelpers(name).setValue(value);
    onChange && onChange(value, formContext);
  };
  return (
    <>
      <ReactSelect
        {...field}
        placeholder={label}
        styles={{
          control: (base) => ({
            ...base,
            borderRadius: "0",
            height: "100%",
            zIndex: "1",
          }),
          menu: (base) => ({
            ...base,
            borderRadius: "0",
            zIndex: "2",
          }),
          indicatorSeparator: (base) => ({
            ...base,
            display: "none",
          }),
        }}
        isSearchable={searchable}
        isDisabled={isReadOnly}
        className="mb-3 form-floating"
        isMulti={multiple}
        aria-label={label}
        options={options}
        onChange={internalOnChange}
        value={
          multiple
            ? options.filter((o) => field.value.indexOf(o.value) >= 0)
            : options.find((o) => o.value === field.value) || ""
        }
      />
      {meta.error && (
        <FormComponent.Control.Feedback type="invalid">
          {meta.error}
        </FormComponent.Control.Feedback>
      )}
    </>
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
  const readOnly = useReadOnlyContext();
  if (readOnly || (dirtySubmitOnly && !dirty)) {
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
        >
          {cancelButtonText}
        </BootstrapButton>
      )}
      <BootstrapButton variant="primary" type="submit" disabled={submitting}>
        {submitting ? "Submitting" : submitButtonText}
        {submitting && <Spinner animation="border" size="sm" />}
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
}) => {
  const [field, meta] = useField(name);
  const isDisplay = type === "display";
  const readOnly = isDisplay || useReadOnlyContext();
  return (
    <>
      <FloatingLabel label={label} className="mb-3">
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
