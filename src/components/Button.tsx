import { FC, MouseEvent } from 'react';

interface Props {
  name: string,
  onClick: (event: MouseEvent<HTMLButtonElement>) => void,
  className: string,
}

export const Button: FC<Props> = ({
  name, onClick, className, ...rest
}) => (
  <button
    type="button"
    onClick={onClick}
    className={className}
    {...rest}
  >
    {name}
  </button>
);
