const SubmitBtn = ({ isSubmitting, isFormBtn }) => {
  return (
    <button type="submit" className={`btn w-full ${isFormBtn ? "self-center mt-4 grid place-items-center" : ""}`}  disabled={isSubmitting}>
      {isSubmitting ? "Submitting..." : "submit"}
    </button>
  );
};

export default SubmitBtn;
