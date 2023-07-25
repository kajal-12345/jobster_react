const FormRow = ({ type, name, value, onChange, labelText }) => {
  return (
    <div className="form-row">
      {" "}
      <label className="form-label" htmlFor={name}>
        {labelText || name}
      </label>
      <input
        id={name}
        name={name}
        className="form-input"
        type={type}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};
export default FormRow;
