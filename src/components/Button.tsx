interface Props<T> {
  value: T;
  className: string;
  onClick: (newValue: T) => void;
}

export const Button = <T,>({ value, className, onClick }: Props<T>) => (
  <button type="button" className={className} onClick={() => onClick(value)}>
    {typeof value === 'boolean' ? 'Reverse' : String(value) || 'Reset'}
  </button>
);
