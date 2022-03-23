export const ListControl: React.FC<Props> = ({
  isReversed,
  setIsReversed,
  setSortBy,
  reset,
}) => {
  return (
    <div className="buttons">
      <button
        type="button"
        onClick={() => setIsReversed(!isReversed)}
        className="button"
      >
        reverse
      </button>
      <button
        type="button"
        onClick={() => setSortBy('alpha')}
        className="button"
      >
        Sort alphabetically
      </button>
      <button
        type="button"
        onClick={() => setSortBy('length')}
        className="button"
      >
        Sort by length
      </button>
      <button
        type="button"
        onClick={reset}
        className="button"
      >
        Reset
      </button>
    </div>
  );
};

type Props = {
  isReversed: boolean,
  setIsReversed: React.Dispatch< React.SetStateAction<boolean>>,
  setSortBy: React.Dispatch<React.SetStateAction<string>>,
  reset: () => void
};
