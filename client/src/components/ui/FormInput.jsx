import './FormInput.css';

function FormInput({
  label,
  id,
  name,
  type = 'text',
  value,
  onChange,
  placeholder,
  error,
  required = false,
  autoComplete,
  children,
}) {
  return (
    <div className={`form-group ${error ? 'form-group--error' : ''}`}>
      <label htmlFor={id} className="form-group__label">
        {label}
        {required && <span className="form-group__required">*</span>}
      </label>
      {children || (
        <input
          id={id}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="form-group__input"
          autoComplete={autoComplete}
        />
      )}
      {error && <span className="form-group__error">{error}</span>}
    </div>
  );
}

export default FormInput;
