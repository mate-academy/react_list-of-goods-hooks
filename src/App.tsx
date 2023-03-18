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
  ALPHABET,
  LENGTH,
  NONE,
}

type SortFunction = (a: string, b: string) => number;

const getSortFunction = (sortType: SortType): SortFunction => {
  switch (sortType) {
    case SortType.ALPHABET:
      return (a, b) => a.localeCompare(b);
    case SortType.LENGTH:
      return (a, b) => a.length - b.length;
    case SortType.NONE:
    default:
      return () => 0;
  }
};

const getReorderedGoods = (
  goods: string[],
  sortType: SortType,
  isReversed: boolean,
): string[] => {
  const sortFunction = getSortFunction(sortType);
  const visibleGoods = [...goods].sort(sortFunction);

  if (isReversed) {
    visibleGoods.reverse();
  }

  return visibleGoods;
};

export const App = () => {
  const [sortType, setSortType] = useState<SortType>(SortType.NONE);
  const [isReversed, setIsReversed] = useState<boolean>(false);

  const reorderedGoods = getReorderedGoods(
    goodsFromServer,
    sortType,
    isReversed,
  );

  const sortGoods = (newSortType: SortType) => {
    setSortType(newSortType);
  };

  const reverse = () => {
    setIsReversed(!isReversed);
  };

  const reset = () => {
    setSortType(SortType.NONE);
    setIsReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sortType !== SortType.ALPHABET ? 'is-light' : ''}`}
          onClick={() => sortGoods(SortType.ALPHABET)}
        >
          Sort alphabetically
        </button>
        <button
          type="button"
          className={`button is-success ${sortType !== SortType.LENGTH ? 'is-light' : ''}`}
          onClick={() => sortGoods(SortType.LENGTH)}
        >
          Sort by length
        </button>
        <button
          type="button"
          className={`button is-warning ${isReversed ? '' : 'is-light'}`}
          onClick={reverse}
        >
          Reverse
        </button>
        {(sortType !== SortType.NONE || isReversed) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={reset}
          >
            Reset
          </button>
        )}
      </div>
      <ul>
        {reorderedGoods.map(
          good => <li key={good} data-cy="Good">{good}</li>,
        )}
      </ul>
    </div>
  );
};
