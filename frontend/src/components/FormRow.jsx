import { useField } from "formik";

const FormRow = ({ labelText, handleSubmit, isSearch, ...props }) => {
  const [field, meta] = useField(props);
  const { defaultValue } = props;

  const handleChange = (event) => {
    field.onChange(event); // Update form state using Formik's `onChange`
    if (!handleSubmit) return;
    handleSubmit(); // Trigger form submission on input change
  };

  if (isSearch) {
    return (
      <div className="mb-4">
        <label className="form-label">{labelText}</label>
        <input
          className={`w-full py-1 px-3 rounded-md bg-bgBase border border-grey-300 text-primaryTextColor ${
            meta.touched && meta.error ? "border-red-700 border-2" : ""
          }`}
          {...field}
          {...props}
          onChange={handleChange}
        />
        {meta.touched && meta.error && (
          <div className="text-red-700">{meta.error}</div>
        )}
      </div>
    );
  }

  return (
    <div className="mb-4">
      <label className="form-label">{labelText}</label>
      <input
        className={`w-full py-1 px-3 rounded-md bg-bgBase border border-grey-300 text-primaryTextColor ${
          meta.touched && meta.error ? "border-red-700 border-2" : ""
        }`}
        {...field}
        {...props}
        onChange={handleChange}
        defaultValue={defaultValue || ""}
      />
      {meta.touched && meta.error && (
        <div className="text-red-700">{meta.error}</div>
      )}
    </div>
  );
};

export default FormRow;
