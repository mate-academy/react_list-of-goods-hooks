import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import classNames from 'classnames';
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
  Length = 'length',
  Alphabet = 'alphabet',
  Default = '',
}

type SortParams = {
  sortBy: SortType;
  isReversed: boolean;
};
function getPreparedGoods(goods: string[], params: SortParams) {
  const preparedGoods = [...goods];

  if (params.sortBy) {
    preparedGoods.sort((good1, good2) => {
      switch (params.sortBy) {
        case SortType.Alphabet:
          return good1.localeCompare(good2);
        case SortType.Length:
          return good1.length - good2.length;
        default:
          return 0;
      }
    });
  }

  if (params.isReversed) {
    preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App: React.FC = () => {
  const [sortBy, setSortBy] = useState<SortType>(SortType.Default);
  const [isReversed, setIsReversed] = useState<boolean>(false);
  const showReset = sortBy || isReversed;

  const reset = () => {
    setSortBy(SortType.Default);
    setIsReversed(false);
  };

  const preparedGoods = getPreparedGoods(goodsFromServer, {
    sortBy: sortBy,
    isReversed: isReversed,
  });

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={classNames('button is-info', {
            'is-light': sortBy !== SortType.Alphabet,
          })}
          onClick={() => setSortBy(SortType.Alphabet)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={classNames('button is-success', {
            'is-light': sortBy !== SortType.Length,
          })}
          onClick={() => setSortBy(SortType.Length)}
        >
          Sort by length
        </button>
        <button
          type="button"
          className={classNames('button is-warning', !isReversed && 'is-light')}
          onClick={() => setIsReversed(!isReversed)}
        >
          Reverse
        </button>

        {showReset && (
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
        {preparedGoods.map(good => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
