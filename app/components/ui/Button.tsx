interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'complete' | 'delete';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export default function Button({
  variant = 'primary',
  size = 'md',
  children,
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      className={`
        btn
        ${variant === 'complete' ? 'btn-complete' : ''}
        ${variant === 'delete' ? 'btn-delete' : ''}
        ${className || ''}
      `}
      {...props}
    >
      {children}
    </button>
  );
}
