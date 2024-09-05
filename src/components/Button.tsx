import cn from 'classnames';
import { ButtonColor } from '../types/ButtonColor.type';

type Props = {
  children: React.ReactNode;
  onClick: () => void;
  color: ButtonColor;
  isLight?: boolean;
};

export const Button: React.FC<Props> = ({
  children,
  onClick,
  color,
  isLight,
}) => {
  return (
    <button
      type="button"
      className={cn('button', color, {
        'is-light': isLight,
      })}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
