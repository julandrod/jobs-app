import { useField } from "formik";

const FormRowSelect = ({ labelText, handleSubmit, ...props }) => {
  const [field] = useField(props);
  const { list } = props;

  const handleChange = (event) => {
    field.onChange(event); // Update form state using Formik's `onChange`
    handleSubmit(); // Trigger form submission on input change
  };

  return (
    <div className="mb-4">
      <label className="form-label">{labelText}</label>
      <select
        {...field}
        {...props}
        onChange={handleChange}
        className="h-9 w-full py-1 px-3 rounded-md bg-bgBase border border-grey-300 text-primaryTextColor mb-1"
      >
        {list.map((itemValue) => (
          <option key={itemValue} value={itemValue}>
            {itemValue}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FormRowSelect;
