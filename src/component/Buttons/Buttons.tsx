type Props = {
  setSortBy: React.Dispatch<React.SetStateAction<string>>;
  setReverse: React.Dispatch<React.SetStateAction<boolean>>;
};

export const Buttons: React.FC <Props> = ({ setSortBy, setReverse }) => {
  return (
    <>
      <button
        type="button"
        onClick={() => {
          setSortBy('alphabet');
        }}
      >
        Sort alphabetically
      </button>

      <button
        type="button"
        onClick={() => {
          setSortBy('length');
        }}
      >
        Sort by length
      </button>

      <button
        type="button"
        onClick={() => {
          setReverse(prev => !prev);
        }}
      >
        Reverse
      </button>

      <button
        type="button"
        onClick={() => {
          setReverse(false);
        }}
      >
        Reset
      </button>
    </>
  );
};
