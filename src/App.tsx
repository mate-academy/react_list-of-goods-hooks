import { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';

export const goodsFromServer = [
  'Dumplings',
  'Carrot',
  'Eggs',
  'Ice cream',
  'Apple',
  'Bread',
  'Fish',
  'Honey',
  'Jam',
  'Garlic',
];

enum SortType {
  NONE,
  ALPHABET,
  LENGTH,
}

type ReorderOptions = {
  sortType: SortType,
  isReversed: boolean,
};

// Use this function in the render method to prepare goods
export function getReorderedGoods(
  goods: string[],
  { sortType, isReversed }: ReorderOptions,
) {
  // To avoid the original array mutation
  const visibleGoods = [...goods];

  if (sortType === SortType.ALPHABET) {
    visibleGoods.sort();
  } else if (sortType === SortType.LENGTH) {
    visibleGoods.sort((a, b) => a.length - b.length);
  }

  if (isReversed) {
    visibleGoods.reverse();
  }
  // Sort and reverse goods if needed

  // eslint-disable-next-line no-console
  console.log(sortType, isReversed);

  return visibleGoods;
}

// DON'T save goods to the state
// type State = {
//   isReversed: boolean,
//   sortType: SortType,
// };

export const App = () => {
  const [reorderOptions, setReorderOptions] = useState<ReorderOptions>({
    sortType: SortType.NONE,
    isReversed: false,
  });

  const handleSortAlphabetically = () => {
    setReorderOptions({
      ...reorderOptions,
      sortType: SortType.ALPHABET,
    });
  };

  const handleSortByLength = () => {
    setReorderOptions({
      ...reorderOptions,
      sortType: SortType.LENGTH,
    });
  };

  const handleReverse = () => {
    setReorderOptions({
      ...reorderOptions,
      isReversed: !reorderOptions.isReversed,
    });
  };

  const handleReset = () => {
    setReorderOptions({
      sortType: SortType.NONE,
      isReversed: false,
    });
  };

  const visibleGoods = getReorderedGoods(goodsFromServer, reorderOptions);
  const alphabetButtonClass
  = reorderOptions.sortType
  === SortType.ALPHABET ? 'button is-info' : 'button is-info is-light';
  const reverseButtonClass
  = reorderOptions.isReversed
    ? 'button is-warning' : 'button is-warning is-light';
  const lengthButtonClass
  = reorderOptions.sortType
  === SortType.LENGTH ? 'button is-success' : 'button is-success is-light';

  return (
    <div>
      <button
        type="button"
        onClick={handleSortAlphabetically}
        className={alphabetButtonClass}
      >
        Sort alphabetically
      </button>
      <button
        type="button"
        onClick={handleSortByLength}
        className={lengthButtonClass}
      >
        Sort by length
      </button>
      <button
        type="button"
        onClick={handleReverse}
        className={reverseButtonClass}
      >
        Reverse
      </button>
      {(reorderOptions.sortType
      !== SortType.NONE || reorderOptions.isReversed) && (
        <button
          type="button"
          onClick={handleReset}
          className="button is-danger is-light"
        >
          Reset
        </button>
      )}
      <ul>
        {visibleGoods.map(good => <li key={good} data-cy="Good">{good}</li>)}
      </ul>
    </div>
  );
};

export default App;
