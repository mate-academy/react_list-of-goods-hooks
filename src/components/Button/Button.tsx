import { ButtonHTMLAttributes, FC } from 'react';
import classNames from 'classnames';

type Attributes = Omit<
ButtonHTMLAttributes<HTMLButtonElement>,
'className' | 'type'
>;

interface ButtonProps extends Attributes {
  isLight: boolean;
  buttonColor: string;
  title: string;
}

export const Button: FC<ButtonProps> = ({
  title, isLight, buttonColor, ...props
}) => {
  return (
    <button
      {...props}
      type="button"
      className={classNames(
        `button ${buttonColor}`,
        {
          'is-light': isLight,
        },
      )}
    >
      {title}
    </button>
  );
};
