import * as React from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import { useState } from 'react';

export const goodsFromServer: string[] = [
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
  Default = '',
  Alphabetic = 'alphabetic',
  ByLength = 'length',
}

export const App = () => {
  const [sortedNow, setSortedNow] = useState<SortType>(SortType.Default);
  const [isReversed, setIsReversed] = useState<boolean>(false);

  const getSortedBy = (): string[] => {
    const preparedGoods = [...goodsFromServer];

    if (sortedNow === SortType.Alphabetic) {
      preparedGoods.sort((a, b) => a.localeCompare(b));
    } else if (sortedNow === SortType.ByLength) {
      preparedGoods.sort((a, b) => a.length - b.length);
    }

    if (isReversed) {
      preparedGoods.reverse();
    }

    return preparedGoods;
  };

  const goods = getSortedBy();

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sortedNow === SortType.Alphabetic ? '' : 'is-light'}`}
          onClick={() => setSortedNow(SortType.Alphabetic)}
        >
          Sort alphabetically
        </button>
        <button
          type="button"
          className={`button is-success ${sortedNow === SortType.ByLength ? '' : 'is-light'}`}
          onClick={() => setSortedNow(SortType.ByLength)}
        >
          Sort by length
        </button>
        <button
          type="button"
          className={`button is-warning ${isReversed ? '' : 'is-light'}`}
          onClick={() => setIsReversed(prev => !prev)}
        >
          Reverse
        </button>
        {(sortedNow !== SortType.Default || isReversed) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setSortedNow(SortType.Default);
              setIsReversed(false);
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {goods.map(good => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
