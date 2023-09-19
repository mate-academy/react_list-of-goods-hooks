import { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';

const goodsFromServer: string[] = [
  'Dumplings',
  'Carrot',
  'Eggs',
  'Ice cream',
  'Apple',
  'Bread',
  'Fish',
  'Honey',
  'Jam',
];

enum SortType {
  ALPHABETICALLY = 'ALPHABETICALLY',
  LENGTH = 'LENGTH',
  NONE = 'NONE',
}

type GoodsSortOptions = {
  sortType: SortType;
  isReversed: boolean;
};

function getReorderedGoods(
  goods: string[],
  { sortType, isReversed }: GoodsSortOptions,
): string[] {
  const visibleGoods = [...goods];

  if (sortType === SortType.ALPHABETICALLY) {
    visibleGoods.sort((a, b) => a.localeCompare(b));
  } else if (sortType === SortType.LENGTH) {
    visibleGoods.sort((a, b) => a.length - b.length);
  }

  if (isReversed) {
    visibleGoods.reverse();
  }

  return visibleGoods;
}

export function App(): JSX.Element {
  const [isReversed, setIsReversed] = useState<boolean>(false);
  const [sortType, setSortType] = useState<SortType>(SortType.NONE);

  const handleSortAlphabetically = (): void => {
    setSortType(SortType.ALPHABETICALLY);
  };

  const handleSortByLength = (): void => {
    setSortType(SortType.LENGTH);
  };

  const handleGoodsReverse = (): void => {
    setIsReversed((prevIsReversed) => !prevIsReversed);
  };

  const reset = (): void => {
    setSortType(SortType.NONE);
    setIsReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={
            sortType === SortType.ALPHABETICALLY
              ? 'button is-info'
              : 'button is-light'
          }
          onClick={handleSortAlphabetically}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={
            sortType === SortType.LENGTH ? 'button is-info' : 'button is-light'
          }
          onClick={handleSortByLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={
            isReversed === true
              ? 'button is-success'
              : 'button is-success is-light'
          }
          onClick={handleGoodsReverse}
        >
          Reverse
        </button>
        {(sortType !== SortType.NONE || isReversed === true) && (
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
        {getReorderedGoods(goodsFromServer, { sortType, isReversed }).map(
          (good) => (
            <li key={good} data-cy="Good">
              {good}
            </li>
          ),
        )}
      </ul>
    </div>
  );
}
