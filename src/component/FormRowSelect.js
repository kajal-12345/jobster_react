const FormRowSelect = ({ labelText, name, value, handleChange, list }) => {
  return (
    <div className="form-row">
      <label htmlFor={name}>{labelText}</label>
      <select
        name={name}
        id={name}
        className="form-select"
        onChange={handleChange}
        value={value}
      >
        {list.map((option, index) => {
          return <option key={index}>{option}</option>;
        })}
      </select>
    </div>
  );
};
export default FormRowSelect;
