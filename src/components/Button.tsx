import classNames from 'classnames';

type ButtonProps = {
  name: string;
  handlesortCriteria: (action: string) => void;
  sortCriteria: string;
  isReversed: boolean;
  children?: React.ReactNode;
};

export const Button: React.FC<ButtonProps> = ({
  name,
  handlesortCriteria,
  sortCriteria,
  isReversed,
  children,
}) => {
  const getButtonClass = (buttonName: string): string => {
    switch (name) {
      case 'alphabet':
        return 'is-info';
      case 'length':
        return 'is-success';
      case 'reverse':
        return 'is-warning';
      case 'reset':
        return 'is-danger';
      default:
        return buttonName === sortCriteria &&
          buttonName === 'reverse' &&
          isReversed
          ? 'is-light'
          : '';
    }
  };

  const buttonClass = classNames('button', getButtonClass(name));

  return (
    <button
      type="button"
      className={buttonClass}
      onClick={() => handlesortCriteria(name)}
    >
      {children}
    </button>
  );
};
