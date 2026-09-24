import './Spinner.css';

function Spinner({ size = 'md', className = '' }) {
  return (
    <span
      className={`spinner spinner--${size} ${className}`.trim()}
      role="status"
      aria-label="Loading"
    />
  );
}

export default Spinner;
