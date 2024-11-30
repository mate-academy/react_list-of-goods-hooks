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
  const handleClickSortAlphabetically = () =>
    setSortField(SortType.ALPHABETICALLY);
  const handleClickSortByLength = () => setSortField(SortType.BY_LENGTH);
  const handleClickReverse = () => setIsReversed(!isReversed);
  const handleClickReset = () => reset();

  return (
    <div className="buttons">
      <Button
        color="is-info"
        onClick={handleClickSortAlphabetically}
        isLight={sortField !== SortType.ALPHABETICALLY}
      >
        Sort alphabetically
      </Button>

      <Button
        color="is-success"
        onClick={handleClickSortByLength}
        isLight={sortField !== SortType.BY_LENGTH}
      >
        Sort by length
      </Button>

      <Button
        color="is-warning"
        onClick={handleClickReverse}
        isLight={!isReversed}
      >
        Reverse
      </Button>

      {(sortField || isReversed) && (
        <Button color="is-danger" onClick={handleClickReset} isLight={true}>
          Reset
        </Button>
      )}
    </div>
  );
};
