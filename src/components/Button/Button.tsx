type Props = {
  text: string;
  highlightClass: string;
  highlightCondition: boolean;
  handleClick: () => void;
};

export const Button: React.FC<Props> = ({
  text,
  highlightClass,
  highlightCondition,
  handleClick,
}) => (
  <button
    type="button"
    className={`button ${highlightClass} ${
      highlightCondition ? '' : 'is-light'
    }`}
    onClick={handleClick}
  >
    {text}
  </button>
);
