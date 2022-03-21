type Props = {
  txt: string;
  handleClick:(event: React.MouseEvent<HTMLButtonElement>) => void
};

export const Button: React.FC<Props> = ({ txt, handleClick }) => {
  return (
    <button
      type="button"
      onClick={handleClick}
    >
      {txt}
    </button>
  );
};
