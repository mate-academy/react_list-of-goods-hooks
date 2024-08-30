import { SortType } from '../enums/sort-type.enum';
import { Button } from './Button';

type Props = {
  sortField: SortType | '';
  isReversed: boolean;
  setSortField: (sortField: SortType | '') => void;
  setIsReversed: (isReversed: boolean) => void;
  reset: () => void;
};

export const ButtonGroup: React.FC<Props> = ({
  sortField,
  isReversed,
  setSortField,
  setIsReversed,
  reset,
}) => {
  const handleSortAlphabetically = () => setSortField(SortType.ALPHABETICALLY);
  const handleSortByLength = () => setSortField(SortType.BY_LENGTH);
  const handleReverse = () => setIsReversed(!isReversed);
  const handleReset = () => reset();

  return (
    <div className="buttons">
      <Button
        color="is-info"
        onClick={handleSortAlphabetically}
        isLight={sortField !== SortType.ALPHABETICALLY}
      >
        Sort alphabetically
      </Button>

      <Button
        color="is-success"
        onClick={handleSortByLength}
        isLight={sortField !== SortType.BY_LENGTH}
      >
        Sort by length
      </Button>

      <Button color="is-warning" onClick={handleReverse} isLight={!isReversed}>
        Reverse
      </Button>

      {(sortField || isReversed) && (
        <Button color="is-danger" onClick={handleReset} isLight={true}>
          Reset
        </Button>
      )}
    </div>
  );
};
