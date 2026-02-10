import { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';

export enum SortType {
  NONE = 'NONE',
  ALPHA = 'ALPHA',
  LENGTH = 'LENGTH',
}

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
  'Garlic',
];

export const App: React.FC = () => {
  const [sortType, setSortType] = useState<SortType>(SortType.NONE);
  const [isReversed, setIsReversed] = useState<boolean>(false);

  const sortAlphabetically = () => setSortType(SortType.ALPHA);
  const sortByLength = () => setSortType(SortType.LENGTH);
  const reverseGoods = () => setIsReversed(prev => !prev);

  const resetGoods = () => {
    setSortType(SortType.NONE);
    setIsReversed(false);
  };

  const visibleGoods = [...goodsFromServer];

  if (sortType === SortType.ALPHA) {
    visibleGoods.sort((a, b) => a.localeCompare(b));
  }

  if (sortType === SortType.LENGTH) {
    visibleGoods.sort((a, b) => a.length - b.length);
  }

  if (isReversed) {
    visibleGoods.reverse();
  }

  const isOriginalOrder =
    sortType === SortType.NONE && isReversed === false;

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          data-cy="SortAlphabetically"
          className={`button is-info ${
            sortType === SortType.ALPHA ? '' : 'is-light'
          }`}
          onClick={sortAlphabetically}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          data-cy="SortByLength"
          className={`button is-success ${
            sortType === SortType.LENGTH ? '' : 'is-light'
          }`}
          onClick={sortByLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          data-cy="Reverse"
          className={`button is-warning ${isReversed ? '' : 'is-light'}`}
          onClick={reverseGoods}
        >
          Reverse
        </button>

        {!isOriginalOrder && (
          <button
            type="button"
            data-cy="Reset"
            className="button is-danger"
            onClick={resetGoods}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGoods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
