import classNames from 'classnames';

type ButtonProps = {
  name: string;
  content: string;
  handleFilter: (action: string) => void;
  filter: string;
  isReversed: boolean;
};

export const Button: React.FC<ButtonProps> = ({
  name,
  content,
  handleFilter,
  filter,
  isReversed,
}) => {
  const buttonClass = classNames('button', {
    'is-info': name === 'alphabet',
    'is-success': name === 'length',
    'is-warning': name === 'reverse',
    'is-danger': name === 'reset',
    'is-light': name !== filter && !(name === 'reverse' && isReversed),
  });

  return (
    <button
      name={name}
      type="button"
      className={buttonClass}
      onClick={() => handleFilter(name)}
    >
      {content}
    </button>
  );
};
