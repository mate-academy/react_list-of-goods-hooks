import classNames from 'classnames';

type ButtonProps = {
  name: string;
  handleSortCriteria: (action: string) => void;
  sortCriteria: string;
  isReversed: boolean;
  children?: React.ReactNode;
};

export const Button: React.FC<ButtonProps> = ({
  name,
  handleSortCriteria,
  sortCriteria,
  isReversed,
  children,
}) => {
  const getButtonClass = (): string => {
    let baseClass = '';

    switch (name) {
      case 'alphabet':
        baseClass = 'is-info';
        break;
      case 'length':
        baseClass = 'is-success';
        break;
      case 'reverse':
        baseClass = 'is-warning';
        break;
      case 'reset':
        baseClass = 'is-danger';
        break;
      default:
        baseClass = '';
    }

    // Add 'is-light' if the button is not the active sortCriteria and is not reverse or reset
    const additionalClass =
      name !== sortCriteria && !(name === 'reverse' && isReversed)
        ? 'is-light'
        : '';

    return classNames(baseClass, additionalClass);
  };

  const buttonClass = classNames('button', getButtonClass());

  return (
    <button
      type="button"
      className={buttonClass}
      onClick={() => handleSortCriteria(name)}
    >
      {children}
    </button>
  );
};
