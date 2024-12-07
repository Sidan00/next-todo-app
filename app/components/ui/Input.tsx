interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export default function Input({ label, error, className, ...props }: InputProps) {
  return (
    <div className="input-wrapper">
      {label && <label className="input-label">{label}</label>}
      <input
        className={`
          input
          ${error ? 'input-error' : ''}
          ${className || ''}
        `}
        {...props}
      />
      {error && <span className="input-error-message">{error}</span>}
    </div>
  );
}
