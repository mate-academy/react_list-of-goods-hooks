import { Button } from './Button';

type ButtonsListProps = {
  handlesortCriteria: (action: string) => void;
  sortCriteria: string;
  isReversed: boolean;
};

export const ButtonsList: React.FC<ButtonsListProps> = ({
  handlesortCriteria,
  sortCriteria,
  isReversed,
}) => {
  return (
    <div className="buttons">
      <Button
        name="alphabet"
        handleSortCriteria={handlesortCriteria}
        sortCriteria={sortCriteria}
        isReversed={isReversed}
      >
        Sort alphabetically
      </Button>

      <Button
        name="length"
        handleSortCriteria={handlesortCriteria}
        sortCriteria={sortCriteria}
        isReversed={isReversed}
      >
        Sort by length
      </Button>

      <Button
        name="reverse"
        handleSortCriteria={handlesortCriteria}
        sortCriteria={sortCriteria}
        isReversed={isReversed}
      >
        Reverse
      </Button>

      {(sortCriteria || isReversed) && (
        <Button
          name="reset"
          handleSortCriteria={handlesortCriteria}
          sortCriteria={sortCriteria}
          isReversed={isReversed}
        >
          Reset
        </Button>
      )}
    </div>
  );
};
